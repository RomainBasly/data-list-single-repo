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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppListManagementRepository = void 0;
const tsyringe_1 = require("tsyringe");
const supabaseClient_1 = __importDefault(require("../../../config/database/supabaseClient"));
function isSupabaseError(response) {
    return response && response.error === true;
}
let AppListManagementRepository = class AppListManagementRepository {
    constructor() { }
    async createList(inputsAppList) {
        const { data, error } = await supabaseClient_1.default.from('app-lists').insert(inputsAppList).select();
        if (error) {
            throw new Error('Problem creating the list');
        }
        return data && data.length > 0 ? data[0] : null;
    }
    async getListsByUserId(userId) {
        const { data, error } = await supabaseClient_1.default
            .from('app-list-beneficiaries')
            .select(`
        app-lists:app-list-id (
          id,
          listName,
          description,
          thematic,
          beneficiaries:app-list-beneficiaries (
            app-users:user-id (
              user_id,
              userName
            )
          )
        )
      `)
            .eq('user-id', userId);
        if (error) {
            throw new Error('Problem getting the lists');
        }
        return data && data.length > 0 ? data : null;
    }
    async getListById(listId, userId) {
        try {
            const { data } = await supabaseClient_1.default
                .from('app-list-beneficiaries')
                .select(`
          app-lists:app-list-id (
            id,
            listName,
            description,
            thematic,
            beneficiaries:app-list-beneficiaries (
              app-users:user-id (
                user_id,
                userName
              )
            ),
            items:app-list-items (
              id,
              updated_at,
              content,
              statusOpen
            )
          )
        `)
                .eq('user-id', userId)
                .eq('app-list-id', listId);
            return data;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async addItemToList(listId, content) {
        try {
            const { data } = await supabaseClient_1.default
                .from('app-list-items')
                .insert([{ content, statusOpen: true, list_id: listId }])
                .select();
            return data;
        }
        catch (error) {
            throw error;
        }
    }
    async isUserAllowedToChangeList(listId, userId) {
        try {
            const { data } = await supabaseClient_1.default
                .from('app-list-beneficiaries')
                .select('*')
                .eq('user-id', userId)
                .eq('app-list-id', listId);
            return data;
        }
        catch (error) {
            throw error;
        }
    }
    async suppressItemById(listId, elementId) {
        try {
            await supabaseClient_1.default.from('app-list-items').delete().eq('id', elementId).eq('list_id', listId);
        }
        catch (error) {
            throw error;
        }
    }
    async changeItemStatus(listId, elementId, status) {
        try {
            const currentTimestamp = new Date().toISOString();
            const { data } = await supabaseClient_1.default
                .from('app-list-items')
                .update({ statusOpen: status, updated_at: currentTimestamp })
                .eq('id', elementId)
                .eq('list_id', listId)
                .select();
            return data;
        }
        catch (error) {
            throw error;
        }
    }
    async updateItemContent(listId, elementId, content) {
        try {
            const currentTimestamp = new Date().toISOString();
            const { data } = await supabaseClient_1.default
                .from('app-list-items')
                .update({ content, updated_at: currentTimestamp, statusOpen: true })
                .eq('id', elementId)
                .eq('list_id', listId)
                .select('id, updated_at, content, statusOpen');
            return data;
        }
        catch (error) {
            throw error;
        }
    }
};
exports.AppListManagementRepository = AppListManagementRepository;
exports.AppListManagementRepository = AppListManagementRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], AppListManagementRepository);
