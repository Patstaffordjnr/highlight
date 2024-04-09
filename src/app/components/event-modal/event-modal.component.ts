import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'event-app-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.css']
})
export class EventModalComponent {

  @ViewChild('myModal', {static: false}) modal: ElementRef;

  open() {
    this.modal.nativeElement.style.display = 'block';
  }

  close() {
    this.modal.nativeElement.style.display = 'none';
  }
}