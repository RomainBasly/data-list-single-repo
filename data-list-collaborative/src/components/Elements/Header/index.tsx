import classes from "./classes.module.scss";
import NavLink from "../../Materials/NavLink";
import Logo from "../../Materials/Logo";

import logo from "../../../../public/list.svg";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { HomeIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

export default function Header() {
  return (
    <div className={classes["root"]}>
      <Logo src={String(logo.src)} alt={"Logo"} className={classes["logo"]}/>
      <div className={classes["mobile"]}>
        <Bars3Icon className={classes["icon"]} />
      </div>
      <div className={classes["big-screen-nav-links"]}>
        <NavLink svg={<HomeIcon />} className={classes["nav-link"]} text={"Home"} alt={"Home Icon"}/>
        <NavLink svg={<PlusCircleIcon />} className={classes["nav-link"]} text={"Créer une liste"} alt={"Add a list Icon"}/>
      </div>
    </div>
  );
}
