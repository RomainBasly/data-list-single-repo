import classes from "./classes.module.scss";
import { Bars3Icon } from "@heroicons/react/24/solid";
import logo from "../../../public/list.svg";

export default function Header() {
  return (
    <div className={classes["root"]}>
      <img
        src={String(logo.src)}
        className={classes["logo"]}
        alt="Picture of the author"
      />

      <Bars3Icon className={classes["icon"]} />
    </div>
  );
}
