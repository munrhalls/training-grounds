import { useEffect, useState } from "react";

export const DataFetcher = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // TODO: Write your useEffect hook here.
  // It should fetch from "https/api.example.com/data"
  // and set the result to the 'data' state.
  // It must only run one time.

  const fetchData = async function () {
    setLoading(true);
    try {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve("ok");
        }, 3000);
      });
      const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
      if (res?.status !== 200) throw Error("Bad response");
      const data = await res.json();
      if (!data) throw Error("Bad data");
      setData(data);
      console.log(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <div>
          <h1>Hello</h1>
          <button onClick={fetchData}>Fetch Data</button>
          {data && `Data: ${data.title}`}
        </div>
      )}
    </>
  );
};
