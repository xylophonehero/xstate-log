import "./styles.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { createMachine, assign, actions } from "xstate";
import { useMachine } from "@xstate/react";
const {log} = actions

interface ToggleContext {
  count: number;
}

const toggleMachine = createMachine({
  tsTypes: {} as import("./index.typegen").Typegen0,
  schema: {
    context: {} as ToggleContext
  },
  id: "toggle",
  initial: "inactive",
  context: {
    count: 0
  },
  states: {
    inactive: {
      on: { 
        TOGGLE: {
          actions: log((ctx, e)=> ctx.count),
          target:"active" 
        }
      }
    },
    active: {
      entry: 'setCount',
      on: { TOGGLE: "inactive" }
    }
  }
}, {
  actions: {
    setCount: assign({ count: (ctx) => ctx.count + 1 }),
  }
});

function App() {
  const [current, send] = useMachine(toggleMachine);
  const active = current.matches("active");
  const { count } = current.context;

  return (
    <div className="App">
      <h1>XState React Template</h1>
      <h2>Fork this template!</h2>
      <button onClick={() => send("TOGGLE")}>
        Click me ({active ? "✅" : "❌"})
      </button>{" "}
      <code>
        Toggled <strong>{count}</strong> times
      </code>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
