define(["require", "exports", "./promises", "./events/events"], function (require, exports, promises_1, events_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Events = events_1.EventManager.Instance;
    var Main = /** @class */ (function () {
        function Main() {
        }
        Main.prototype.init = function () {
            var promises = new promises_1.Promises();
            Events.on("rowAdded", this._print);
        };
        Main.prototype._print = function () {
            console.log("new row added");
        };
        return Main;
    }());
    exports.Main = Main;
});
//# sourceMappingURL=main.js.map