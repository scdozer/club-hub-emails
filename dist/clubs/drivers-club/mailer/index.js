"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const templates = require("./templates");
exports.buildWelcomeEmail = (member, club, password) => __awaiter(this, void 0, void 0, function* () {
    return templates.WelcomeEmailTemplate(member, club, password);
});
exports.sendMembershipApplicationEmail = (memberInfo) => {
    return templates.MembershipApplicationTemplate(memberInfo);
};
exports.sendMembershipInquiryEmail = (memberInfo) => {
    return templates.MembershipInquiryTemplate(memberInfo);
};
exports.sendMembershipInquiryResponseEmail = (memberInfo) => {
    return templates.MembershipInquiryResponseTemplate(memberInfo);
};
exports.buildServiceRequestEmail = (member, provider, reservation) => {
    return templates.ServiceRequestTemplate(member, provider, reservation);
};
exports.sendProviderRequestEmail = (provider) => {
    return templates.NewProviderTemplate(provider);
};
exports.buildRSVPEmail = (member, event) => {
    return templates.RsvpTemplate(member, event);
};
exports.sendMemberUnRSVPEmail = (member, event) => {
    const methodName = '[sendMemberUnRSVPEmail] -';
    return templates.UnRsvpTemplate(member, event);
};
exports.sendPublicRSVPEmail = (memberName, memberEmail, plusOne, event) => {
    return templates.PublicRsvpTemplate(memberName, memberEmail, plusOne, event);
};
