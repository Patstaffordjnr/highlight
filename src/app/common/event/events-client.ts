import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MapService } from '../map/map-service';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class EventsClient {
  minLat!: number;
  maxLat!: number;
  minLong!: number;
  maxLong!: number;

  private eventTypes = ['BAND', 'BUSKER', 'DJ', 'PERFORMANCE'];

  constructor(private http: HttpClient, private mapService: MapService) {
    this.mapService.mapCurrentLocationDetails$.subscribe((mapDetails) => {
      const [bounds, minLat, maxLat, minLong, maxLong] = mapDetails;
      this.minLat = Number(minLat);
      this.maxLat = Number(maxLat);
      this.minLong = Number(minLong);
      this.maxLong = Number(maxLong);
    });
  }

  async getOpenEvents(time: Date): Promise<any> {
    let params = new HttpParams()
      .set('time', time.toISOString())
      .set('minLat', this.minLat.toString())
      .set('minLong', this.minLong.toString())
      .set('maxLat', this.maxLat.toString())
      .set('maxLong', this.maxLong.toString());

    this.eventTypes.forEach(type => {
      params = params.append('eventTypes', type);
    });

    return await this.http.get(`${environment.apiUrl}/open/getEvents`, {
      params,
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' }
    }).toPromise(); // ← This works in RxJS 6
  }

  async buskerGetEvents(currentPage: number, noOfProducts: number): Promise<any> {
    const url = `${environment.apiUrl}/busker/getEvents?pageNumber=${currentPage}&pageSize=${noOfProducts}`;
    return await this.http.get(url, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' }
    }).toPromise();
  }
}