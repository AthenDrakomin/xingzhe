import { db } from "./db";
import { prompts, type InsertPrompt, type Prompt } from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getPrompts(): Promise<Prompt[]>;
  getPrompt(id: number): Promise<Prompt | undefined>;
  createPrompt(prompt: InsertPrompt): Promise<Prompt>;
  updatePrompt(id: number, prompt: Partial<InsertPrompt>): Promise<Prompt | undefined>;
  deletePrompt(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getPrompts(): Promise<Prompt[]> {
    return await db.select().from(prompts).orderBy(desc(prompts.createdAt));
  }

  async getPrompt(id: number): Promise<Prompt | undefined> {
    const [prompt] = await db.select().from(prompts).where(eq(prompts.id, id));
    return prompt;
  }

  async createPrompt(insertPrompt: InsertPrompt): Promise<Prompt> {
    const [prompt] = await db.insert(prompts).values(insertPrompt).returning();
    return prompt;
  }

  async updatePrompt(id: number, updates: Partial<InsertPrompt>): Promise<Prompt | undefined> {
    const [updated] = await db
      .update(prompts)
      .set(updates)
      .where(eq(prompts.id, id))
      .returning();
    return updated;
  }

  async deletePrompt(id: number): Promise<void> {
    await db.delete(prompts).where(eq(prompts.id, id));
  }
}

export const storage = new DatabaseStorage();
