'use client';
import classes from "./classes.module.scss";
import {XMarkIcon} from "@heroicons/react/24/outline";

export default function SideMenu() {

    function closeSideMenu() {
        console.log("closeSideMenu");
    }
    return (
        <div className={classes["root"]} onClick={closeSideMenu}>
            <XMarkIcon className={classes["svg"]}/>
        </div>
    )
}
