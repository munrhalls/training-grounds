// Mini-project: Todolist with deletable tasks
// Identify
// Thinking mistakes
// Process mistakes
// Bad practices
// Anti-patterns
// Wrong abstractions
// Misuse of HOC pattern
// Mistakenly passing element instead of component reference
// Consequences: inability to pass props, loss of reusability, unexpected behavior
// 20 minutes

import { useState, useEffect } from "react";

const Task = function (description) {
  return <p>{description}</p>;
};

const withInterface = function (WrappedTask) {
  return function (deleteTask) {
    const [done, setDone] = useState(false);

    return (
      <div>
        <input type="checkbox" />
        <WrappedTask />
        <button onClick={deleteTask}>X</button>
      </div>
    );
  };
};

const hardcodedTask = {
  description: "Make coffee",
  id: 1,
};

export default function Todolist() {
  const [tasks, setTasks] = useState([hardcodedTask]);

  const deleteTask = function (id) {
    const deletion = tasks.find((task) => {
      task.id === id;
    });
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(() => newTasks);
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="p-8 rounded-lg border-black border-2 space-y-2">
        <h1 className="text-xl font-black mb-4">Todolist</h1>
        <div>
          <ul>
            {tasks.map((task) => {
              return withInterface(Task(task));
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
