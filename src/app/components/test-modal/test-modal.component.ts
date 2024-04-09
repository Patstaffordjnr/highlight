import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'test-app-modal',
  templateUrl: './test-modal.component.html',
  styleUrls: ['./test-modal.component.css']
})
export class TestModalComponent {

  @ViewChild('myModal', {static: false}) modal: ElementRef;

  open() {
    this.modal.nativeElement.style.display = 'block';
  }

  close() {
    this.modal.nativeElement.style.display = 'none';
  }
}