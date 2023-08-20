import classes from "./classes.module.scss";
import Logo from "../../components/Materials/Logo";
import logo from "../../../public/list.svg";

export default function Login() {
  return (
    <div className={classes["root"]}>
      <div className={classes["content"]}>
        <Logo src={String(logo.src)} alt={"Logo"} className={classes["logo"]} />
        <h3 className={classes["title"]}>
          Gérez vos listes en toute simplicité!
        </h3>
        <p className={classes["subtitle"]}>Se connecter</p>
        <form className={classes["form"]}>
          <div className={classes["form-element"]}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="John@john.com" />
          </div>
          <div className={classes["form-element"]}>
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              name="password"
              placeholder="Entrez un mot de passe"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
