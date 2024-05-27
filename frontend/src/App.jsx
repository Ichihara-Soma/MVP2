import { useState, useRef, useEffect } from "react";
import "./App.css";
import swal from "sweetalert2";

function App() {
  const [comicAry, setComic] = useState([]);
  const [totalComic, setTotalComic] = useState(0);

  const comicNameRef = useRef();
  const comicVolumeRef = useRef();
  const updateComicNameRef = useRef();
  const updateComicVolumeRef = useRef();

  useEffect(() => {
    fetch("/api/comic")
      .then((res) => res.json())
      .then((data) => setComic(data));
    sumComic();
  }, [comicAry]);

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

  const showAlerts = (deleteComic) => {
    swal
      .fire({
        title: "削除",
        text: "選択した漫画を削除しますか？",
        icon: "warning",
        confirmButtonText: "はい",
        cancelButtonText: "いいえ",
        showCancelButton: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          // ユーザーが「はい」をクリックした場合の処理
          const body = { comic_name: deleteComic };
          fetch("/api/comic/delete", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });
        } else {
          // ユーザーが「いいえ」をクリックした場合の処理
          const checkbox = document.getElementsByClassName("check");
          for (const i of checkbox) {
            i.checked = false;
          }
          console.log("削除を取り消します。");
        }
      });
  };

  const update = () => {
    const body = {
      comic_name: updateComicNameRef.current.value,
      new_volume: updateComicVolumeRef.current.value,
    };
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

  const sumComic = () => {
    let total = 0;
    for (const comic of comicAry) {
      total += comic.comic_volume;
    }
    setTotalComic(total);
    return totalComic;
  };

  return (
    <>
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
            {/* <button id="sum_btn" className="btn" onClick={sumComic}>
              更新
            </button> */}
          </div>
        </div>
      </div>

      <div className="all">
        <div className="side">
          <h1 id="side_top">サイドメニュー</h1>
          <a className="netShop" href="https://amazon.co.jp">
            amazon
          </a>
          <br />
          <a className="netShop" href="https://jp.mercari.com/">
            メルカリ
          </a>
          <br />
          <a className="netShop" href="https://auctions.yahoo.co.jp/">
            ヤフオク
          </a>
          <br />
          <a className="netShop" href="https://shopping.bookoff.co.jp/">
            ブックオフ
            <br />
            オンライン
          </a>
          <br />
        </div>

        <div className="main">
          <h1 id="main_top">持っている漫画一覧</h1>
          <ul>
            {comicAry.reverse().map((comic, index) => (
              <li key={index}>
                <dt>
                  <input
                    className="check"
                    type="checkbox"
                    onClick={() => showAlerts(comic.comic_name)}
                  />
                  {comic.comic_name}
                </dt>
                <dd>{comic.comic_volume}巻まである</dd>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
