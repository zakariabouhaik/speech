export interface Rapport {
    id?: number;
    titre: string;
    contenu: string;
    dateCreation?: Date;
    utilisateurId: number;
  }