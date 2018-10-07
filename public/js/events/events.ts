export class EventManager{
    private static _instance: EventManager;
    private _eventHandlers = {};

    private constructor(){ }

    public static get Instance(){
        return this._instance || (this._instance = new this());
    }

    public on(event: string, handler: Function){
        this._eventHandlers[event] = this._eventHandlers[event] || [];
        this._eventHandlers[event].push(handler);
    }

    public off(event: string, handler?: Function){
        if(this._eventHandlers[event]){
            for(let i = this._eventHandlers[event].length - 1; i >= 0; i--){
                if(this._eventHandlers[event][i] === handler) this._eventHandlers[event].splice(i, 1);
            }
        }
    }

    public emit(event: string, data?: any){
        this._eventHandlers[event] = this._eventHandlers[event] || [];
        this._eventHandlers[event].forEach(element => {
            element(data);
        });
    }
}