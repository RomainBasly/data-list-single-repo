"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListManagementController = void 0;
const tsyringe_1 = require("tsyringe");
const services_1 = require("../../domain/ListManagement/services");
const validation_1 = require("../../domain/ListManagement/validation");
const helpers_1 = require("../../common/helpers");
let ListManagementController = class ListManagementController {
    constructor(listManagementService, listValidatorService) {
        this.listManagementService = listManagementService;
        this.listValidatorService = listValidatorService;
    }
    async createList(req, res, next) {
        try {
            const { name: listName, accessLevel, description, emails, cyphered, thematic } = req.body;
            const { userInfo } = (0, helpers_1.getFromJWTToken)(req, 'accessToken');
            const creatorUserName = userInfo.userName;
            const creatorEmail = userInfo.email;
            const creatorId = userInfo.id;
            const validatedInputs = await this.listValidatorService.preCheck({
                name: listName,
                accessLevel,
                description,
                creatorId,
                creatorEmail,
                creatorUserName,
                emails,
                cyphered,
                thematic,
            });
            await this.listManagementService.createList(validatedInputs, creatorUserName, creatorEmail);
            res.status(201).json({ message: 'new list created' });
        }
        catch (error) {
            next(error);
        }
    }
    async getListForUserById(req, res, next) {
        try {
            const { userInfo } = (0, helpers_1.getFromJWTToken)(req, 'accessToken');
            const userId = userInfo.id;
            const data = await this.listManagementService.getListBeneficiariesById(userId);
            console.log('sent from backend', data);
            res.json(data);
        }
        catch (error) {
            next(error);
        }
    }
    async getListById(req, res, next) {
        try {
            const { userInfo } = (0, helpers_1.getFromJWTToken)(req, 'accessToken');
            const listId = req.params.listId;
            const userId = userInfo.id;
            const data = await this.listManagementService.getListByListId(listId, userId);
            res.json(data);
        }
        catch (error) {
            next(error);
        }
    }
    async addItemToList(req, res, next) {
        try {
            const { userInfo } = (0, helpers_1.getFromJWTToken)(req, 'accessToken');
            const listId = req.params.listId;
            const userId = userInfo.id;
            const content = req.body.content;
            await this.listManagementService.addItemToList(listId, userId, content);
            res.status(200).json({ message: 'item added' });
        }
        catch (error) {
            next(error);
        }
    }
};
exports.ListManagementController = ListManagementController;
exports.ListManagementController = ListManagementController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(services_1.ListManagementService)),
    __param(1, (0, tsyringe_1.inject)(validation_1.ListValidatorService)),
    __metadata("design:paramtypes", [services_1.ListManagementService,
        validation_1.ListValidatorService])
], ListManagementController);
