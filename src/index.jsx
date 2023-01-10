import { createSignal, onCleanup, createEffect } from "solid-js";
import { render } from "solid-js/web";

const App = () => {
  const [count, setCount] = createSignal(0),
    timer = setInterval(() => setCount((c) => c + 1), 1500);
  window.count = count;
  window.setCount = setCount;
  onCleanup(() => clearInterval(timer));

  createEffect(() => {
    if (count() % 10 === 0) console.log(`logging ${count()}`);
  });

  return (
    <div>
      <h1>Hello World</h1>
      {count()}
    </div>
  );
};

render(() => <App />, document.getElementById("root"));
