import s from "./EpisodePage.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

export const EpisodePage = () => {
  // стейт для хранения инфы по текущей пачке из 20 эпизодов, прилетевших с сервера
  const [episodes, setEpisodes] = useState([]);
  // стейт для хранения ошибок (при запросах на сервер)
  const [error, setError] = useState(null);
  // стейт для хранения состояния загрузки данных (при запросах на сервер)
  const [loading, setLoading] = useState(true);

  // стейт для хранения информации для подгрузки следующих/предыдущих пачек эпизодов
  const [info, setInfo] = useState({
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  });

  // функция для запроса на сервер за данными по переданному url
  const fetchData = (url) => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setEpisodes(res.data.results);
        setInfo(res.data.info);
        setError(null);
      })
      .catch((err) => {
        setError(err.response.data.error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // однократно при загрузке страницы выполнит запрос на сервер для получения пачки из 20 первых локаций
  useEffect(() => {
    fetchData("https://rickandmortyapi.com/api/episode");
  }, []);

  // обработчик нажатия на кнопку "назад"
  // запросит предыдущую "пачку" 20 эпизодов с сервера
  // ссылка на них хранится в локальном стейте info
  const previousPageHandler = () => {
    fetchData(info.prev);
  };
  // обработчик нажатия на кнопку "вперед" (аналогично "назад")
  const nextPageHandler = () => {
    fetchData(info.next);
  };

  return (
    <div className="pageContainer">
      <h1 class={`pageTitle`}>Episode Page</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="errorMessage">{error}</div>}
      {
        /* условный рендеринг - отрисуем инфу об эпизодах при условии, что массив данных с сервера не пустой и ошибок нет*/
        !error && episodes.length > 0 && (
          <>
            {episodes.map((episode) => {
              return (
                <>
                  <ul key={episode.id}>
                    <li>
                      Эпизод: <b>{episode.episode}</b>
                    </li>
                    <li>
                      Название эпизода: <b>{episode.name}</b>
                    </li>
                    <li>
                      Дата выхода эпизода в эфир: <b>{episode.air_date}</b>
                    </li>
                    <li>
                      Список персонажей, которые были замечены в эпизоде:{" "}
                      <b>{episode.characters.length}</b>
                    </li>
                  </ul>
                  <hr />
                </>
              );
            })}
            <div className={s.buttonContainer}>
              <button
                className="linkButton"
                disabled={info.prev === null}
                onClick={previousPageHandler}
              >
                Назад
              </button>
              <button
                className="linkButton"
                disabled={info.next === null}
                onClick={nextPageHandler}
              >
                Вперед
              </button>
            </div>
          </>
        )
      }
    </div>
  );
};
