import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.prompts.list.path, async (_req, res) => {
    const prompts = await storage.getPrompts();
    res.json(prompts);
  });

  app.get(api.prompts.get.path, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });
    
    const prompt = await storage.getPrompt(id);
    if (!prompt) {
      return res.status(404).json({ message: "Prompt not found" });
    }
    res.json(prompt);
  });

  app.post(api.prompts.create.path, async (req, res) => {
    try {
      const input = api.prompts.create.input.parse(req.body);
      const prompt = await storage.createPrompt(input);
      res.status(201).json(prompt);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.put(api.prompts.update.path, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

      const input = api.prompts.update.input.parse(req.body);
      const updated = await storage.updatePrompt(id, input);
      
      if (!updated) {
        return res.status(404).json({ message: "Prompt not found" });
      }
      res.json(updated);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.delete(api.prompts.delete.path, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    await storage.deletePrompt(id);
    res.status(204).send();
  });

  // Seed initial data if empty
  const existing = await storage.getPrompts();
  if (existing.length === 0) {
    await storage.createPrompt({
      title: "Example Prompt",
      content: "This is a sample prompt to get you started. You can copy this text or edit it.",
      category: "General"
    });
    await storage.createPrompt({
      title: "Coding Helper",
      content: "Act as a senior software engineer. Help me refactor this code for better performance...",
      category: "Development"
    });
  }

  return httpServer;
}
