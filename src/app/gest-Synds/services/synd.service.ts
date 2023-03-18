import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Icandidat} from "../models/iCandidat";
import {ISyndicat} from "../models/Isynd";

@Injectable()
export class SyndicatService {

  constructor(private http: HttpClient) {
  }

  getSynds() {
    return this.http.get<ISyndicat[]>("http://localhost:8080/election/public/gest-synd")
  }

  getCandidats(idSynd: number) {
    let params = new HttpParams();
    params.set("idSynd", idSynd.toString())
    return this.http.get<Icandidat[]>("http://localhost:8080/election/public/gest-candidat?idSynd=" + idSynd)
  }

  update(curCandidat: Icandidat) {
    return this.http.put("http://localhost:8080/election/public/gest-candidat/" + curCandidat.id, curCandidat);
  }

  add(curCandidat: Icandidat) {
    return this.http.post("http://localhost:8080/election/public/gest-candidat", curCandidat);
  }

  delete(id: number) {
    return this.http.delete("http://localhost:8080/gest-candidat/" + id);
  }
}
