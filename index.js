"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_dom_1 = require("react-dom");
var src_1 = require("./src");
var dropdownOptions = [
    { key: "profile", text: "View Profile" },
    { key: "logout", text: "Logout" }
];
var Test = function () {
    return (react_1.default.createElement(src_1.Container, { fluid: true },
        react_1.default.createElement(src_1.TopBar, { title: "Test Page", logo: "https://hiro.arago.co/app/images/favicon/android-icon-192x192.png", options: [
                { key: "profile", text: "View Profile" },
                { key: "logout", text: "Logout" }
            ], trigger: react_1.default.createElement(src_1.Icon, { name: "user" }) }),
        react_1.default.createElement(src_1.Container, null, "Test")));
};
// Render
var target = document.getElementById("app");
if (!target) {
    throw new Error("Failed to find #app");
}
react_dom_1.render(react_1.default.createElement(Test, null), target);
