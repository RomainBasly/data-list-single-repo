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
exports.AppCreateListRepository = void 0;
const tsyringe_1 = require("tsyringe");
const supabaseClient_1 = __importDefault(require("../../../config/database/supabaseClient"));
let AppCreateListRepository = class AppCreateListRepository {
    constructor() { }
    async createList(inputsAppList) {
        const { data, error } = await supabaseClient_1.default.from('app-lists').insert(inputsAppList).select();
        if (error) {
            throw new Error('Problem creating the list');
        }
        return data && data.length > 0 ? data[0] : null;
    }
    async createJoinedList() { }
    async addListBeneficiary(listId, creatorId) {
        try {
            const { data, error } = await supabaseClient_1.default
                .from('app-list-beneficiaries')
                .insert([{ 'user-id': creatorId, 'app-list-id': listId }])
                .select();
            return data;
        }
        catch (error) {
            throw new Error('error');
        }
    }
};
exports.AppCreateListRepository = AppCreateListRepository;
exports.AppCreateListRepository = AppCreateListRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], AppCreateListRepository);
