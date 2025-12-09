import { useState } from "react";
import "./css/TodoList.css"

export interface TodoItem {
    id: number;
    text: string;
    completed: boolean;
}

type Filter = "all" | "active" | "completed";

const TodoList = () => {
    const [items, setItems] = useState<TodoItem[]>([
        { id: 1, text: "Item 1", completed: false },
        { id: 2, text: "Item 2", completed: false },
        { id: 3, text: "Item 3", completed: false },
        { id: 4, text: "Item 4", completed: false },
        { id: 5, text: "Item 5", completed: false },
    ]);

    const [input, setInput] = useState("");
    const [filter, setFilter] = useState<Filter>("all");

    const handleToggleCompleted = (id: number) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? { ...item, completed: !item.completed }
                    : item
            )
        );
    };

    const handleAddItem = () => {
        if (!input.trim()) return;

        setItems((prev) => [
            ...prev,
            {
                id: Date.now(),
                text: input,
                completed: false,
            },
        ]);

        setInput("");
    }

    const handleRemoveItem = (id: number) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter")
            handleAddItem();
    }

    const totalCount = items.length;
    const completedCount = items.filter((item) => item.completed).length;
    const activeCount = totalCount - completedCount;

    const filteredItems = items.filter((item) => {
        let result;
        switch (filter) {
            case "completed":
                result = item.completed;
                break;
            case "active":
                result = !item.completed;
                break;
            default:
                result = "all"
                break;
        }
        return result;
    })

    return (
        <div>
            <h2>Todo List</h2>

            <div className="todo-input-box">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Add a new todo..."
                />
                <button onClick={handleAddItem}>Add</button>
            </div>

            <div className="todo-filters">
                <button
                    className={`todo-filter-btn ${filter === "all" ? "active" : ""}`}
                    onClick={() => setFilter("all")}
                >
                    All <span className="count-badge">{totalCount}</span>
                </button>
                <button
                    className={`todo-filter-btn ${filter === "active" ? "active" : ""}`}
                    onClick={() => setFilter("active")}
                >
                    Active <span className="count-badge">{activeCount}</span>
                </button>
                <button
                    className={`todo-filter-btn ${filter === "completed" ? "active" : ""}`}
                    onClick={() => setFilter("completed")}
                >
                    Completed <span className="count-badge">{completedCount}</span>
                </button>
            </div>

            <ul className="todo-list">
                {filteredItems.map((item) => (
                    <li key={item.id}>
                        <div className="todo-left">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={item.completed}
                                    onChange={() => handleToggleCompleted(item.id)}
                                />
                                <span
                                    className={`todo-text ${item.completed ? "completed" : ""}`}
                                >
                                {item.text}
                            </span>
                            </label>
                        </div>

                        <button
                            className="delete-btn"
                            onClick={() => handleRemoveItem(item.id)}
                        >
                            ❌
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;