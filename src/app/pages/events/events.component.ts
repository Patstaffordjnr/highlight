import { Component } from '@angular/core';
import { EventService } from './event-service'
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { Event } from 'src/app/model/event';
import { CommonModule, NgFor } from '@angular/common';


@Component({
  selector: 'app-events',
  standalone: true,
  imports:  [MatButtonModule, NgFor, CommonModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})

export class EventsComponent {
eventPopUp: Event[];

  constructor(private eventService: EventService, public dialog: MatDialog) {
    this.eventService.eventToBeDisplayed$.subscribe(eventSubject => {
      this.eventPopUp = eventSubject;
    });
}

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}

@Component({
  selector: './event-dialog.html',
  templateUrl: './event-dialog.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
})
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) {}
}



