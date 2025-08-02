import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrl: './event-modal.component.css'
})
export class EventModalComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Input() event: Event;

  @ViewChild('modalContent', { static: false }) modalContentRef!: ElementRef;

  onClose() {
    this.close.emit();
  }

  onBackdropClick(event: MouseEvent) {
    const modalEl = this.modalContentRef?.nativeElement;

    // Click is outside the modal content
    if (modalEl && !modalEl.contains(event.target)) {
      this.onClose(); 
      // console.log('Clicked outside modal content');
    } else {
      // console.log('Clicked inside modal content');
    }
  }
}
