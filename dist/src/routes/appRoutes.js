"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../api/app-auth/controllers");
const controllers_2 = require("../api/app-users/controllers");
const router = (0, express_1.Router)();
router.get('/protected', controllers_1.requireAuth);
router.get("/api/signup", controllers_1.signup_get);
router.post("/api/signup", controllers_1.signup_post);
router.get("/api/login", controllers_1.login_get);
router
    .get("/api/users", controllers_2.getUsers)
    .post("/api/users", controllers_2.postUsers)
    .put("/api/users", controllers_2.putUsers)
    .delete("/api/users", controllers_2.deleteUser);
router.get("/api/users/:id", controllers_2.getUserById);
exports.default = router;
