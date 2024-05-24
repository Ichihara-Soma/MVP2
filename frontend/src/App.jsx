import { useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [comicAry, setComic] = useState([]);

  const comicRef = useRef();

  const getComic = () => {
    setComic([...comicAry, comicRef.current.value]);
  };

  return (
    <>
      <h1>漫画ファインダー</h1>
      <input type="text" placeholder="漫画名" ref={comicRef}></input>
      <button onClick={getComic}>漫画追加</button>
      <ul>
        {comicAry.map((comic, index) => (
          <li key={index}>{comic}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
