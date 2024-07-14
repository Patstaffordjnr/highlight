import { Component, OnInit } from '@angular/core';
import { EventService } from './event-service';
import { ModalService } from "./event-modal/modal-service"
import { GlobalDateAndTimeComponentService } from 'src/app/util/global-date-and-time/global-date-and-time.service';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})

export class EventsComponent implements OnInit {
  createEventEventVisible: boolean = false; 
  modalDisplay = false;
  globalDateAndTime = new Date();

  constructor(private modalService: ModalService, private globalDateAndTimeComponentService: GlobalDateAndTimeComponentService) {



  }

  async ngOnInit() {

    this.globalDateAndTimeComponentService.globalDate$.subscribe((globalDate => {
    let year = globalDate.getFullYear();
    let month = globalDate.getMonth();
    let day = globalDate.getDate();
    console.log(globalDate);

    this.globalDateAndTime = new Date(year, month, day, this.globalDateAndTime.getHours(), this.globalDateAndTime.getMinutes(), 0)
    }))


    this.globalDateAndTimeComponentService.globalTime$.subscribe((globalTime => {


      if(globalTime.length > 0) {
        const hours = globalTime.substring(0, 2);
        const minutes = globalTime.substring(3, 5);
        console.log(hours);
        console.log(minutes);

              this.globalDateAndTime = new Date( this.globalDateAndTime.getFullYear(),
      this.globalDateAndTime.getMonth(),
      this.globalDateAndTime.getDate(),
      Number(hours),
      Number(minutes),
       0)

      } else {
        this.globalDateAndTime = new Date
        // console.log(`a`);
      }





      }))
  }


  
  openCreateEvent() {
    this.createEventEventVisible = !this.createEventEventVisible;
  }

  async createEvent(){
    this.modalDisplay = true  
    this.modalService.updateModalDisplayStatus(this.modalDisplay);

  }


  onDateSelected($event) {
      this.globalDateAndTime = new Date(
        $event.getFullYear(),
        $event.getMonth(),
        $event.getDate(), 
        this.globalDateAndTime.getHours(),
        this.globalDateAndTime.getMinutes(),
        0)
        console.log(this.globalDateAndTime);
        this.globalDateAndTimeComponentService.updateGlobalDateSubject(
          this.globalDateAndTime 
        )
  }


  onTimeSelected($event) {

    const hours = $event.substring(0, 2);
    const minutes = $event.substring(3, 5);

    this.globalDateAndTime = new Date(
      this.globalDateAndTime.getFullYear(),
      this.globalDateAndTime.getMonth(),
      this.globalDateAndTime.getDate(),
      parseInt(hours, 10),
      parseInt(minutes, 10),
      0
    );

    console.log(this.globalDateAndTime);
    this.globalDateAndTimeComponentService.updateGlobalTimeSubject($event);
    this.ngOnInit();
  }
}
