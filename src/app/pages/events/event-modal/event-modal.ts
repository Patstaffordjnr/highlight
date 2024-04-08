import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { ModalServiceComponent } from "./modal-service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-event-modal',
    templateUrl: './event-modal.html',
    styleUrl: './event-modal.css'
  })


  export class EventModalComponent implements OnInit{
    constructor(private modalService: ModalServiceComponent) {}

  @ViewChild('modal', { read: ViewContainerRef })
  entry!: ViewContainerRef;
  sub!: Subscription;

  ngOnInit(): void {}
  createModal() {
    console.log(`CREATE MODAL`);
    this.sub = this.modalService
      .openModal(this.entry, 'Are you sure ?', 'click confirm or close')
      .subscribe((v) => {
        //your logic
      });
  }
  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

 

  }





