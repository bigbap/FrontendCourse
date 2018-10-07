import { DialogManager } from "./modal/modal";
import { EventManager } from "./events/events";

declare var $;
declare var Mustache;

const Events = EventManager.Instance;

export class Promises{
    private $el;
    private $button;
    private $ul;
    private _rowTemplate;
    private _template;
    private _dialogManager: DialogManager;
    
    constructor(){
        this.$el = $("#content");
        this._dialogManager = new DialogManager();
        
        this.init();
    }
    
    private async init(){
        this._template = await $.get('templates/promises.mst');
        this.$el.html(this._template);

        this.$ul = this.$el.find("#result_area");
        this._rowTemplate = this.$el.find("#row_template").html();

        this.$button = this.$el.find("#do_some_shit");
        this.$button.on("click", this.doSomeShitAndWaitForInput.bind(this));
    }

    private async doSomeShitAndWaitForInput(){
        const data = await $.get('JSON/listData.json');
        
        for(let i = 0; i < data.length; i++){
            const element = data[i];
            const userInput = await this.openDialog(element).catch((err) => console.log(err));

            if(userInput){
                const newRow = $(Mustache.render(this._rowTemplate, element));
                this.$ul.append(newRow);
                Events.emit("rowAdded");
            }

            await sleep(500);
        }
    }

    private openDialog(row): Promise<any>{
        return new Promise((resolve, reject) => this._dialogManager.addDialog({
            modalTitle: "My Dialog",
            modalBody: "Do you want to add this row? - " + JSON.stringify(row),
            buttons: [{
                btnClass: "noBtn",
                btnText: "No",
                callback: (ev, self) => {
                    reject("rejected");
                    self.destroy();
                }
            },{
                btnClass: "yesBtn",
                btnText: "Yes",
                callback: (ev, self) => {
                    resolve("resolved");
                    self.destroy();
                }
            }]
        }));
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}