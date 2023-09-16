import { Router, Request, Response } from "express";
import { signup_get, login_get, signup_post, login_post, checkSessionUser, logoutUser, requireAuth } from "../api/app-auth/controllers";
import { getUsers, postUsers, putUsers, deleteUser, getUserById} from "../api/app-users/controllers";

const router = Router();

router.get("/", checkSessionUser)
router.get('/protected', requireAuth, (req: Request, res: Response) =>{
    res.send("welcome to the website, copeng")
})
router.get("/api/logout", logoutUser)
router.get("/api/signup", signup_get);
router.post("/api/signup", signup_post);
router.post("/api/login", login_post);
router.get("/api/login", login_get);

router
  .get("/api/users", getUsers)
  .post("/api/users", postUsers)
  .put("/api/users", putUsers)
  .delete("/api/users", deleteUser);

router.get("/api/users/:id",getUserById )
export default router;
