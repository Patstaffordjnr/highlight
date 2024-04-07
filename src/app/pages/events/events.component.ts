import { Component, Inject } from '@angular/core';
import { EventService } from './event-service'
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
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

currentEvent;
  constructor(private eventService: EventService, public dialog: MatDialog) {
}

async ngOnInit() { 
  this.eventService.eventToBeDisplayed$.subscribe(eventSubject => {
    this.eventPopUp = eventSubject;
    this.currentDisplay(this.eventPopUp)
  });

}

async currentDisplay(currentEvent: Event[]) {
  this.currentEvent = await currentEvent
}

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { 
        title: this.currentEvent?.title,
        eventType: this.currentEvent?.eventType,
        eventLat: this.currentEvent?.lat,
        eventLng: this.currentEvent?.long,
        eventStart: this.currentEvent?.startAt,
        eventFinish: this.currentEvent?.endAt,
       }
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
  constructor(
    public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string,
      eventType: string,
      eventLat: number,
      eventLng: number,
      eventStart: Date,
      eventFinish: Date,
    } // Inject data
  ) {}
}

