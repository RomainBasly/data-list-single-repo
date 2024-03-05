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
const AppCreateListRepository_1 = require("../../infrastructure/database/repositories/AppCreateListRepository");
let CreateListService = class CreateListService {
    constructor(appEmailValidation, appCreateListRepository) {
        this.appEmailValidation = appEmailValidation;
        this.appCreateListRepository = appCreateListRepository;
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
            //const dataListCreation = await this.appCreateListRepository.createList(createListInput);
            const verifiedCreatorEmailObject = await this.appEmailValidation.validateEmail(inputs.creatorEmail);
            const verifiedCreatorEmail = verifiedCreatorEmailObject.email;
            if (inputs.emails) {
                let emailsAddress = [verifiedCreatorEmailObject.email];
                await Promise.all(inputs.emails.map(async (email) => {
                    const verifiedEmailObject = await this.appEmailValidation.validateEmail(email);
                    emailsAddress.push(verifiedEmailObject.email);
                })
                // passage de l'envoi des emails + ajout dans la BDD
                );
                console.log(emailsAddress);
            }
            else {
                const emails = Object.assign({}, verifiedCreatorEmailObject);
                console.log('emails out of map', emails);
            }
        }
        catch (error) {
            console.log('error', error);
            throw error;
        }
    }
};
exports.CreateListService = CreateListService;
exports.CreateListService = CreateListService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(1, (0, tsyringe_1.inject)(AppCreateListRepository_1.AppCreateListRepository)),
    __metadata("design:paramtypes", [validation_1.default,
        AppCreateListRepository_1.AppCreateListRepository])
], CreateListService);
