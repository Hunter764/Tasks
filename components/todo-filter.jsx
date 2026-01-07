"use client"

import React from 'react'
import {Button } from '@/components/ui/button';
import {Card, CardContent} from "@/components/ui/card";
import {useTodoStore} from '@/store/todo-store';
import { Circle, CheckCircle, ListTodo } from 'lucide-react';


const TodoFilter = () => {
    const {filter, setFilter, activeCount, completedCount} = useTodoStore();

    const filters = [
        {key: "all", label: "All" , count: activeCount() + completedCount(), icon: ListTodo},
        {key: "active", label: "Active" , count: activeCount(), icon: Circle},
        {key: "completed", label: "Completed" , count: completedCount(), icon: CheckCircle},
    ]
  return (
    <div className="flex items-center gap-2 p-1 bg-muted/50 rounded-xl backdrop-blur-sm">
        {filters.map(({key, label, count, icon: Icon})=>(
            <Button 
                key={key}
                variant = {filter === key ? "default" : "ghost"}
                size ="sm"
                onClick={() => setFilter(key)}
                className={`flex-1 gap-2 transition-all duration-200 ${
                    filter === key 
                    ? "shadow-sm" 
                    : "hover:bg-background/60"
                }`}
            >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{label}</span>
                {count > 0 && (
                    <span className={`ml-auto min-w-[1.5rem] h-6 flex items-center justify-center px-2 text-xs font-semibold rounded-full ${
                        filter === key 
                        ? "bg-primary-foreground/20 text-primary-foreground" 
                        : "bg-primary/10 text-primary"
                    }`}>
                        {count}
                    </span>
                )}
            </Button>
        ))}
    </div>
  )
}

export default TodoFilter