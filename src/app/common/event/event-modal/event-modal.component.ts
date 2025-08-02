import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-event-modal',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './event-modal.component.html',
  styleUrl: './event-modal.component.css'
})
export class EventModalComponent{

  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  @Input() event: Event;

  onClose() {
    this.close.emit();
        this.event = null;
    console.log(`Close Modal`);
  }

}
