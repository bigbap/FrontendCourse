declare var $;
declare var Mustache;

interface DialogData{
    id?: string,
    modalTitle?: string,
    modalBody: string,
    buttons: DialogButton[]
};

interface DialogButton{
    btnClass: string,
    btnText: string,
    callback?: Function
};

export class DialogManager{
    private _dialogList: Dialog[];
    private _template: string;
    
    constructor(){
        this.init();
    }

    private async init(){
        this._dialogList = [];
        this._template = await $.get("templates/modal.mst");
    }

    public addDialog(options){
        if(this._template){
            const dialog = new Dialog(this._template, options);
            this._dialogList.push(dialog);
            return;
        }
        
        setTimeout(() => this.addDialog(options), 500);
    }
}

class Dialog{
    private _dialog;
    private _data: DialogData;
    private _template: string;

    constructor(template: string, options: DialogData){
        const id = Date.now().toString();

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

    private addEvents(){
        this._data.buttons.forEach(button => {
            const id = button.btnClass + "_" + this._data.id;
            $("#" + id).on("click", (ev) => {
                if(button.callback) 
                    button.callback(ev, this);
                else
                    this.destroy();
            });
        });
    }

    private removeEvents(){
        this._data.buttons.forEach(button => {
            const id = button.btnClass + "_" + this._data.id;
            $("#" + id).off("click");
        });
    }

    public destroy(){
        this.removeEvents();
        this._dialog.data("bs.modal").hide();
        this._dialog.data("bs.modal").dispose();
        $(this._template).remove();
        delete this._dialog;
    }
}