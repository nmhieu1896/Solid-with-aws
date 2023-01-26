import axios from "axios";
import { createSignal, createResource, createEffect } from "solid-js";
import { render } from "solid-js/web";
import { z } from "zod";

const getCurrent = async () => axios.get("/api/values/current").then((res) => res.data);
const getAll = async () => axios.get("/api/values/all").then((res) => res.data);

const App = () => {
  const [index, setIndex] = createSignal(0);
  const [values] = createResource(index, getCurrent);
  const [indexes] = createResource(index, getAll);

  createEffect(() => {
    console.log({ values: values() });
    console.log({ indexes: indexes() });
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post("/api/values", {
      index: index(),
    });
    setIndex("");
  };

  return (
    <div>
      <h1>Hello World</h1>
      <form onsubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input value={index()} onChange={(event) => setIndex(event.target.value)} />
        <button>Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      <p>
        {indexes() &&
          indexes()
            .map(({ number }) => number)
            .join(", ")}
      </p>

      <h3>Calculated Values:</h3>
      {values() &&
        Object.entries(values()).map(([key, value]) => {
          return (
            <div key={key}>
              For index {key} I calculated {value}
            </div>
          );
        })}
    </div>
  );
};

render(() => <App />, document.getElementById("root"));
