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
    .post("/api/users", controllers_2.postUsers)
    .put("/api/users", controllers_2.putUsers)
    .delete("/api/users", controllers_2.deleteUser);
exports.default = router;
