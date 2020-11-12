import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ControlContainer } from '@angular/forms';

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



isInCircle (mouseEvent: MouseEvent, elementR2ef: ElementRef): boolean {
  const domRect = elementR2ef.nativeElement.getBoundingClientRect();

  const radius = (domRect.right - domRect.left) / 2;

  const mouseCoorinates = this.pointFromMouseEvent(mouseEvent);
  const centerDiv =  this.pointFromDomRect(domRect);


  const radius_2 = Math.pow(radius, 2);
  const x_2 = Math.pow(centerDiv.x - mouseCoorinates.x, 2);
  const y_2 = Math.pow(centerDiv.y - mouseCoorinates.y, 2);
  const result = radius_2 - (x_2 + y_2);

  let inside = false;

  if(result > 0) {
    inside = true;
  } 
  return inside;
}


 navigationPrime(mouseEvent: MouseEvent): void {

  

  const isInTopCircle = this.isInCircle(mouseEvent, this.circleTop);
  const isInLeftCircle = this.isInCircle(mouseEvent, this.circleLeft);
  const isInRightCircle = this.isInCircle(mouseEvent, this.circleRight);


 if (isInTopCircle && isInLeftCircle && isInRightCircle){
  console.log(`Patrick is superdumb`);
 } else if (isInTopCircle && isInLeftCircle){
  console.log(`Patrick is dumb top left`); 
 } else if (isInTopCircle && isInRightCircle){
  console.log(`Patrick is dumb top right`);
  }  else if (isInLeftCircle && isInRightCircle){
    console.log(`Patrick is dumb left right`);
  }  else if (isInTopCircle) {
      console.log(`paul is dumb top`)
  } else if (isInLeftCircle) {
    console.log(`paul is dumb left`)
  } else if (isInRightCircle) {
    console.log(`paul is dumb rightkvlbjk`)
  }

 }

pointFromMouseEvent (mouseEvent: MouseEvent):  Point{
  return new Point(mouseEvent.clientX, mouseEvent.clientY);  
 }

  pointFromDomRect(domRect: DOMRect): Point {
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