import { Component, OnInit } from '@angular/core';
import {timer} from "rxjs";
import {ISyndicat} from "../../models/Isynd";
import {SyndicatService} from "../../services/synd.service";

@Component({
  selector: 'app-mdl-list',
  templateUrl: './synds-list.component.html',
})
export class SyndsComponent implements OnInit {
  synds: ISyndicat[] = []
  idCurSynd: any;
  curIndex: any;
  showCandidats: boolean = true;

  constructor(private syndService: SyndicatService) { }

  ngOnInit(): void {
    this.syndService.getSynds().subscribe(data => {
      this.synds = data;
    })
  }

  showCand(idSynd: number, ind:number) {
      this.curIndex = ind;
      this.idCurSynd = idSynd;
      this.showCandidats = false;
      timer(50).subscribe(() => {
        this.showCandidats = true;
      })
  }
}
