import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {

private modalDisplaySubject = new BehaviorSubject<boolean>(false);

modalDisplay$ = this.modalDisplaySubject.asObservable();

updateModalDisplayStatus(status: boolean) {
  this.modalDisplaySubject.next(status);
}


}