import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertPromptSchema, type InsertPrompt, type Prompt } from "@shared/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreatePrompt, useUpdatePrompt } from "@/hooks/use-prompts";
import { DialogFooter } from "@/components/ui/dialog";

interface PromptFormProps {
  prompt?: Prompt; // If provided, we're editing
  onSuccess?: () => void;
}

export function PromptForm({ prompt, onSuccess }: PromptFormProps) {
  const createMutation = useCreatePrompt();
  const updateMutation = useUpdatePrompt();

  const isEditing = !!prompt;
  const isPending = createMutation.isPending || updateMutation.isPending;

  const form = useForm<InsertPrompt>({
    resolver: zodResolver(insertPromptSchema),
    defaultValues: {
      title: prompt?.title ?? "",
      content: prompt?.content ?? "",
      category: prompt?.category ?? "General",
    },
  });

  const onSubmit = (data: InsertPrompt) => {
    if (isEditing) {
      updateMutation.mutate(
        { id: prompt.id, ...data },
        {
          onSuccess: () => onSuccess?.(),
        }
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => onSuccess?.(),
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground/80 font-medium">标题</FormLabel>
              <FormControl>
                <Input 
                  placeholder="例如：SEO 博客文章生成器" 
                  {...field} 
                  className="rounded-xl border-2 focus-visible:ring-primary/20"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground/80 font-medium">分类</FormLabel>
              <FormControl>
                <Input 
                  placeholder="例如：营销、编程、邮件" 
                  {...field}
                  className="rounded-xl border-2 focus-visible:ring-primary/20"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground/80 font-medium">提示词内容</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="在此输入提示词文本..."
                  className="min-h-[200px] resize-none font-mono text-sm rounded-xl border-2 focus-visible:ring-primary/20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-auto rounded-xl font-semibold bg-primary hover:bg-primary/90 transition-all duration-200"
          >
            {isPending ? (isEditing ? "保存中..." : "创建中...") : (isEditing ? "保存修改" : "创建提示词")}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
