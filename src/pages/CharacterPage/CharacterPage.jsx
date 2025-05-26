import { useEffect, useState } from "react";
import s from "./CharacterPage.module.css";
import axios from "axios";
import { Link } from "react-router";

export const CharacterPage = () => {
  // стейт для хранения инфы по текущей пачке из 20 персонажей, прилетевших с сервера
  const [characters, setCharacters] = useState([]);
  // стейт для хранения ошибок (при запросах на сервер)
  const [error, setError] = useState(null);

  // стейт для хранения информации для подгрузки следующих/предыдущих пачек персонажей
  const [info, setInfo] = useState({
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  });

  // функция для запроса на сервер за данными по переданному url
  const fetchData = (url) => {
    axios
      .get(url)
      .then((res) => {
        setCharacters(res.data.results);
        setInfo(res.data.info);
        setError(null);
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  };

  // обработчик события вводе текста в поле поиска персонажа - Search
  // введенное значение будет подставляться в query parameter в URL
  const searchHandler = (event) => {
    const value = event.currentTarget.value;
    fetchData(`https://rickandmortyapi.com/api/character?name=${value}`);
  };

  // однократно при загрузке страницы выполнит запрос на сервер для получения пачки из 20 первых персонажей
  useEffect(() => {
    fetchData("https://rickandmortyapi.com/api/character");
  }, []);

  // обработчик нажатия на кнопку "назад"
  // запросит предыдущую "пачку" 20 персонажей с сервера
  // ссылка на них хранится в локальном стейте info
  const previousPageHandler = () => {
    fetchData(info.prev);
  };
  // обработчик нажатия на кнопку "вперед" (аналогично "назад")
  const nextPageHandler = () => {
    fetchData(info.next);
  };

  // отрисовываем весь HTML
  return (
    <div className={"pageContainer"}>
      <h1 className={"pageTitle"}>CharacterPage</h1>

      <input
        type="search"
        className={s.search}
        onChange={searchHandler}
        placeholder="Search..."
      />
      {error && <div className="errorMessage">{error}</div>}

      {
        /* условный рендеринг - отрисуем карточки персонажей при условии, что массив данных с сервера не пустой и ошибок нет*/
        !error && characters.length && (
          <>
            {
              <div className={s.characters}>
                {characters.map((character) => {
                  return (
                    <div key={character.id} className={s.character}>
                      <Link
                        to={`/characters/${character.id}`}
                        className={s.characterLink}
                      >
                        {character.name}
                      </Link>
                      <img
                        src={character.image}
                        alt={`${character.name} avatar`}
                      />
                    </div>
                  );
                })}
              </div>
            }
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
