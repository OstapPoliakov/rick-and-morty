import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router";
import s from "./Character.module.css";

export const Character = () => {
  // хук useParams позволяет получать параметр из URL
  const { id } = useParams();

  // стейт для хранения данных о текущем персонаже, с заданным id
  const [character, setCharacter] = useState(null);

  // делаем единожды при открытии запрос на сервер за данными о персонаже
  // с заданным id
  useEffect(() => {
    axios.get(`https://rickandmortyapi.com/api/character/${id}`).then((res) => {
      setCharacter(res.data);
    });
  }, []);

  // функция для получения (в дальнейшем - отрисовки) нужного статуса персонажа по ЛОРу
  // жив, мертв или неизвестно
  const getStatusClassName = (status) => {
    let characterStatus;
    switch (status) {
      case "Alive":
        characterStatus = s.aliveStatus;
        break;

      case "Dead":
        characterStatus = s.deadStatus;
        break;

      case "unknown":
        characterStatus = s.unknownStatus;
        break;

      default:
        characterStatus = "";
    }

    return `${s.status} ${characterStatus}`;
  };

  // возвращаем jsx разметку
  return (
    <div className="pageContainer">
      {
        /* в начале проверяем не пустой ли стейт (пришли ли данные с сервера) */
        character !== null && (
          <div className={s.container}>
            <h1 className="pageTitle">{character.name}</h1>
            <div className={s.content}>
              <img className={s.img} src={character.image} alt="character" />
              <div className={s.description}>
                <div className={s.statusContainer}>
                  <div className={getStatusClassName(character.status)}></div>
                  <div>
                    {character.status} - {character.species}
                  </div>
                </div>
                <div className={s.info}>
                  <p className={s.subTitle}>Last known location:</p>
                  <p className={s.subTitleResult}>{character.location.name}</p>
                </div>
                <div className={s.info}>
                  <p className={s.subTitle}>Episode count:</p>
                  <p className={s.subTitleResult}>{character.episode.length}</p>
                </div>
              </div>
            </div>
            <Link to={"/characters"} className={"linkButton"}>
              Go back
            </Link>
          </div>
        )
      }
    </div>
  );
};
