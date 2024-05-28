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
exports.ListManagementService = void 0;
const tsyringe_1 = require("tsyringe");
const AppListManagementRepository_1 = require("../../infrastructure/database/repositories/AppListManagementRepository");
const services_1 = __importDefault(require("../user/Invitations/services"));
const AppUserInvitationsRepository_1 = require("../../infrastructure/database/repositories/AppUserInvitationsRepository");
const validation_1 = require("./validation");
let ListManagementService = class ListManagementService {
    constructor(appListRepository, userInvitationsService, appUserInvitationsRepository, listValidatorService) {
        this.appListRepository = appListRepository;
        this.userInvitationsService = userInvitationsService;
        this.appUserInvitationsRepository = appUserInvitationsRepository;
        this.listValidatorService = listValidatorService;
    }
    async createList(inputs, creatorUserName, creatorEmail) {
        try {
            const { emails, description, name, thematic } = inputs;
            const createListInputForListCreation = {
                listName: inputs.name,
                access_level: inputs.accessLevel,
                description: inputs.description,
                cyphered: false,
                thematic: inputs.thematic,
            };
            const dataListCreation = await this.appListRepository.createList(createListInputForListCreation);
            if (dataListCreation && dataListCreation.id) {
                await this.appUserInvitationsRepository.addUserToListAsBeneficiary(dataListCreation.id, inputs.creatorId);
            }
            const validatedEmailAddresses = await this.listValidatorService.validateEmails(emails);
            if (validatedEmailAddresses.length > 0) {
                await this.userInvitationsService.addPeopleToListInvitations(validatedEmailAddresses, dataListCreation.id, inputs.creatorId, creatorEmail, creatorUserName, name, thematic, description);
            }
        }
        catch (error) {
            throw error;
        }
    }
    async getListBeneficiariesById(userId) {
        try {
            const beneficiaries = await this.appListRepository.getListsByUserId(userId);
            if (!beneficiaries) {
                console.error('Unexpected beneficiaries structure', beneficiaries);
                return [];
            }
            const filteredBeneficiaries = beneficiaries.map((element) => {
                if (element && element['app-lists'] && Array.isArray(element['app-lists'].beneficiaries)) {
                    return Object.assign(Object.assign({}, element), { 'app-lists': Object.assign(Object.assign({}, element['app-lists']), { beneficiaries: element['app-lists'].beneficiaries.filter((beneficiary) => beneficiary['app-users'].user_id !== userId) }) });
                }
                else {
                    console.error('Unexpected element structure', element);
                    return element; // or handle accordingly
                }
            });
            return filteredBeneficiaries;
        }
        catch (error) {
            console.error('Error fetching list beneficiaries', error);
            throw error;
        }
    }
};
exports.ListManagementService = ListManagementService;
exports.ListManagementService = ListManagementService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(AppListManagementRepository_1.AppListManagementRepository)),
    __param(1, (0, tsyringe_1.inject)(services_1.default)),
    __param(2, (0, tsyringe_1.inject)(AppUserInvitationsRepository_1.AppUserInvitationsRepository)),
    __param(3, (0, tsyringe_1.inject)(validation_1.ListValidatorService)),
    __metadata("design:paramtypes", [AppListManagementRepository_1.AppListManagementRepository,
        services_1.default,
        AppUserInvitationsRepository_1.AppUserInvitationsRepository,
        validation_1.ListValidatorService])
], ListManagementService);
