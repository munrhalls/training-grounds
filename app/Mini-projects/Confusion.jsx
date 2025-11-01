import { useState } from "react";

export default function Confusion() {
  const mockList = [
    { id: 1323211, text: "Make coffee" },
    { id: 12312, text: "Make tea" },
    { id: 3123213, text: "Make cake, too" },
  ];
  const [list, setList] = useState(mockList);

  console.log(list);

  const withInterface = function (Task) {
    return function () {
      return (
        <div>
          <Task />
          <button>X</button>
        </div>
      );
    };
  };

  const TasksWithInterface = function () {
    const tasks = [];
    list.forEach((task) => {
      const task = <li key={task.id}>{task.text}</li>;
      tasks = [...tasks, withInterface(task)];
    });
    return tasks;
  };

  return (
    <div className="h-screen w-screen grid place-content-center">
      <div className="border-black border-2 rounded-lg grid place-content-center space-y-7 p-14 m-4">
        <h1 className="font-black text-3xl">TODOLIST</h1>
        <ul>
          <TasksWithInterface />
        </ul>
      </div>
    </div>
  );
}
