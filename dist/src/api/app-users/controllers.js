"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppUserController = void 0;
const Data = __importStar(require("../../../infrastructure/fakeData/users.json"));
class AppUserController {
    getAllUsers(req, res) {
        try {
            res.json(Data.users);
        }
        catch (error) {
            console.log(error);
            res.status(400).send("error getting the users");
        }
    }
    getUserById(req, res) {
        const { id } = req.params;
        res.json(Data.users.find((user) => user.id === Number(id)));
    }
    postUsers(req, res) {
        const { email, password } = req.body;
        try {
            res.json({
                email,
                password,
            });
        }
        catch (error) {
            console.log(error);
            res.status(400).send("error posting the users");
        }
    }
    putUsers(req, res) {
        const { id, email, password } = req.body;
        try {
            res.json({ id, email, password });
        }
        catch (error) { }
    }
    deleteUser(req, res) {
        const { id } = req.body;
        try {
            res.json({ id });
        }
        catch (error) { }
    }
}
exports.AppUserController = AppUserController;
