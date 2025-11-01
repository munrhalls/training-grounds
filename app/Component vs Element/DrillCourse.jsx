import React, { useState } from "react";

const initialTasks = [
  { id: 1, text: "Buy Milk" },
  { id: 2, text: "Call Plumber" },
];

export default function TodoList() {
  const [taskList, setTaskList] = useState(initialTasks);

  return (
    <ul>
      {taskList.map((el) => (
        <li key={el}>{el.text}</li>
      ))}
    </ul>
  );
}
