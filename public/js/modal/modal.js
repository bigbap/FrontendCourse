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
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ;
    ;
    var DialogManager = /** @class */ (function () {
        function DialogManager() {
            this.init();
        }
        DialogManager.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this._dialogList = [];
                            _a = this;
                            return [4 /*yield*/, $.get("templates/modal.mst")];
                        case 1:
                            _a._template = _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        DialogManager.prototype.addDialog = function (options) {
            var _this = this;
            if (this._template) {
                var dialog = new Dialog(this._template, options);
                this._dialogList.push(dialog);
                return;
            }
            setTimeout(function () { return _this.addDialog(options); }, 500);
        };
        return DialogManager;
    }());
    exports.DialogManager = DialogManager;
    var Dialog = /** @class */ (function () {
        function Dialog(template, options) {
            var id = Date.now().toString();
            this._data = {
                id: options.id || id,
                modalTitle: options.modalTitle || "new Modal",
                modalBody: options.modalBody,
                buttons: options.buttons || [
                    {
                        btnClass: "closeBtn",
                        btnText: "Close"
                    }
                ]
            };
            this._template = $(Mustache.render(template, this._data));
            $("body").append(this._template);
            this.addEvents();
            this._dialog = $("#modal_" + this._data.id).modal();
        }
        Dialog.prototype.addEvents = function () {
            var _this = this;
            this._data.buttons.forEach(function (button) {
                var id = button.btnClass + "_" + _this._data.id;
                $("#" + id).on("click", function (ev) {
                    if (button.callback)
                        button.callback(ev, _this);
                    else
                        _this.destroy();
                });
            });
        };
        Dialog.prototype.removeEvents = function () {
            var _this = this;
            this._data.buttons.forEach(function (button) {
                var id = button.btnClass + "_" + _this._data.id;
                $("#" + id).off("click");
            });
        };
        Dialog.prototype.destroy = function () {
            this.removeEvents();
            this._dialog.data("bs.modal").hide();
            this._dialog.data("bs.modal").dispose();
            $(this._template).remove();
            delete this._dialog;
        };
        return Dialog;
    }());
});
//# sourceMappingURL=modal.js.map