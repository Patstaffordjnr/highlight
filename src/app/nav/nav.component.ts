import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @ViewChild('circletop') circleTop: ElementRef;
  @ViewChild('circleleft') circleLeft: ElementRef;
  @ViewChild('circleright') circleRight: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

 navigationPrime(mouseEvent: MouseEvent): void {

    const width = (this.circleTop.nativeElement.getBoundingClientRect().right - 
      this.circleTop.nativeElement.getBoundingClientRect().left) / 2;
    const mouseCoorinates = this.printCoordinates(mouseEvent);
    const centerDiv =  this.printCenterCordinates(this.circleTop.nativeElement.getBoundingClientRect());

    mouseCoorinates.print();
    centerDiv.print();
    
    const radius_2 = Math.pow(width, 2);
    const x_2 = Math.pow(centerDiv.x - mouseCoorinates.x, 2);
    const y_2 = Math.pow(centerDiv.y - mouseCoorinates.y, 2);
    const result = radius_2 - (x_2 + y_2);

    if(result > 0) {
      console.log('Inside circle 1');
    } else if (result === 0) {
      console.log('On the circumference of circle 1');
    } else {
      console.log('Outside');
    }
  }



  // int d = r^2 - ((center_x-x)^2 + (center_y-y)^2);

  // if(d>0)
  //   print("inside");
  // else if(d==0)
  //   print("on the circumference");
  // else
  //   print("outside");

 printCoordinates(mouseEvent: MouseEvent):  Point{
  return new Point(mouseEvent.clientX, mouseEvent.clientY);  
 }

  printCenterCordinates(domRect: DOMRect): Point{
    
    const xLine1 = domRect.right - domRect.left;
    const xLine2 = xLine1 / 2;
    const x = domRect.right - xLine2;

    const yLine1 = domRect.bottom - domRect.top;
    const yLine2 = yLine1 / 2;
    const y = domRect.bottom - yLine2;
    return new Point(x,y);
  }    
}

class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  print(): void {
    console.log(this.x, this.y);
  }
}