/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { Todo } from "./models/todo-list";
export namespace Components {
    interface AppHome {
    }
    interface AppProfile {
        "name": string;
    }
    interface AppRoot {
    }
    interface PomodoroTimer {
        "duration": number;
    }
    interface PomodoroTodo {
    }
    interface TodoItem {
        "todo": Todo;
    }
}
declare global {
    interface HTMLAppHomeElement extends Components.AppHome, HTMLStencilElement {
    }
    var HTMLAppHomeElement: {
        prototype: HTMLAppHomeElement;
        new (): HTMLAppHomeElement;
    };
    interface HTMLAppProfileElement extends Components.AppProfile, HTMLStencilElement {
    }
    var HTMLAppProfileElement: {
        prototype: HTMLAppProfileElement;
        new (): HTMLAppProfileElement;
    };
    interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {
    }
    var HTMLAppRootElement: {
        prototype: HTMLAppRootElement;
        new (): HTMLAppRootElement;
    };
    interface HTMLPomodoroTimerElement extends Components.PomodoroTimer, HTMLStencilElement {
    }
    var HTMLPomodoroTimerElement: {
        prototype: HTMLPomodoroTimerElement;
        new (): HTMLPomodoroTimerElement;
    };
    interface HTMLPomodoroTodoElement extends Components.PomodoroTodo, HTMLStencilElement {
    }
    var HTMLPomodoroTodoElement: {
        prototype: HTMLPomodoroTodoElement;
        new (): HTMLPomodoroTodoElement;
    };
    interface HTMLTodoItemElement extends Components.TodoItem, HTMLStencilElement {
    }
    var HTMLTodoItemElement: {
        prototype: HTMLTodoItemElement;
        new (): HTMLTodoItemElement;
    };
    interface HTMLElementTagNameMap {
        "app-home": HTMLAppHomeElement;
        "app-profile": HTMLAppProfileElement;
        "app-root": HTMLAppRootElement;
        "pomodoro-timer": HTMLPomodoroTimerElement;
        "pomodoro-todo": HTMLPomodoroTodoElement;
        "todo-item": HTMLTodoItemElement;
    }
}
declare namespace LocalJSX {
    interface AppHome {
    }
    interface AppProfile {
        "name"?: string;
    }
    interface AppRoot {
    }
    interface PomodoroTimer {
        "duration"?: number;
    }
    interface PomodoroTodo {
    }
    interface TodoItem {
        "onRemoveTodo"?: (event: CustomEvent<any>) => void;
        "onUpdateTodo"?: (event: CustomEvent<any>) => void;
        "todo"?: Todo;
    }
    interface IntrinsicElements {
        "app-home": AppHome;
        "app-profile": AppProfile;
        "app-root": AppRoot;
        "pomodoro-timer": PomodoroTimer;
        "pomodoro-todo": PomodoroTodo;
        "todo-item": TodoItem;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-home": LocalJSX.AppHome & JSXBase.HTMLAttributes<HTMLAppHomeElement>;
            "app-profile": LocalJSX.AppProfile & JSXBase.HTMLAttributes<HTMLAppProfileElement>;
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
            "pomodoro-timer": LocalJSX.PomodoroTimer & JSXBase.HTMLAttributes<HTMLPomodoroTimerElement>;
            "pomodoro-todo": LocalJSX.PomodoroTodo & JSXBase.HTMLAttributes<HTMLPomodoroTodoElement>;
            "todo-item": LocalJSX.TodoItem & JSXBase.HTMLAttributes<HTMLTodoItemElement>;
        }
    }
}
