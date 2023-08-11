import classes from "./classes.module.scss";
import { Bars3Icon } from '@heroicons/react/24/solid'
import logo from "../../../public/logo.png";

export default function Header() {
    return (
        <div className={classes["root"]}>
            <img src={String(logo.src)} alt="" className={classes["logo"]}/>
            <Bars3Icon className={classes["icon"]} />
        </div>
    )
}