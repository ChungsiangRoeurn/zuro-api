"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth-controller");
exports.AuthRouter = (0, express_1.Router)();
const controller = new auth_controller_1.AuthController();
exports.AuthRouter.post("/register", controller.register);
exports.AuthRouter.post("/login", controller.login);
//# sourceMappingURL=auth-route.js.map