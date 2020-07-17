import { Todo } from "./todo";

export class TodoList {
    public static todos: Todo[] = new Array;
    private activeItem: Todo;
    
    addTodoItem(name: string, pomodoros: number) {
        let newTodo = new Todo(name, pomodoros);
        TodoList.todos.push(newTodo);
        
        //TODO: Databse?
        return newTodo;
    }

    getAllTodos(): Todo[] {
        return TodoList.todos;
    }

    getItem(id: number) {
        return TodoList.todos.filter(todo => {
            return todo.id == id;
        })[0];
    }

    updateItem(item: Todo) {
        TodoList.todos = TodoList.todos.map(todo => {
            if (todo.id == item.id){
                return item;
            } else { 
                return todo;
            }
        })
        
        // TODO: Database ?
        return TodoList.todos;
    }

    removeItem(id: number) {
        TodoList.todos = TodoList.todos.filter(todo => {
            return todo.id != id;
        })
        // TODO: Database?

        return TodoList.todos;
    }

    setActiveItem(todo: Todo){
        this.activeItem = todo;
    }

    getActiveItem(){
        return this.activeItem
    }
    
    //temp
    printList(){
        TodoList.todos.forEach((todo, index) =>{
            console.log(`${index}) ${todo.name} - ${todo.pomodorosUsed}/${todo.pomodorosAllocated}`);
        })
    }
}