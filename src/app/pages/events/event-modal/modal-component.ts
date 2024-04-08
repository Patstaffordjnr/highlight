import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";

@Component({
  selector: 'app-modal-component',
  templateUrl: './event-modal.html',
  styleUrl: './event-modal.css'
})
export class ModalComponent implements OnInit, OnDestroy {

    constructor() {}



    @Input() title: string = '';
    @Input() body: string = '';
    @Output() closeMeEvent = new EventEmitter();
    @Output() confirmEvent = new EventEmitter();
    ngOnInit(): void {
      console.log('Modal init');
    }

    closeMe() {
      this.closeMeEvent.emit();
    }
    confirm() {
      this.confirmEvent.emit();
    } 
  
   ngOnDestroy(): void {
      console.log(' Modal destroyed');
    }


}
  