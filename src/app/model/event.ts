import { EventType } from '../model/event-types';

export class Event {
  public createdAt: Date;
  public endAt: Date;
  public eventType: EventType;
  public id: string;
  public lat: number;
  public long: number;
  public startAt: Date;
  public title: string;
  public updatedAt: Date;
  public userId: string;

  constructor(
    createdAt: Date,
    endAt: Date,
    eventType: EventType,
    id: string,
    lat: number,
    long: number,
    startAt: Date,
    title: string,
    updatedAt: Date,
    userId: string
  ) {
    this.createdAt = createdAt;
    this.endAt = endAt;
    this.eventType = eventType;
    this.id = id;
    this.lat = lat;
    this.long = long;
    this.startAt = startAt;
    this.title = title;
    this.updatedAt = updatedAt;
    this.userId = userId;
  }
}
