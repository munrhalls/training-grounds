import React from "react";

export default function TodolistFindBug() {
  const [list, setList] = React.useState([
    { id: 1, done: false, task: "Learn React" },
    { id: 2, done: false, task: "Build a Todo App" },
    { id: 3, done: false, task: "Master JavaScript" },
  ]);
  const [newTask, setNewTask] = React.useState("");

  const addTask = () => {
    if (newTask.trim() === "") return;
    const newItem = {
      id: Date.now(),
      done: false,
      task: newTask,
    };
    setList((prevList) => [...prevList, newItem]);
    setNewTask("");
  };

  const toggleDone = (id) => {
    setList((prevList) => prevList.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
  };

  const deleteTask = (id) => {
    setList((prevList) => prevList.filter((item) => item.id !== id));
  };

  const withInterface = (WrappedTask) => {
    return (props) => {
      const { task } = props;
      return (
        <div className="grid grid-cols-3 gap-4">
          <WrappedTask {...props} />
          <div className="col-span-2 flex gap-4 items-center">
            <input className="p-4cursor-pointer w-7 h-7" type="checkbox" checked={task.done} onChange={() => toggleDone(task.id)}></input>
            <button className="cursor-pointer border-2 border-red-600 px-2 rounded-lg" onClick={() => deleteTask(task.id)}>
              X
            </button>
          </div>
        </div>
      );
    };
  };

  const Task = ({ task }) => {
    return <li>{task.task}</li>;
  };

  const TaskWithInteface = withInterface(Task);

  return (
    <div className="h-screen w-screen grid place-content-center">
      <div className="border-2 border-blue-500 p-4 rounded-xl">
        <h1 className="font-black text-3xl">Todo List</h1>
        <div className="rounded-lg border-2 border-blue-500 p-2 mb-4 flex gap-2">
          <input className="cursor-pointer border-black rounded-lg border-2 p-4" type="text" placeholder="New task..." onChange={(e) => setNewTask(e.target.value)} />
          <button className="cursor-pointer bg-blue-500 text-white rounded-lg px-4 py-2 font-black" onClick={addTask}>
            Add Task
          </button>
        </div>

        <ul className="flex flex-col gap-2">
          {list.map((item) => (
            <TaskWithInteface key={item.id} task={item} />
          ))}
        </ul>
      </div>
    </div>
  );
}
