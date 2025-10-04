import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalDateService } from 'src/app/pages/home/global-date.service';
import { MapService } from '../../map/map-service';
import { EventFilter } from 'src/app/model/event-list-filter';
import { EventType } from 'src/app/model/event-types';

@Component({
  selector: 'app-events-table-control',
  templateUrl: './events-table-control.component.html',
  styleUrl: './events-table-control.component.css'
})
export class EventsTableControlComponent implements OnInit, OnDestroy {

  genreSet: Set<string> = new Set(['All', 'Band', 'Busker', 'Dj', 'Performance']);
  selectGenre: Set<string> = new Set();

  @Input() homeAddress: string = '';
  @Output() filterChange = new EventEmitter<EventFilter>();
  
  allEventsVisible = true;
  bandEventsVisible = true;
  buskerEventsVisible = true;
  djEventsVisible = true;
  performanceEventsVisible = true;

  showDateControls = false;
  globalDate: Date;
  
  mapDetails: String[] = [];
  
  distances: number[] = [1, 2, 3, 4, 5, 10, 15, 20, 30, 40, 50];
  selectedDistance: number = 5; // default
  withinOptions: { label: string, value: number }[] = [
    { label: '30 minutes', value: 0.5 },
    { label: '1 hour', value: 1 },
    { label: '2 hours', value: 2 },
    { label: '3 hours', value: 3 },
    { label: '12 hours', value: 12 },
    { label: '24 hours', value: 24 },
    { label: '2 days', value: 48 },
    { label: '1 week', value: 168 },      // 7 * 24
    { label: '1 month', value: 720 }      // Approx: 30 * 24
  ];
  sortOptions: { label: string, value: string }[] = [
    { label: 'Starting', value: 'starting' },   
    { label: 'Ending', value: 'ending' },   
    { label: 'Nearest', value: 'distance' },        // By proximity
    { label: 'Most Followers', value: 'followers' }, // By artist popularity
    { label: 'Most Attended', value: 'attendance' }  // By crowd size
  ];
  selectedSort: string = 'distance'; // default: Nearest
  selectedWithin: number = 1; // default: 1 hour
  searchText: string = '';
  
  private subscription!: Subscription;

  constructor(private globalDateService: GlobalDateService, private mapService: MapService) {
   this.globalDateService.globalDate$.subscribe((globalDate) => {
     if(globalDate) {
         this.globalDate = globalDate;
            // console.log(globalDate);
     }
   });

   this.subscription = this.mapService?.mapCurrentLocationDetails$.subscribe((details) => {
    this.mapDetails = details;
  
    const addressString = details?.[5];
  
    if (addressString) {
      const parts = addressString.split(',').map(part => part.trim());

      const street = parts[0] || '';
      const cityOrCounty = parts[2] || parts[3] || '';
      const country = parts[parts.length - 1] || '';
      const formattedAddress = `${street}, ${cityOrCounty}, ${country}`;
      this.homeAddress = formattedAddress;
   } else {
    // console.warn('Address string is undefined or empty.');
  }
});
}
 
 async ngOnInit() { 
  this.globalDateService.globalDate$.subscribe((date) => {
    if (date) {
      this.globalDate = date;
    }
  });

      this.subscription = this.globalDateService.showDateControls$
      .subscribe((visible) => {
        this.showDateControls = visible;
      });
 }

 toggleDateControls() {
   this.showDateControls = !this.showDateControls;
 }

 private emitFilter(): void {
  const filter: EventFilter = {
    genres: new Set(Array.from(this.genreSet).map(g => this.mapStringToEventType(g))),
    search: '', // wire up later
    distance: this.selectedDistance,
    within: this.selectedWithin,
    sort: this.selectedSort,
    date: this.globalDate,
    location: this.homeAddress
  };

  console.log(filter); 
  this.filterChange.emit(filter);
}
 
onTimeSelected(selectedTime: Date) {
  const updatedGlobalDate = new Date(this.globalDate);
  updatedGlobalDate.setHours(selectedTime.getHours());
  updatedGlobalDate.setMinutes(selectedTime.getMinutes());
  updatedGlobalDate.setSeconds(0);
  updatedGlobalDate.setMilliseconds(0);
  this.globalDateService.upDateTime(updatedGlobalDate);
  this.emitFilter();
}
 
 onDateSelected(selectedDate: Date): void {
  if (!selectedDate) return;
  const updatedGlobalDate = new Date(selectedDate);
  updatedGlobalDate.setHours(this.globalDate.getHours());
  updatedGlobalDate.setMinutes(this.globalDate.getMinutes());
  updatedGlobalDate.setSeconds(0);
  updatedGlobalDate.setMilliseconds(0);
  this.globalDateService.upDate(updatedGlobalDate); // store globally
  this.emitFilter(); // emit updated filter
}

 private toggleGenreInSet(genre: string, visible: boolean): void {
  if (visible) {
    this.genreSet.add(genre);
  } else {
    this.genreSet.delete(genre);
  }
  this.selectGenre = this.genreSet;
}

private mapStringToEventType(genre: string): EventType {
  switch (genre.toLowerCase()) {
        case 'all': return EventType.ALL;
    case 'band': return EventType.BAND;
    case 'busker': return EventType.BUSKER;
    case 'dj': return EventType.DJ;
    case 'performance': return EventType.PERFORMANCE;
    default: throw new Error(`Unknown genre: ${genre}`);
  }
}

allFunction() {

  this.allEventsVisible = !this.allEventsVisible;
  this.toggleGenreInSet('All', this.allEventsVisible);
  this.emitFilter();
}

bandFunction() {
  this.bandEventsVisible = !this.bandEventsVisible;
  this.toggleGenreInSet('Band', this.bandEventsVisible);
      this.emitFilter();
}

buskerFunction() {
  this.buskerEventsVisible = !this.buskerEventsVisible;
  this.toggleGenreInSet('Busker', this.buskerEventsVisible);
      this.emitFilter();
}

djFunction() {
  this.djEventsVisible = !this.djEventsVisible;
  this.toggleGenreInSet('Dj', this.djEventsVisible);
      this.emitFilter();
}

performanceFunction() {
  this.performanceEventsVisible = !this.performanceEventsVisible;
  this.toggleGenreInSet('Performance', this.performanceEventsVisible);
      this.emitFilter();
}

  onDistanceChange(event: Event) {
    this.emitFilter();
  }

  onWithinChange(event: Event) {
    this.emitFilter();
  }

  onSortChange(event: Event) {
    this.emitFilter();
  }

  onSearchChange(event: Event) {
    this.emitFilter();
  }

    ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
