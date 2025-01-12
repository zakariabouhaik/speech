import { Utilisateur } from "./utilisateur.model";

export interface Rapport {
    id?: number;
    titre: string;
    contenu: string;
    dateCreation?: Date,
    utilisateur: Utilisateur;
}