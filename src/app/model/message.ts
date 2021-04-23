export class Message {
    private _id;
    private _iduser;

    public get iduser() {
        return this._iduser;
    }
    public set iduser(value) {
        this._iduser = value;
    }

    public get id() {
        return this._id;
    }
    public set id(value) {
        this._id = value;
    }

    private _message;
    
    public get message() {
        return this._message;
    }
    public set message(value) {
        this._message = value;
    }
}
