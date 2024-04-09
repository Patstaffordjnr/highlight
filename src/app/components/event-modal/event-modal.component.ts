import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'event-app-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.css']
})
export class EventModalComponent {

  @ViewChild('myModal', {static: false}) modal: ElementRef;

  @Input() event: Event;
  @Output() selectDateEvent: EventEmitter<Event> = new EventEmitter<Event>();  

  open() {
    this.modal.nativeElement.style.display = 'block';
  }

  close() {
    this.modal.nativeElement.style.display = 'none';
  }
}