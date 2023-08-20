import DefaultTemplate from "@/components/Elements/DefaultTemplate";
import Login from "../app/login/page";
import classes from "./classes.module.scss";

export default function Home() {
  return (
    <div className={classes["root"]}>
      <Login />
    </div>
  );
}
