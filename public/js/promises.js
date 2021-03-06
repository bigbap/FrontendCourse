var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "./modal/modal", "./events/events"], function (require, exports, modal_1, events_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Events = events_1.EventManager.Instance;
    var Promises = /** @class */ (function () {
        function Promises() {
            this.$el = $("#content");
            this._dialogManager = new modal_1.DialogManager();
            this.init();
        }
        Promises.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this;
                            return [4 /*yield*/, $.get('templates/promises.mst')];
                        case 1:
                            _a._template = _b.sent();
                            this.$el.html(this._template);
                            this.$ul = this.$el.find("#result_area");
                            this._rowTemplate = this.$el.find("#row_template").html();
                            this.$button = this.$el.find("#do_some_shit");
                            this.$button.on("click", this.doSomeShitAndWaitForInput.bind(this));
                            return [2 /*return*/];
                    }
                });
            });
        };
        Promises.prototype.doSomeShitAndWaitForInput = function () {
            return __awaiter(this, void 0, void 0, function () {
                var data, i, element, userInput, newRow;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, $.get('JSON/listData.json')];
                        case 1:
                            data = _a.sent();
                            i = 0;
                            _a.label = 2;
                        case 2:
                            if (!(i < data.length)) return [3 /*break*/, 6];
                            element = data[i];
                            return [4 /*yield*/, this.openDialog(element).catch(function (err) { return console.log(err); })];
                        case 3:
                            userInput = _a.sent();
                            if (userInput) {
                                newRow = $(Mustache.render(this._rowTemplate, element));
                                this.$ul.append(newRow);
                                Events.emit("rowAdded");
                            }
                            return [4 /*yield*/, sleep(500)];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5:
                            i++;
                            return [3 /*break*/, 2];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        Promises.prototype.openDialog = function (row) {
            var _this = this;
            return new Promise(function (resolve, reject) { return _this._dialogManager.addDialog({
                modalTitle: "My Dialog",
                modalBody: "Do you want to add this row? - " + JSON.stringify(row),
                buttons: [{
                        btnClass: "noBtn",
                        btnText: "No",
                        callback: function (ev, self) {
                            reject("rejected");
                            self.destroy();
                        }
                    }, {
                        btnClass: "yesBtn",
                        btnText: "Yes",
                        callback: function (ev, self) {
                            resolve("resolved");
                            self.destroy();
                        }
                    }]
            }); });
        };
        return Promises;
    }());
    exports.Promises = Promises;
    function sleep(ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    }
});
//# sourceMappingURL=promises.js.map