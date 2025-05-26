import logo from "../../assets/img/logo.png";
import { NavLink } from "react-router";
import s from "./Header.module.css";

export const Header = () => {
  return (
    <nav className={s.container}>
      <NavLink to={"/"} className={s.headerLink}>
        <img src={logo} alt="logotype" className={s.logo} />
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${s.headerLink} ${s.active}` : s.headerLink
        }
        to={"/"}
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${s.headerLink} ${s.active}` : s.headerLink
        }
        to={"/characters"}
      >
        Characters
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${s.headerLink} ${s.active}` : s.headerLink
        }
        to={"/locations"}
      >
        Locations
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${s.headerLink} ${s.active}` : s.headerLink
        }
        to={"/episodes"}
      >
        Episodes
      </NavLink>
    </nav>
  );
};
