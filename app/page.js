import Image from "next/image";
import {Button} from "@/components/ui/button";
import connectDB from "@/lib/db";
import TodoForm from "@/components/todo-form";
import TodoList from "@/components/todo-list";
import TodoFilter from "@/components/todo-filter";
import ThemeToggle from "@/components/theme-toggle";
import { CheckCircle2 } from "lucide-react";

export default async  function Home() {
  await connectDB()
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 transition-colors duration-500">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-3xl">
        <header className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-2xl">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Tasks</h1>
                <p className="text-sm text-muted-foreground mt-0.5">Stay organized, stay productive</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </header>
        
        <main className="space-y-6">
          <TodoForm/>
          <div className="space-y-4">
            <TodoFilter/>
            <TodoList/>
          </div>
        </main>
      </div>

      <footer className="mt-16 pb-8 text-center text-xs text-muted-foreground">
        <p className="opacity-60">Built with Next.js • Zustand • TanStack Query • Zod • Mongoose</p>
      </footer>
    </div>
  );
}
