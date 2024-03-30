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
const tsyringe_1 = require("tsyringe");
const services_1 = require("../../webSockets/services");
const AppUserInvitationsRepository_1 = require("../../../infrastructure/database/repositories/AppUserInvitationsRepository");
let UserInvitationsService = class UserInvitationsService {
    constructor(webSocketService, appUserInvitationsRepository) {
        this.webSocketService = webSocketService;
        this.appUserInvitationsRepository = appUserInvitationsRepository;
    }
    async addPeopleToListInvitations(invitedEmailAddresses, listId, creatorId) {
        await this.appUserInvitationsRepository.inviteUsersToList(invitedEmailAddresses, listId, creatorId);
        const getPeopleToInvite = await this.appUserInvitationsRepository.getPeopleToInviteByListId(listId);
        await this.invitePeople(getPeopleToInvite, listId);
    }
    async fetchUserPendingInvitations(userId) {
        try {
            const data = await this.appUserInvitationsRepository.getListInvitationPerUser(userId);
            return data;
        }
        catch (error) {
            throw error;
        }
    }
    async invitePeople(invitedUsers, listId) {
        invitedUsers.map((user) => {
            if (user.is_already_active_user) {
                try {
                    this.webSocketService.emit('list-invitation-backend', { userId: user.user_id, listId });
                }
                catch (error) {
                    throw new Error(`message: ${error}`);
                }
            }
            else {
                // Todo : case 2 : send an email to those not registered in the app
            }
        });
    }
};
UserInvitationsService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)((0, tsyringe_1.delay)(() => services_1.WebSocketClientService))),
    __param(1, (0, tsyringe_1.inject)(AppUserInvitationsRepository_1.AppUserInvitationsRepository)),
    __metadata("design:paramtypes", [services_1.WebSocketClientService,
        AppUserInvitationsRepository_1.AppUserInvitationsRepository])
], UserInvitationsService);
exports.default = UserInvitationsService;
