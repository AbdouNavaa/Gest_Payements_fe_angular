import {Component, Input, OnInit} from '@angular/core';
import { SyndicatService} from "../../services/synd.service";
import {MatDialog} from "@angular/material/dialog";
import {Icandidat} from "../../models/iCandidat";
import {EtudService} from "../../etudiants.service";
import {IEtud} from "../../IEtud";
import {DialogConfirmComponent} from "../../../common-elements/dialog-confirm/dialog-confirm.component";

@Component({
  selector: 'app-candidat-list',
  templateUrl: './candidats-list.component.html',

})
export class CandidatComponent implements OnInit {

  @Input("idSynd") idSynd: any;
  candidats: Icandidat[] = [];
  etudiants: IEtud[] = [];
  curCandidat = <Icandidat>{};

  constructor(private syndicat1Service: SyndicatService,
              private etudiantService: EtudService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getCandidats();

    this.getEtudiants();
  }


  private getEtudiants() {
    this.etudiantService.getNoms().subscribe(data => {
      this.etudiants = data;
    })
  }

  private getCandidats() {
    this.syndicat1Service.getCandidats(this.idSynd).subscribe(data => {
      this.candidats = data;
    })
  }

  fillForm(cand: Icandidat) {
    this.curCandidat = cand;
  }

  delete(id: number) {
    let dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.syndicat1Service.delete(id).subscribe(data => {
          this.getCandidats();
        })
      }
    });


  }

  save() {
    if (this.curCandidat.id) {
      console.log("this.curCandidat.id: ", this.curCandidat.id)
      this.syndicat1Service.update(this.curCandidat).subscribe(() => {
        this.curCandidat = <Icandidat>{}
        console.log("this.curCandidat ==== ", this.curCandidat)
        this.getCandidats();
      })
    } else {
      this.curCandidat.idSyndicat = this.idSynd;
      this.syndicat1Service.add(this.curCandidat).subscribe(() => {
        this.curCandidat = <Icandidat>{}
        this.getCandidats();
      })
    }
  }
}
