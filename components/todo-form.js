"use client";

import React from 'react'
import {useState} from 'react'
import {useForm, Controller} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select,SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {Card, CardContent,  CardHeader ,  CardTitle} from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import { useCreateTodo } from '@/hooks/use-create-todo'; 

import {createTodoSchema} from '@/validations/todo'
import { createTodo } from '@/actions/todo-actions';
import { toast } from 'sonner';
import { Plus, X, Sparkles, Circle, ChevronDown, Flame } from 'lucide-react';


const TodoForm = () => {
    const [isOpen, setIsOpen] = useState(false);
    const createTodoMutation = useCreateTodo();

    const form = useForm({
        resolver: zodResolver(createTodoSchema),
        defaultValues:{
            title:" ",
            description:"",
            priority:"medium"

        }
    })
      const onSubmit = async (data)=>{
        try{
            const result = await createTodoMutation.mutateAsync(data)

            if(result.success){
                toast.success("Task created successfully!")
                form.reset();
                setIsOpen(false);
            }
            else{
                toast.error(result.error)
            }
        }catch(err){
            toast.error("Failed to create task")
        }
      }

      if(!isOpen){
        return(
            <Button 
                onClick={()=> setIsOpen(true)} 
                className="w-full h-14 text-base font-medium shadow-sm hover:shadow-md transition-all duration-200 rounded-xl group"
                size="lg"
            >
                <Plus className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform duration-200" />
                Create New Task
            </Button>
        )
      }
  return (
    <Card className="border-2 shadow-lg rounded-2xl overflow-hidden backdrop-blur-sm bg-card/50">
        <CardHeader className="border-b bg-muted/30 pb-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <CardTitle className="text-xl">Create New Task</CardTitle>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                        setIsOpen(false);
                        form.reset();
                    }}
                    className="rounded-full h-8 w-8"
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>
        </CardHeader>
        <CardContent className="pt-6">
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
                <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-medium">Title</Label>
                    <Input 
                        id="title" 
                        {...form.register("title")} 
                        placeholder="What needs to be done?"
                        className="h-11 rounded-xl border-2 focus:border-primary transition-colors"
                    />
                    {form.formState.errors.title &&(
                        <p className='text-xs text-destructive mt-1.5 flex items-center gap-1'>
                            {form.formState.errors.title.message}
                        </p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                    <Textarea 
                        id="description" 
                        {...form.register("description")} 
                        placeholder="Add more details..."
                        className="min-h-[100px] rounded-xl border-2 focus:border-primary transition-colors resize-none"
                    />
                    {form.formState.errors.description &&(
                        <p className='text-xs text-destructive mt-1.5'>{form.formState.errors.description.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="priority" className="text-sm font-medium">Priority Level</Label>
                    <Controller
                        name="priority"
                        control={form.control}
                        render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger className="h-11 rounded-xl border-2">
                                    <SelectValue placeholder="Select priority"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="low" className="cursor-pointer">
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950">
                                                <ChevronDown className="h-3 w-3 text-emerald-600 dark:text-emerald-400" strokeWidth={2.5} />
                                            </div>
                                            <span>Low Priority</span>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="medium" className="cursor-pointer">
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-950">
                                                <Circle className="h-3 w-3 text-amber-600 dark:text-amber-400 fill-amber-600 dark:fill-amber-400" strokeWidth={2} />
                                            </div>
                                            <span>Medium Priority</span>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="high" className="cursor-pointer">
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-950">
                                                <Flame className="h-3 w-3 text-rose-600 dark:text-rose-400 fill-rose-600 dark:fill-rose-400" />
                                            </div>
                                            <span>High Priority</span>
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>

                <div className='flex gap-3 pt-2'>
                    <Button 
                        type="submit" 
                        disabled={createTodoMutation.isPending}
                        className="flex-1 h-11 rounded-xl shadow-sm hover:shadow transition-all"
                    >
                        {createTodoMutation.isPending ? "Creating..." : "Create Task"}
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick ={()=>{
                            setIsOpen(false)
                            form.reset();
                        }}
                        className="h-11 px-6 rounded-xl border-2"
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </CardContent>
    </Card>
  )
}

export default TodoForm