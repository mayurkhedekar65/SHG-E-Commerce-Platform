import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <p className="text-5xl text-white">hello world</p>
      </div>
    </>
  );
}

export default App;
