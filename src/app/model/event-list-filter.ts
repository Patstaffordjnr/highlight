import { EventType } from 'src/app/model/event-types';


export interface EventFilter {
  genres: Set<EventType>;
  search: string;
  distance: number;
  within: number;
  sort: string;
  date: Date;
  location?: string;
}