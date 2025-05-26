import { NavLink } from "react-router";
import s from "./HomePage.module.css";

export const HomePage = () => {
  return (
    <div className={s.mainWrapper}>
      <h1 className={`pageTitle ${s.title}`}>The Rick and Morty</h1>
      <nav className={s.linkWrapper}>
        <NavLink to={"/characters"} className={"linkButton"}>
          Characters
        </NavLink>
        <NavLink to={"/locations"} className={"linkButton"}>
          Locations
        </NavLink>
        <NavLink to={"/episodes"} className={"linkButton"}>
          Episodes
        </NavLink>
      </nav>
    </div>
  );
};
