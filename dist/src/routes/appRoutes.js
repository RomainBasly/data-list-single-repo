"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../api/app-auth/controllers/controllers");
const controllers_2 = require("../api/app-users/controllers");
const router = (0, express_1.Router)();
router.get("/", controllers_1.checkSessionUser);
router.get('/protected', controllers_1.requireAuth, (req, res) => {
    res.send("welcome to the website, copeng");
});
router.get("/api/logout", controllers_1.logoutUser);
router.get("/api/signup", controllers_1.signup_get);
router.post("/api/signup", controllers_1.signup_post);
router.post("/api/login", controllers_1.login_post);
router.get("/api/login", controllers_1.login_get);
router
    .get("/api/users", controllers_2.getUsers)
    .post("/api/users", controllers_2.postUsers)
    .put("/api/users", controllers_2.putUsers)
    .delete("/api/users", controllers_2.deleteUser);
router.get("/api/users/:id", controllers_2.getUserById);
exports.default = router;
