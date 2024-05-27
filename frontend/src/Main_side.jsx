import swal from "sweetalert2";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

function Main_side({ comicAry }) {
  const { width, height } = useWindowSize();

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
          const body = { comic_name: deleteComic };
          fetch("/api/comic/delete", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });
        } else {
          const checkbox = document.getElementsByClassName("check");
          for (const i of checkbox) {
            i.checked = false;
          }
          console.log("削除を取り消します。");
        }
      });
  };

  return (
    <div className="all">
      <div className="side">
        <h1 id="side_top">サイドメニュー</h1>
        <a className="netShop" href="https://amazon.co.jp" target="_blank">
          amazon
        </a>
        <br />
        <a className="netShop" href="https://jp.mercari.com/" target="_blank">
          メルカリ
        </a>
        <br />
        <a
          className="netShop"
          href="https://auctions.yahoo.co.jp/"
          target="_blank"
        >
          ヤフオク
        </a>
        <br />
        <a
          className="netShop"
          href="https://shopping.bookoff.co.jp/"
          target="_blank"
        >
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
              {comic.id_store === 1 ? (
                <>
                  <dd>完結</dd>
                  <Confetti width={width} height={height} recycle={false} />
                </>
              ) : (
                <dd>{comic.comic_volume}巻まである</dd>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default Main_side;
