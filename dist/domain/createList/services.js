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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateListService = void 0;
const tsyringe_1 = require("tsyringe");
const validation_1 = __importDefault(require("../emailVerification/validation"));
const AppListRepository_1 = require("../../infrastructure/database/repositories/AppListRepository");
const services_1 = require("../webSockets/services");
let CreateListService = class CreateListService {
    constructor(appEmailValidation, appListRepository, webSocketService) {
        this.appEmailValidation = appEmailValidation;
        this.appListRepository = appListRepository;
        this.webSocketService = webSocketService;
    }
    async createList(inputs) {
        try {
            // étape 1 : créer la liste
            /// tous les champs utiles sont là
            /// check if the emails are valid
            /// Vérifier que la personne est ou n'est pas dans la BDD
            // étape 2 : envoyer un email pour faire connaitre l'application
            const createListInput = {
                list_name: inputs.name,
                access_level: inputs.accessLevel,
                description: inputs.description,
                cyphered: false,
            };
            const { emails } = inputs;
            const dataListCreation = await this.appListRepository.createList(createListInput);
            if (dataListCreation && dataListCreation.id) {
                await this.appListRepository.addUserToListAsBeneficiary(dataListCreation.id, inputs.creatorId);
            }
            const validatedEmailAddresses = await this.validateEmails(emails);
            if (validatedEmailAddresses.length > 0) {
                await this.addPeopleToListInvitations(validatedEmailAddresses, dataListCreation.id);
            }
            // ajout des emails dans app-list-invitations
            // passage de l'envoi des emails + ajout dans la BDD
        }
        catch (error) {
            console.log('error', error);
            throw error;
        }
    }
    async addPeopleToListInvitations(invitedEmailAddresses, listId) {
        await this.appListRepository.inviteUsersToList(invitedEmailAddresses, listId);
        const getPeopleToInvite = await this.appListRepository.getPeopleToInviteByListId(listId);
        await this.invitePeople(getPeopleToInvite, listId);
    }
    async invitePeople(invitedUsers, listId) {
        invitedUsers.map((user) => {
            if (user.is_already_active_user) {
                this.webSocketService.emit('list-invitation', { userId: user.user_id, listId });
            }
            else {
                // case 2 : send an email to those not registered in the app
            }
        });
    }
    async validateEmails(emails) {
        let emailsAddress = [];
        if (emails) {
            await Promise.all(emails.map(async (email) => {
                const verifiedEmailObject = await this.appEmailValidation.validateEmail(email);
                emailsAddress.push(verifiedEmailObject.email);
            }));
        }
        return emailsAddress.length > 0 ? emailsAddress : [];
    }
};
exports.CreateListService = CreateListService;
exports.CreateListService = CreateListService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(1, (0, tsyringe_1.inject)(AppListRepository_1.AppListRepository)),
    __param(2, (0, tsyringe_1.inject)(services_1.WebSocketClientService)),
    __metadata("design:paramtypes", [validation_1.default,
        AppListRepository_1.AppListRepository,
        services_1.WebSocketClientService])
], CreateListService);
