export class User {
    private _id: number;
    
   

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    private _nom: string;
    public get nom(): string {
        return this._nom;
    }
    public set nom(value: string) {
        this._nom = value;
    }
    private _prenom: string;
    public get prenom(): string {
        return this._prenom;
    }
    public set prenom(value: string) {
        this._prenom = value;
    }

    private _adresse: string;

    public get adresse(): string {
        return this._adresse;
    }
    public set adresse(value: string) {
        this._adresse = value;
    }

    private _domaine: string;

    public get domaine(): string {
        return this._domaine;
    }
    public set domaine(value: string) {
        this._domaine = value;
    }
    private _datenaiss: Date;

    public get datenaiss(): Date {
        return this._datenaiss;
    }
    public set datenaiss(value: Date) {
        this._datenaiss = value;
    }
    private _gouvernerat: string;

    public get gouvernerat(): string {
        return this._gouvernerat;
    }
    public set gouvernerat(value: string) {
        this._gouvernerat = value;
    }
    private _role: string;

    public get role(): string {
        return this._role;
    }
    public set role(value: string) {
        this._role = value;
    }
    private _codePostal: number;

    public get codePostal(): number {
        return this._codePostal;
    }
    public set codePostal(value: number) {
        this._codePostal = value;
    }

    private _tel: number;

    public get tel(): number {
        return this._tel;
    }
    public set tel(value: number) {
        this._tel = value;
    }

    private _email: string;

    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }

    private _image: string;

    public get image(): string {
        return this._image;
    }
    public set image(value: string) {
        this._image = value;
    }

    private _password: string;
    
    public get password(): string {
        return this._password;
    }
    public set password(value: string) {
        this._password = value;
    }
   
    constructor(){}

}
