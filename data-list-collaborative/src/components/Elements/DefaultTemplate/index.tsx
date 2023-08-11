import Header from "../Header";
import SideMenu from "../SideMenu";
import classes from "./classes.module.scss";

export default function DefaultTemplate() {
  return (
    <div className={classes["root"]}>
      <Header />
      {/* <SideMenu /> */}
    </div>
  );
}
