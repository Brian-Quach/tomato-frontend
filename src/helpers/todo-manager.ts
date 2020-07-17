import { TodoList } from "../models/todo-list";
import { Todo } from "../models/todo";

export class TodoManager {
  private static _instance: TodoManager;
  private todoList: TodoList;
  private currentItem: Todo;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  private constructor() {
    this.todoList = new TodoList();
  }

  getList(): TodoList {
    return this.todoList;
  }

  markComplete(id?: number) {
    if (!id && !this.currentItem) return;
    if (id != null) {
      let toUpdate = this.todoList.getItem(id);
      toUpdate.completed = true;
      this.todoList.updateItem(toUpdate);
    } else {
      this.currentItem.completed = true;
      this.todoList.updateItem(this.currentItem);
    }
  }

  markIncomplete(id?: number) {
    if (!id && !this.currentItem) return;
    if (id != null) {
      let toUpdate = this.todoList.getItem(id);
      toUpdate.completed = false;
      this.todoList.updateItem(toUpdate);
    } else {
      this.currentItem.completed = false;
      this.todoList.updateItem(this.currentItem);
    }
  }

  incrementPomodoros(id?: number) {
    if (!id && !this.currentItem) return;
    if (id != null) {
      let toUpdate = this.todoList.getItem(id);
      toUpdate.pomodorosUsed = toUpdate.pomodorosUsed + 1;
      this.todoList.updateItem(toUpdate);
    } else {
      this.currentItem.pomodorosUsed = this.currentItem.pomodorosUsed + 1;
      this.todoList.updateItem(this.currentItem);
    }
  }

  getCurrentItem() {
    return this.todoList.getActiveItem()
  }

  setCurrentItem(id: number) {
    this.todoList.getActiveItem().isActive = false;
    this.todoList.getItem(id).isActive = true;
    this.todoList.setActiveItem(this.todoList.getItem(id))
  }

  addItem(itemName: string, pomodoros: number = 0) {
    let addedItem = this.todoList.addTodoItem(itemName, pomodoros);
    if (this.todoList.getActiveItem() == null) {
      addedItem.isActive = true;
      this.todoList.setActiveItem(addedItem);
    }
    return this.getList();
  }

  getAllItems(): Todo[] {
    return this.todoList.getAllTodos();
  }

  removeItem(id: number) {
    this.todoList.removeItem(id);
  }
}
