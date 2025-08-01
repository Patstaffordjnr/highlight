import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-event-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-modal.component.html',
  styleUrl: './event-modal.component.css'
})
export class EventModalComponent   implements OnInit {



  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  @Input() event: Event;

  ngOnInit() {
    console.log(`Event-Modal ngOnInit()`,this.event);
  }

  constructor() {
    console.log(`Event-Modal constructor`,this.event);


  }
  // @Output() dataSent = new EventEmitter<Event>();

  // eventTypes: ["Band", "Busker", "Dj", "Performance"];
  // currentPage;
  // noOfProducts;
  // bounds
  // minLat
  // maxLat
  // minLong
  // maxLong 


  onClose() {
    this.close.emit();
    console.log(`Close Modal`);
  }

  sendData() {
    // console.log('EventModal;',this.event);
    // this.dataSent.emit(this.event);
  }

}
