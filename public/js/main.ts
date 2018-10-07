import { Promises } from "./promises";
import { EventManager } from "./events/events";

declare var $;
declare var Mustache;

const Events = EventManager.Instance;

class Main{
    constructor(){}
    public init(){
        const promises = new Promises();

        Events.on("rowAdded", this._print);
    }

    private _print(){
        console.log("new row added");
    }
}

export {Main};