import { useState } from "react";
import { useTodo } from "../context/TodoContext";

export default function TodoForm() {
    const [todo, setTodo] = useState("");
    const {addTodo} = useTodo();

    function addTodoItem(event) {
        event.preventDefault();

        if (!todo) return;

        addTodo({todo})
        setTodo("");
    }

    return (
        <form  className="flex" onSubmit={addTodoItem}>
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={todo}
                onChange={(event) => setTodo(event.target.value)}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    )
}