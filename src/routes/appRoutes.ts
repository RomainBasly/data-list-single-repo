import { Router, Request, Response } from "express";
import { signup_get, login_get, signup_post, requireAuth } from "../api/app-auth/controllers";
import {  postUsers, putUsers, deleteUser} from "../api/app-users/controllers";

const router = Router();

router.get('/protected', requireAuth)
router.get("/api/signup", signup_get);
router.post("/api/signup", signup_post);
router.get("/api/login", login_get);

router
  .post("/api/users", postUsers)
  .put("/api/users", putUsers)
  .delete("/api/users", deleteUser);

export default router;
