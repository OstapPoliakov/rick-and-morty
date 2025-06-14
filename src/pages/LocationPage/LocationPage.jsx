import s from "./LocationPage.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

export const LocationPage = () => {
  // стейт для хранения инфы по текущей пачке из 20 локаций, прилетевших с сервера
  const [locations, setLocations] = useState([]);
  // стейт для хранения ошибок (при запросах на сервер)
  const [error, setError] = useState(null);
  // стейт для хранения состояния загрузки данных (при запросах на сервер)
  const [loading, setLoading] = useState(true);

  // стейт для хранения информации для подгрузки следующих/предыдущих пачек локаций
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
        setLocations(res.data.results);
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
    fetchData("https://rickandmortyapi.com/api/location");
  }, []);

  // обработчик нажатия на кнопку "назад"
  // запросит предыдущую "пачку" 20 локаций с сервера
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
      <h1 className={`pageTitle`}>Location Page</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="errorMessage">{error}</div>}
      {
        /* условный рендеринг - отрисуем инфу про локации при условии, что массив данных с сервера не пустой и ошибок нет*/
        !error && locations.length > 0 && (
          <>
            {locations.map((location) => {
              return (
                <>
                  <ul key={location.id}>
                    <li>
                      Название локации: <b>{location.name}</b>
                    </li>
                    <li>
                      Тип локации: <b>{location.type}</b>
                    </li>
                    <li>
                      Измерение, в котором находится местоположение:{" "}
                      <b>{location.dimension}</b>
                    </li>
                    <li>
                      Количество персонажей, которых видели в данной локации:{" "}
                      <b>{location.residents.length}</b>
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
