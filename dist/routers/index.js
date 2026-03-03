"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainRouter = void 0;
const express_1 = require("express");
const auth_route_1 = require("./auth-route");
exports.MainRouter = (0, express_1.Router)();
exports.MainRouter.use("/auth", auth_route_1.AuthRouter);
//# sourceMappingURL=index.js.map