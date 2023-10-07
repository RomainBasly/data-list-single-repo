"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../api/app-auth/controllers");
const router = (0, express_1.Router)();
router.get("/api/signup", controllers_1.signup_get);
router.post("/api/signup", controllers_1.signup_post_with_supabase);
router.get("/api/login", controllers_1.login_get);
exports.default = router;
