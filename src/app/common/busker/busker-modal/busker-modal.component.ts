import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Busker } from 'src/app/model/busker';

@Component({
  selector: 'app-busker-modal',
  // standalone: true,
  // imports: [],
  templateUrl: './busker-modal.component.html',
  styleUrl: './busker-modal.component.css'
})
export class BuskerModalComponent {
   @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Input() busker: Busker | null = null;   // <-- add this

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
