"use client";

import React ,{useState}from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Calendar, Clock, Circle, ChevronDown, Flame } from "lucide-react";
import {cn} from "@/lib/utils";
import { useToggleTodo, useDeleteTodo } from "@/hooks/use-create-todo";
import { toast } from "sonner";

const TodoItem = ({ todo }) => {

    const [isDeleting, setIsDeleting] = useState(false); 
    const toggleTodoMutation = useToggleTodo();
    const deleteTodoMutation = useDeleteTodo();

    const handleToggle = async () => {
        try {
            const result = await toggleTodoMutation.mutateAsync(todo._id);
            if (result.success) {
                toast.success(result.data.completed ? "Task completed! 🎉" : "Task reopened");
            } else {
                toast.error(result.error);
            }
        } catch (error) {
            toast.error("Failed to toggle task");
        }
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const result = await deleteTodoMutation.mutateAsync(todo._id);
            if (result.success) {
                toast.success("Task deleted");
            } else {
                toast.error(result.error);
            }
        } catch (error) {
            toast.error("Failed to delete task");
        } finally {
            setIsDeleting(false);
        }
    };

    const getPriorityConfig = (priority) => {
        switch (priority) {
            case 'high':
                return {
                    icon: Flame,
                    label: 'High',
                    className: 'bg-gradient-to-br from-rose-50 to-pink-50 text-rose-700 border-rose-200 dark:from-rose-950/50 dark:to-pink-950/50 dark:text-rose-400 dark:border-rose-900/50',
                    iconBg: 'bg-rose-100 dark:bg-rose-900/50',
                    iconColor: 'text-rose-600 dark:text-rose-400 fill-rose-600 dark:fill-rose-400'
                };
            case 'medium':
                return {
                    icon: Circle,
                    label: 'Medium',
                    className: 'bg-gradient-to-br from-amber-50 to-yellow-50 text-amber-700 border-amber-200 dark:from-amber-950/50 dark:to-yellow-950/50 dark:text-amber-400 dark:border-amber-900/50',
                    iconBg: 'bg-amber-100 dark:bg-amber-900/50',
                    iconColor: 'text-amber-600 dark:text-amber-400 fill-amber-600 dark:fill-amber-400'
                };
            case 'low':
                return {
                    icon: ChevronDown,
                    label: 'Low',
                    className: 'bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-700 border-emerald-200 dark:from-emerald-950/50 dark:to-teal-950/50 dark:text-emerald-400 dark:border-emerald-900/50',
                    iconBg: 'bg-emerald-100 dark:bg-emerald-900/50',
                    iconColor: 'text-emerald-600 dark:text-emerald-400'
                };
            default:
                return {
                    icon: Circle,
                    label: 'Normal',
                    className: 'bg-gradient-to-br from-gray-50 to-slate-50 text-gray-700 border-gray-200 dark:from-gray-950/50 dark:to-slate-950/50 dark:text-gray-400 dark:border-gray-800',
                    iconBg: 'bg-gray-100 dark:bg-gray-900/50',
                    iconColor: 'text-gray-600 dark:text-gray-400 fill-gray-600 dark:fill-gray-400'
                };
        }
    };

    const priorityConfig = getPriorityConfig(todo.priority);

    return (
        <Card className={cn(
            "group transition-all duration-300 hover:shadow-lg border-2 rounded-2xl overflow-hidden backdrop-blur-sm",
            todo.completed && "opacity-60 hover:opacity-80",
            isDeleting && "scale-95 opacity-50"
        )}>
            <CardContent className="p-5">
            <div className='flex items-start gap-4'>
                <Checkbox
                    checked={todo.completed}
                    onCheckedChange={handleToggle}
                    disabled={toggleTodoMutation.isPending}
                    className={cn(
                        "mt-1 h-5 w-5 rounded-md transition-all duration-200",
                        todo.completed && "data-[state=checked]:bg-primary"
                    )}
                />

                <div className='flex-1 min-w-0 space-y-2'>
                    <div className='flex items-start justify-between gap-3'>
                        <h3 className={cn(
                            "font-semibold text-base leading-snug transition-all duration-200",
                            todo.completed && "line-through text-muted-foreground"
                        )}>
                            {todo.title}
                        </h3>
                        <Badge 
                            variant="outline"
                            className={cn(
                                "text-xs font-medium px-2.5 py-1.5 rounded-full border whitespace-nowrap flex items-center gap-1.5 shadow-sm",
                                priorityConfig.className
                            )}
                        >
                            <div className={cn("p-0.5 rounded-full", priorityConfig.iconBg)}>
                                <priorityConfig.icon className={cn("h-3 w-3", priorityConfig.iconColor)} />
                            </div>
                            <span className="font-semibold">{priorityConfig.label}</span>
                        </Badge>
                    </div>
                    
                    {todo.description && (
                        <p className={cn(
                            "text-sm text-muted-foreground leading-relaxed",
                            todo.completed && "line-through opacity-75"
                        )}>
                            {todo.description}
                        </p>
                    )}

                    <div className='flex items-center gap-1.5 text-xs text-muted-foreground/70'>
                        <Clock className='w-3.5 h-3.5' />
                        <span>{new Date(todo.createdAt).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                        })}</span>
                    </div>  
                </div>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleDelete}
                    disabled={deleteTodoMutation.isPending}
                    className={cn(
                        "h-9 w-9 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200",
                        "hover:bg-destructive/10 hover:text-destructive",
                        isDeleting && "opacity-100"
                    )}
                > 
                    <Trash2 className='w-4 h-4' />
                </Button>
            </div>
            </CardContent>
        </Card>
    );
};

export default TodoItem;
