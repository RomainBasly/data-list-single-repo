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
    async addPeopleToListInvitations(invitedEmailAddresses, listId, creatorId, creatorEmail, creatorUserName, listName, thematic, listDescription) {
        await this.appUserInvitationsRepository.inviteUsersToList(invitedEmailAddresses, listId, creatorId);
        const getPeopleToInvite = await this.appUserInvitationsRepository.getPeopleToInviteByListId(listId);
        await this.invitePeople(getPeopleToInvite, listId, creatorEmail, creatorUserName, listName, thematic, listDescription);
    }
    async fetchUserInvitations(userId, status) {
        try {
            const data = await this.appUserInvitationsRepository.getListInvitationPerUser(userId, status);
            return data;
        }
        catch (error) {
            throw error;
        }
    }
    async invitePeople(invitedUsers, listId, creatorEmail, creatorUserName, listName, thematic, listDescription) {
        invitedUsers.map((invitation) => {
            if (invitation.is_already_active_user) {
                try {
                    //userId : userId to invite
                    this.webSocketService.emit('list-invitation-backend', {
                        id: invitation.id,
                        userId: invitation.user_id,
                        status: 1,
                        listId,
                        creatorEmail,
                        creatorUserName,
                        listName,
                        thematic,
                        listDescription,
                    });
                    // type IInvitation = {
                    //   id: string
                    //   list_id: string
                    //   user_id: number
                    //   status: number
                    //   'app-lists': {
                    //     listName: string
                    //     description: string
                    //   }
                    //   'app-users': {
                    //     email: string
                    //     userName: string
                    //   }
                    // }
                    // this.webSocketService.emit('list-invitation-backend', {
                    //   id: invitation.id,
                    //   user_id: invitation.user_id,
                    //   list_id: listId,
                    //   status: 1,
                    //   creatorEmail,
                    //   creatorUserName,
                    //   listName,
                    //   listDescription,
                    // });
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
    async changeInvitationStatus(invitationId, userId, listId, status) {
        try {
            const response = await this.appUserInvitationsRepository.changeInvitationStatus(invitationId, userId, listId, status);
            return response;
        }
        catch (error) {
            throw error;
        }
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
