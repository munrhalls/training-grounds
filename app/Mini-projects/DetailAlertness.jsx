// START TIMER NOW - THIS EXERCISE ONLY MAKES SENSE UNDER TIME PRESSURE
// START. T I M E R. N O W.
// Take this for granted, as the msitake is not what you think - this list is completely proper
// There is not a single mistake of any kind in the code itself
// There is nothing wrong in this code
// It should and absolutely will work as expected
// It's just a nice start of making a todolist, very straightforward, standard, nothing fancy
// This is solid, there is just nothing wrong in this code
// And again, it's guaranteed that it is all coded exactly as it should be - 100% correct

// Take it from there - and complete this code into FULL Todolist COMPONENT and SEE HOW MUCH TIME IT TAKES

import { useState } from "react";

export default function Todolist() {
  const mockList = [
    { id: 1323211, text: "Make coffee" },
    { id: 12312, text: "Make tea" },
    { id: 3123213, text: "Make cake, too" },
  ];
  const [list, setList] = useState([mockList]);

  console.log(list);
  return (
    <div className="h-screen w-screen grid place-content-center">
      <div className="border-black border-2 rounded-lg grid place-content-center space-y-7 p-14 m-4">
        <h1 className="font-black text-3xl">TODOLIST</h1>
        <ul>
          {list.map((task) => (
            <li key={task.id}>{task.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
