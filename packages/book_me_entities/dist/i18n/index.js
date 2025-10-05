"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setLocale = setLocale;
exports.getLocale = getLocale;
exports.getPersonTranslations = getPersonTranslations;
exports.getUserTranslations = getUserTranslations;
const translations_1 = require("./translations/person/translations");
const translations_2 = require("./translations/user/translations");
let currentLocale = "en";
function setLocale(locale) {
    currentLocale = locale;
}
function getLocale() {
    return currentLocale;
}
// Person translations
function getPersonTranslations() {
    return translations_1.personTranslations[currentLocale];
}
// User translations  
function getUserTranslations() {
    return translations_2.userTranslations[currentLocale];
}
