"use client" 
import React from 'react'
import {useTodos} from '@/hooks/use-create-todo';
import {useTodoStore} from '@/store/todo-store';
import TodoItem from './todo-item';

import {Card, CardContent} from "@/components/ui/card";
import {Loader2, Inbox, AlertCircle} from "lucide-react"; 

const TodoList = () => {
    const {data: todos, isLoading, error} = useTodos();
    const filter = useTodoStore((state) => state.filter);
    const filterTodos = useTodoStore((state) => state.filterTodos);
    
    const filteredTodos = filterTodos();

    if(isLoading){
        return(
            <Card className="rounded-2xl border-2 shadow-lg backdrop-blur-sm bg-card/50">
                <CardContent className="p-16 text-center">
                    <Loader2 className='w-10 h-10 animate-spin mx-auto mb-4 text-primary'/>
                    <p className='text-muted-foreground font-medium'>Loading your tasks...</p> 
                </CardContent>
            </Card>
        )
    }
    if(error){
        return(
            <Card className="rounded-2xl border-2 border-destructive/20 shadow-lg backdrop-blur-sm bg-card/50">
                <CardContent className="p-12 text-center">
                    <AlertCircle className="w-12 h-12 mx-auto mb-4 text-destructive" />
                    <p className='text-destructive font-medium mb-2'>Error loading tasks</p>
                    <p className='text-sm text-muted-foreground'>{error.message}</p>
                </CardContent>
            </Card>
        )
    }

    if(!filteredTodos || filteredTodos.length === 0){
        return(
            <Card className="rounded-2xl border-2 border-dashed shadow-lg backdrop-blur-sm bg-card/50">
                <CardContent className="p-16 text-center">
                    <Inbox className="w-16 h-16 mx-auto mb-4 text-muted-foreground/40" />
                    <p className='text-lg font-semibold text-foreground mb-2'>
                        {todos?.length === 0 ? "No tasks yet" : "No matching tasks"}
                    </p>
                    <p className='text-sm text-muted-foreground'>
                        {todos?.length === 0 
                            ? "Create your first task to get started" 
                            : "Try adjusting your filters"}
                    </p>
                </CardContent>
            </Card>
        )
    }
  return (
    <div className='space-y-3'>
        {
            filteredTodos.map((todo)=>(
                <TodoItem key={todo._id} todo={todo} />
            ))
        }
    </div>
  )
}

export default TodoList 