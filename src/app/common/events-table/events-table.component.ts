import { Component, OnInit } from '@angular/core';
import { PageListResponse } from '../event/page-list-response';
import { EventsClient } from '../event/events-client';

@Component({
  selector: 'app-events-table',
  templateUrl: './events-table.component.html',
  styleUrl: './events-table.component.css'
})
export class EventsTableComponent implements OnInit {



constructor (private eventsClient: EventsClient) {

}

async ngOnInit() { 


}

}
