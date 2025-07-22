import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { MapService } from '../map/map-service';

@Injectable({
  providedIn: 'root',
})

export class EventsClient implements OnInit{
  time
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
    // this.mapService.mapCurrentLocationDetails$.subscribe((mapDetails) => {
    //   const [ bounds, minLat, maxLat, minLong, maxLong ] = mapDetails;
    //   this.bounds = bounds;
    //   this.minLat = minLat;
    //   this.maxLat = maxLat;
    //   this.minLong = minLong;
    //   this.maxLong = maxLong;
    // });
    // console.log(
    //   this.noOfProducts,
    //   this.bounds,
    //   this.minLat,
    //   this.maxLat,
    //   this.minLong,
    //   this.maxLong 
    // );
  }

async buskerGetEvents(currentPage: Number, noOfProducts: Number): Promise<{}>{ 
  this.ngOnInit();

  const params = new HttpParams()
  .set('currentPage' , this.currentPage)
  .set('noOfProducts' ,this.noOfProducts)
  // .set('eventTypes', String(this.eventTypes))

  let url =  `http://localhost:8085/busker/getEvents?pageNumber=${currentPage}&pageSize=${noOfProducts}` ;
  let headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });      

  return await this.http.get<{}>(url, {withCredentials: true, headers: headers, params: params}).toPromise();
  }

  async getOpenEvents(time: Date, minLat: number, minLong: number,
    maxLat: number, maxLong: number, eventTypes: string[] = []): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    let params = new HttpParams()
      .set('time', time.toISOString())
      .set('minLat', minLat.toString())
      .set('minLong', minLong.toString())
      .set('maxLat', maxLat.toString())
      .set('maxLong', maxLong.toString());
  
    eventTypes.forEach(type => {
      params = params.append('eventTypes', type.toUpperCase());
    });
  console.log(params);
      console.log('GET /open/getEvents params:', params.toString());

    return await this.http.get<{}>(
      'http://localhost:8085/open/getEvents',
      {
        headers,
        params,
        withCredentials: true
      }
    ).toPromise();
  }
  
}


