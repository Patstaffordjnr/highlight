import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Event } from 'src/app/model/event';
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

  // console.log(this.currentPage, this.noOfProducts, this.bounds,  this.minLat, this.maxLat, this.minLong, this.maxLong);

  ngOnInit() {
    this.mapService.mapCurrentLocationDetails$.subscribe((mapDetails) => {
      console.log(mapDetails);
      const [ bounds, minLat, maxLat, minLong, maxLong ] = mapDetails;
      this.bounds = bounds;
      this.minLat = minLat;
      this.maxLat = maxLat;
      this.minLong = minLong;
      this.maxLong = maxLong;

;

    });

  }



  async getEvents(currentPage: Number, noOfProducts: Number): Promise<{}>{ 
this.ngOnInit();

let time = new Date()


const params = new HttpParams()
.set('time', time.toISOString())
.set('minLat', this.minLat.toString())
.set('maxLat', this.maxLat.toString())
.set('minLong', this.minLong.toString())
.set('maxLong', this.maxLong.toString())
.set('eventTypes', 'BAND, BUSKER, DJ, PERFORMANCE');

let url =  `http://localhost:8085/busker/getEvents?pageNumber=${currentPage}&pageSize=${noOfProducts}` ;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });      

    let x = this.http.get<{}>(url, {withCredentials: true, headers: headers, params: params}).toPromise();
console.log(x);

    return this.http.get<{}>(url, {withCredentials: true, headers: headers, params: params}).toPromise();

    return
    // console.log(`CurrentPage:${currentPage}`);
    // console.log(`No Of Products:${noOfProducts}`);

    // console.log(time);
  
    // let params = new HttpParams().set("pageNumber",1).set("pageSize", 8);

    // let url =  `http://localhost:8085/busker/getEvents?pageNumber=${currentPage}&pageSize=${noOfProducts}` ;
    // let headers = new HttpHeaders({
    //   'Content-Type': 'application/json'
    // });      

    // return this.http.get<{}>(url, {withCredentials: true, headers: headers, params: params}).toPromise();
  }

  
}