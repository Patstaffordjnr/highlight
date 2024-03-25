import { EventType } from '../model/event-type'

export class Event {
    public title: String;
    public eventType: EventType
    public lat: Number
    public long: Number
    public startAt: Date;
    public endAt: Date;
    public createdAt: Date;
    public updatedAt: Date;
    public id: String;

    constructor(
        title: String,
        eventType: EventType,
        lat: Number,
        long: Number,
        startAt: Date,
        endAt: Date,
        createdAt: Date,
        updatedAt: Date,
        id: String
        ) {
            this.title = title;
            this.eventType = eventType;
            this.lat = lat;
            this.long = long;
            this.startAt = startAt;
            this.endAt = endAt;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
            this.id = id;
    }
}