export class Produit {
    private _id: number;

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    private _libelle: String;

    public get libelle(): String {
        return this._libelle;
    }
    public set libelle(value: String) {
        this._libelle = value;
    }

    private _description: string;

    public get description(): string {
        return this._description;
    }
    private _qte:number;

    public get qte() {
        return this._qte;
    }
    public set qte(value) {
        this._qte = value;
    }
    public set description(value: string) {
        this._description = value;
    }
    private _image: string;

    public get image(): string {
        return this._image;
    }
    public set image(value: string) {
        this._image = value;
    }
   
    private _promo: number;
    
    public get promo(): number {
        return this._promo;
    }
    public set promo(value: number) {
        this._promo = value;
    }

    private _prix: number;

    public get prix(): number {
        return this._prix;
    }
    public set prix(value: number) {
        this._prix = value;
    }
    private _couleur: any;

    public get couleur(): any {
        return this._couleur;
    }
    public set couleur(value: any) {
        this._couleur = value;
    }
    private _idCategorie: number;

    public get idCategorie(): number {
        return this._idCategorie;
    }
    public set idCategorie(value: number) {
        this._idCategorie = value;
    }
    private _idUser: number;

    public get idUser(): number {
        return this._idUser;
    }
    public set idUser(value: number) {
        this._idUser = value;
    }
  
    constructor(){}
   
    
}
