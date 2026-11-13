
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalDateService } from 'src/app/pages/home/global-date.service';
import { MapService } from '../../map/map-service';
import { EventFilter } from 'src/app/model/event-list-filter';
import { EventType } from 'src/app/model/event-types';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buskers-table-control',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buskers-table-control.component.html',
  styleUrl: './buskers-table-control.component.css'
})
export class BuskersTableControlComponent implements OnInit, OnDestroy{

  genreSet: Set<string> = new Set(['All', 'Band', 'Busker', 'Dj', 'Performance']);

  @Output() filterChange = new EventEmitter<EventFilter>();
  
  allEventsVisible = true;
  bandEventsVisible = true;
  buskerEventsVisible = true;
  djEventsVisible = true;
  performanceEventsVisible = true;

  showDateControls = false;
  globalDate: Date;
  
  homeAddress: string = '';
  
  selectedDistance: number = 5; // default
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
     }
   });

   this.subscription = this.mapService?.mapCurrentLocationDetails$.subscribe((details) => {
    const addressString = details?.[5]; // safely access index 5
  
    if (addressString) {
      const parts = addressString.split(',').map(part => part.trim());

      const street = parts[0] || '';
      const cityOrCounty = parts[2] || parts[3] || ''; // Adjust index as needed
      const country = parts[parts.length - 1] || '';
      const formattedAddress = `${street}, ${cityOrCounty}, ${country}`;
      // console.log('Formatted address:', formattedAddress);
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

 private emitFilter(): void {
  const filter: EventFilter = {
    genres: new Set(Array.from(this.genreSet).map(g => this.mapStringToEventType(g))),
    search: this.searchText,
    distance: this.selectedDistance,
    within: this.selectedWithin,
    sort: this.selectedSort,
    date: this.globalDate,
    location: this.homeAddress
  };
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
  if (this.allEventsVisible) {
    this.genreSet = new Set(['All', 'Band', 'Busker', 'Dj', 'Performance']);
    this.bandEventsVisible = true;
    this.buskerEventsVisible = true;
    this.djEventsVisible = true;
    this.performanceEventsVisible = true;
  } else {
    this.genreSet.delete('All');
  }
  this.emitFilter();
}

bandFunction() {
  this.bandEventsVisible = !this.bandEventsVisible;
  this.toggleGenreInSet('Band', this.bandEventsVisible);
  this.allEventsVisible = false;
  this.genreSet.delete('All');
  this.emitFilter();
}

buskerFunction() {
  this.buskerEventsVisible = !this.buskerEventsVisible;
  this.toggleGenreInSet('Busker', this.buskerEventsVisible);
  this.allEventsVisible = false;
  this.genreSet.delete('All');
  this.emitFilter();
}

djFunction() {
  this.djEventsVisible = !this.djEventsVisible;
  this.toggleGenreInSet('Dj', this.djEventsVisible);
  this.allEventsVisible = false;
  this.genreSet.delete('All');
  this.emitFilter();
}

performanceFunction() {
  this.performanceEventsVisible = !this.performanceEventsVisible;
  this.toggleGenreInSet('Performance', this.performanceEventsVisible);
  this.allEventsVisible = false;
  this.genreSet.delete('All');
  this.emitFilter();
}

  onSortChange() {
    this.emitFilter();
  }

  onSearchChange() {
    this.emitFilter();
  }

    ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
