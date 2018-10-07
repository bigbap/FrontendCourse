define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventManager = /** @class */ (function () {
        function EventManager() {
            this._eventHandlers = {};
        }
        Object.defineProperty(EventManager, "Instance", {
            get: function () {
                return this._instance || (this._instance = new this());
            },
            enumerable: true,
            configurable: true
        });
        EventManager.prototype.on = function (event, handler) {
            this._eventHandlers[event] = this._eventHandlers[event] || [];
            this._eventHandlers[event].push(handler);
        };
        EventManager.prototype.off = function (event, handler) {
            if (this._eventHandlers[event]) {
                for (var i = this._eventHandlers[event].length - 1; i >= 0; i--) {
                    if (this._eventHandlers[event][i] === handler)
                        this._eventHandlers[event].splice(i, 1);
                }
            }
        };
        EventManager.prototype.emit = function (event, data) {
            this._eventHandlers[event] = this._eventHandlers[event] || [];
            this._eventHandlers[event].forEach(function (element) {
                element(data);
            });
        };
        return EventManager;
    }());
    exports.EventManager = EventManager;
});
//# sourceMappingURL=events.js.map