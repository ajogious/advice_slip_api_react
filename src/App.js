import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [adviceData, setAdviceData] = useState({
    advice: "",
    count: 0,
  });

  async function getAdvice(incrementCount = true) {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();

    setAdviceData((prevData) => ({
      advice: data.slip.advice,
      count: incrementCount ? prevData.count + 1 : 1,
    }));
  }

  useEffect(function () {
    getAdvice(false);
  }, []);

  return (
    <div>
      <h1>{adviceData.advice}</h1>
      <button onClick={getAdvice}>Get advice</button>
      <Message count={adviceData.count} />
    </div>
  );
}

function Message({ count }) {
  return (
    <p>
      You have read <strong>{count}</strong> pieces of advice
    </p>
  );
}
