import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { MapService } from '../map/map-service';

@Injectable({
  providedIn: 'root',
})

export class EventsClient implements OnInit{

  eventTypes = ["Band","Busker","Dj","Performance"];
  currentPage;
  noOfProducts;
  bounds
  minLat
  maxLat
  minLong
  maxLong 

  constructor(private http: HttpClient, private mapService: MapService) {
  }

  ngOnInit() {
    this.mapService.mapCurrentLocationDetails$.subscribe((mapDetails) => {
      const [ bounds, minLat, maxLat, minLong, maxLong ] = mapDetails;
      this.bounds = bounds;
      this.minLat = minLat;
      this.maxLat = maxLat;
      this.minLong = minLong;
      this.maxLong = maxLong;
    });
  }


async getEvents(currentPage: Number, noOfProducts: Number): Promise<{}>{ 
  this.ngOnInit();

  const params = new HttpParams()
  .set('currentPage' , this.currentPage)
  .set('noOfProducts' ,this.noOfProducts)
  .set('eventTyoes', String(this.eventTypes))

  let url =  `http://localhost:8085/busker/getEvents?pageNumber=${currentPage}&pageSize=${noOfProducts}` ;
  let headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });      

  return await this.http.get<{}>(url, {withCredentials: true, headers: headers, params: params}).toPromise();
  }

  
}