import { Event } from '../../model/event'

export interface PageListResponse {
    results : Event[];
    totalSize: number
}