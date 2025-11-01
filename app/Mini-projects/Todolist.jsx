import { useState } from "react";

const mockList = [
  { id: 1323211, done: false, text: "Make coffee" },
  { id: 12312, done: false, text: "Make tea" },
  { id: 3123213, done: false, text: "Make cake, too" },
];

export default function Todolist() {
  const [list, setList] = useState(mockList);
  const [newTaskText, setNewTaskText] = useState("");

  const deleteTask = function (id) {
    setList((list) => list.filter((task) => task.id !== id));
  };

  const toggleDone = function (id) {
    const copy = [...list];
    const task = copy.find((task) => task.id === id);
    task.done = true;
    setList((copy) => copy);
  };

  const addTask = function (e) {
    e.preventDefault();
    if (newTaskText === "") return;
    const newTask = {
      id: Math.random(),
      done: false,
      text: newTaskText,
    };
    const newList = [...list, newTask];
    setList(() => newList);
    setNewTaskText("");
  };

  const withInterface = function (Task) {
    return function (props) {
      const { task } = props;

      return (
        <div className="grid grid-cols-3">
          <Task {...props} />
          <div className="col-span-2 flex justify-end items-center">
            <input className="cursor-pointer  w-6 h-6 font-black" type="checkbox" onClick={() => toggleDone(task.id)}></input>
            <button className="cursor-pointer w-14 h-14 font-black" onClick={() => deleteTask(task.id)}>
              X
            </button>
          </div>
        </div>
      );
    };
  };
  const Task = function ({ task }) {
    return <li className="h-6 flex justify-start items-center font-black">{task.text}</li>;
  };

  const TaskWithInterface = withInterface(Task);

  return (
    <div className="h-screen w-screen grid place-content-center">
      <div className="border-black border-2 rounded-lg grid place-content-center space-y-7 p-14 m-4">
        <h1 className="font-black text-3xl">TODOLIST</h1>
        <div className="border-black black-2 rounded-lg">
          <input className="rounded-lg border-black border-2 p-4 my-4" type="text" placeholder="New task..." onChange={(e) => setNewTaskText(e.target.value)} value={newTaskText} />
          <button className="cursor-pointer rounded-lg border-black border-2 p-4 ml-1 my-4" type="submit" onClick={addTask}>
            Add
          </button>
        </div>

        <ul>
          {list.map((task) => (
            <TaskWithInterface key={task.id} task={task} />
          ))}
        </ul>
      </div>
    </div>
  );
}
