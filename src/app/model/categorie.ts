export class Categorie {
    private _id;

    public get id() {
        return this._id;
    }
    public set id(value) {
        this._id = value;
    }

    private _nomcategorie;
    
    public get nomcategorie() {
        return this._nomcategorie;
    }
    public set nomcategorie(value) {
        this._nomcategorie = value;
    }
    constructor(){}
}
