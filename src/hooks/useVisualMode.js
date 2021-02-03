import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      history[history.length - 1] = newMode;
      setMode(newMode);
    } else {
      setHistory([...history, newMode]);
      setMode(newMode);
    }
  }

  function back() {
    if (history.length > 1) {
      history.pop();
      const prev = history[history.length - 1];
      setMode(prev);
    }
  }

  return { mode, transition, back };
}
