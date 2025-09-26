import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SharedDataService {
  private publicacoesUpdatedSource = new BehaviorSubject<boolean>(false);
  publicacoesUpdated$ = this.publicacoesUpdatedSource.asObservable();

  notifyUpdate() {
    this.publicacoesUpdatedSource.next(true);
  }
}
