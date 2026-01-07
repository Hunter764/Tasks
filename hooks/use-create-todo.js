import {createTodo, getTodos, toggleTodo, deleteTodo} from "@/actions/todo-actions";
import {createTodoSchema} from "@/validations/todo";
import {useTodoStore} from "@/store/todo-store";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useQuery} from "@tanstack/react-query";

export const todoKeys = {
    all:["todo"],
    lists:()=>[...todoKeys.all, "list"]
}


export function useCreateTodo() {
    const queryClient = useQueryClient();

    const addTodo = useTodoStore((state) => state.addTodo)

    return useMutation({
        mutationFn:(data)=>createTodo(data),
        onSuccess:(result)=>{
            console.log("Todo created:", result);

            queryClient.invalidateQueries({queryKey:todoKeys.lists()})
        }
    })
}

export function useTodos(){
    const setTodos = useTodoStore((state)=>state.setTodos);

    return useQuery({
        queryKey:todoKeys.lists(),
        queryFn: async()=>{
            const result = await getTodos();
            console.log(result);

            if(result.success){
                //update zustand store with fetched data;
                setTodos(result.data);

                return result.data;
            }
            throw new Error(result.error);
        }
    })
}

export function useToggleTodo(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => toggleTodo(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: todoKeys.lists()});
        }
    });
}

export function useDeleteTodo(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => deleteTodo(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: todoKeys.lists()});
        }
    });
}