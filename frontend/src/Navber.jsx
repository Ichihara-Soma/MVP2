import React, { useRef } from "react";

function Navber({ setComic, comicAry, totalComic }) {
  const comicNameRef = useRef();
  const comicVolumeRef = useRef();
  const updateComicNameRef = useRef();
  const updateComicVolumeRef = useRef();

  const postComic = () => {
    const addComicName = comicNameRef.current.value;
    const addComicVolume = comicVolumeRef.current.value;
    if (addComicName === "" || addComicVolume === "") {
      swal.fire({
        title: "入力不足",
        text: "漫画名か巻数が入力されていません。",
        icon: "success",
        confirmButtonText: "OK",
      });
    } else {
      const body = {
        comic_name: addComicName,
        comic_volume: addComicVolume,
      };
      fetch("/api/comic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      setComic([...comicAry, [body]]);
      comicNameRef.current.value = "";
      comicVolumeRef.current.value = "";
    }
  };

  const update = () => {
    const body = {
      comic_name: updateComicNameRef.current.value,
      new_volume: updateComicVolumeRef.current.value,
      finish: null,
    };
    if (body.new_volume === "完結") {
      body.finish = "finish";
    }
    fetch("/api/comic/update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    updateComicNameRef.current.value = "";
    updateComicVolumeRef.current.value = "";
  };

  return (
    <div className="top">
      <h1 id="h1">漫画ファインダー</h1>
      <div className="add_update">
        <div className="add">
          <input
            className="input"
            type="text"
            placeholder="漫画名"
            ref={comicNameRef}
          />
          <br />
          <input
            className="input"
            type="text"
            placeholder="巻数"
            ref={comicVolumeRef}
          />
          <button className="btn" onClick={postComic}>
            漫画追加
          </button>
        </div>
        <div className="update">
          <input
            className="input"
            type="text"
            placeholder="変更する漫画名"
            ref={updateComicNameRef}
          />
          <br />
          <input
            className="input"
            type="text"
            placeholder="変更内容"
            ref={updateComicVolumeRef}
          ></input>
          <button className="btn" onClick={update}>
            更新
          </button>
        </div>
        <div className="sumComic">
          <h2 className="sum_h2">総数は{totalComic}冊です</h2>
        </div>
      </div>
    </div>
  );
}

export default Navber;
