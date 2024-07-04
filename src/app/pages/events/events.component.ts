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
    // console.log(globalDate);
    let year = globalDate.getFullYear();
    let month = globalDate.getMonth();
    let day = globalDate.getDate();

     this.globalDateAndTime = new Date(year, month, day, this.globalDateAndTime.getHours(), this.globalDateAndTime.getMinutes(), 0)
    }))
//  this.globalDateAndTime = new Date(
//   this.globalDate.getFullYear(),
//         $event.getMonth(),
//         $event.getDate(), 
//         this.globalDateAndTime.getHours(),
//         this.globalDateAndTime.getMinutes(),
//         0)

    // this.globalDateAndTimeComponentService.globalDate$
    // this.globalDateAndTimeComponentService.globalTime$


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

}
