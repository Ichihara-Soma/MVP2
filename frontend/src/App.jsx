import { useState, useEffect } from "react";
import "./App.css";
import Navber from "./Navber";
import Main_side from "./Main_side";

function App() {
  const [comicAry, setComic] = useState([]);
  const [totalComic, setTotalComic] = useState(0);

  useEffect(() => {
    fetch("/api/comic")
      .then((res) => res.json())
      .then((data) => setComic(data));
    sumComic();
  }, [comicAry]);

  const sumComic = () => {
    let total = 0;
    for (const comic of comicAry) {
      total += comic.comic_volume;
    }
    setTotalComic(total);
  };

  return (
    <>
      <Navber setComic={setComic} comicAry={comicAry} totalComic={totalComic} />
      <Main_side comicAry={comicAry} />
    </>
  );
}

export default App;
