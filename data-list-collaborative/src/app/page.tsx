// import Image from 'next/image'
// import styles from './page.module.css'
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import classes from "./classes.module.scss";

export default function Home() {
  return (
    <div className={classes["root"]}>
        <Header />
        <SideMenu />
    </div>
  );
}
