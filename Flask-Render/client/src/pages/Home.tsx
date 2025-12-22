import { usePrompts } from "@/hooks/use-prompts";
import { PromptCard } from "@/components/PromptCard";
import { PromptForm } from "@/components/PromptForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, BookMarked, Github, Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function Home() {
  const { data: prompts, isLoading, error } = usePrompts();
  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const filteredPrompts = prompts?.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    p.category.toLowerCase().includes(search.toLowerCase()) ||
    p.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background font-sans pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
              <Sparkles className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight font-display">提示词管理器</h1>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="https://nei-rong-gou-jian-zhong-wen--guanyu432hz.replit.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              title="书签参考"
            >
              <BookMarked className="w-5 h-5" />
            </a>
            <a 
              href="https://github.com/dashboard" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              title="GitHub 仓库"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Actions Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between">
          <div className="w-full md:w-96 relative">
            <Input 
              placeholder="搜索提示词..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-4 h-11 rounded-xl border-2 focus-visible:ring-primary/20 bg-background shadow-sm"
            />
          </div>

          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="w-full md:w-auto rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all font-semibold h-11 px-6">
                <Plus className="mr-2 h-5 w-5" />
                新建提示词
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] rounded-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-display">创建新提示词</DialogTitle>
              </DialogHeader>
              <PromptForm onSuccess={() => setIsCreateOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="w-10 h-10 animate-spin mb-4 text-primary" />
            <p>正在加载提示词...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-destructive font-medium mb-2">加载提示词失败</p>
            <p className="text-muted-foreground text-sm">{(error as Error).message}</p>
          </div>
        ) : filteredPrompts?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-border/60 rounded-3xl bg-muted/5">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold font-display text-foreground mb-2">未找到提示词</h3>
            <p className="text-muted-foreground max-w-sm text-center mb-6">
              {search ? "尝试调整您的搜索条件。" : "开始创建您的第一个提示词模板以供后续重复使用。"}
            </p>
            {!search && (
              <Button onClick={() => setIsCreateOpen(true)} className="rounded-xl">
                创建提示词
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrompts?.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
