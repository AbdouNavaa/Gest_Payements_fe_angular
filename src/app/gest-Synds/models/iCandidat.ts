export interface Icandidat {
  id: number;
  idSyndicat: number;
  poste: string;
  idEtudiant: number;
  nomEtud: string;


}
export enum post {
  'President',
  'Adjoint',
  'Secretaire'
}
