import { type Prompt } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Pencil, Trash2, Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PromptForm } from "./PromptForm";
import { useDeletePrompt } from "@/hooks/use-prompts";
import { Badge } from "@/components/ui/badge";

interface PromptCardProps {
  prompt: Prompt;
}

export function PromptCard({ prompt }: PromptCardProps) {
  const { toast } = useToast();
  const deleteMutation = useDeletePrompt();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.content);
      toast({
        title: "已复制！",
        description: "提示词内容已复制到剪贴板。",
        className: "bg-primary text-primary-foreground border-none",
      });
    } catch (err) {
      toast({
        title: "复制失败",
        variant: "destructive",
      });
    }
  };

  const handleDelete = () => {
    deleteMutation.mutate(prompt.id, {
      onSuccess: () => setIsDeleteDialogOpen(false),
    });
  };

  return (
    <Card className="group h-full flex flex-col border border-border/60 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 bg-card rounded-xl overflow-hidden">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3 bg-muted/20">
        <div className="space-y-1.5 flex-1 pr-4">
          <CardTitle className="text-lg font-bold leading-tight line-clamp-2">
            {prompt.title}
          </CardTitle>
          <div className="flex items-center gap-1.5">
            <Badge variant="secondary" className="px-2 py-0.5 text-xs font-medium text-muted-foreground bg-white border border-border/50 rounded-md">
              <Tag className="w-3 h-3 mr-1 opacity-70" />
              {prompt.category}
            </Badge>
          </div>
        </div>
        
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                <Pencil className="h-4 w-4" />
                <span className="sr-only">编辑</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] rounded-2xl">
              <DialogHeader>
                <DialogTitle>编辑提示词</DialogTitle>
              </DialogHeader>
              <PromptForm prompt={prompt} onSuccess={() => setIsEditDialogOpen(false)} />
            </DialogContent>
          </Dialog>

          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">删除</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-2xl">
              <AlertDialogHeader>
                <AlertDialogTitle>删除此提示词？</AlertDialogTitle>
                <AlertDialogDescription>
                  此操作无法撤销。这将永久删除提示词
                  "{prompt.title}"。
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-lg">取消</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-lg"
                >
                  {deleteMutation.isPending ? "删除中..." : "删除"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pt-4 pb-4 relative">
        <div className="bg-muted/30 p-4 rounded-lg border border-border/50 h-[180px] overflow-hidden relative group/content">
          <p className="font-mono text-sm text-muted-foreground whitespace-pre-wrap line-clamp-[7]">
            {prompt.content}
          </p>
          
          <div className="absolute inset-0 bg-gradient-to-t from-muted/30 to-transparent pointer-events-none" />
          
          <div className="absolute bottom-2 right-2">
             <Button
              onClick={handleCopy}
              size="sm"
              className="h-8 gap-1.5 shadow-sm bg-background text-foreground hover:bg-background border border-input hover:text-primary transition-all rounded-lg"
              variant="outline"
            >
              <Copy className="h-3.5 w-3.5" />
              复制
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
