import { EventType } from '../model/event-types';

export class Event {
  public title: string;
  public eventType: EventType;
  public lat: number;
  public long: number;
  public startAt: Date;
  public endAt: Date;
  public createdAt: Date;
  public updatedAt: Date;
  public userId: string;

  constructor(
    title: string,
    eventType: EventType,
    lat: number,
    long: number,
    startAt: Date,
    endAt: Date,
    createdAt: Date,
    updatedAt: Date,
    userId: string
  ) {
    this.title = title;
    this.eventType = eventType;
    this.lat = lat;
    this.long = long;
    this.startAt = startAt;
    this.endAt = endAt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.userId = userId;
  }
}
