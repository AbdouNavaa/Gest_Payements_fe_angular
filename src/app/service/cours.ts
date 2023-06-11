import {Matiere} from "./Matiere";
import {Prof} from "./Prof";

export class Cours {
  _id!: String;
  matiere!: Matiere;
  prof!: Prof;
  date!: Date;
  Deb!: Date;
  Fin!: Date;
  CM!: number;
  TP!: number;
  TD!: number;
  total!: number;
}
