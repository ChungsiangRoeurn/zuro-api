"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_repo_1 = require("../repository/auth-repo");
class AuthService {
    constructor() {
        this.authRepository = new auth_repo_1.AuthRepository();
    }
    async register(data) {
        const { username, email, password } = data;
        const existingUser = await this.authRepository.findByEmail(email);
        if (existingUser) {
            throw new Error("Email already exists");
        }
        const hashPassword = await bcrypt_1.default.hash(password, 10);
        const userId = await this.authRepository.createUser({
            username,
            email,
            password: hashPassword,
            role: "user",
        });
        return { id: userId };
    }
    async login(email, password) {
        const user = await this.authRepository.findByEmail(email);
        if (!user) {
            throw new Error("Invalid credentials");
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid credentials");
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return {
            message: "Login sucessfully",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
            token,
        };
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth-service.js.map