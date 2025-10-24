import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
@Input() selectedTime: Date = new Date();
  @Output() selectTimeEvent = new EventEmitter<Date>();

  @ViewChild('progressBarDiv') progressBarDiv!: ElementRef;
  @ViewChild('dot') dot!: ElementRef;

  hours: string[] = [];
  isDragging = false;
  viewInitialized = false;

  private mousemoveBound!: (e: MouseEvent) => void;
  private mouseupBound!: (e: MouseEvent) => void;
  private touchmoveBound!: (e: TouchEvent) => void;
  private touchendBound!: (e: TouchEvent) => void;

  ngOnInit(): void {
    this.initialiseClock();
  }

  ngAfterViewInit(): void {
    this.viewInitialized = true;

    this.mousemoveBound = this.mousemove.bind(this);
    this.mouseupBound = this.mouseup.bind(this);
    this.touchmoveBound = this.touchmove.bind(this);
    this.touchendBound = this.touchend.bind(this);

    const timeToUse = this.selectedTime || new Date();
    timeToUse.setHours(12, 0, 0); // default 12:00
    this.setClock(timeToUse);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['selectedTime'] &&
      this.selectedTime &&
      this.viewInitialized &&
      !this.isDragging
    ) {
      this.setClock(this.selectedTime);
    }
  }

  ngOnDestroy(): void {
    document.removeEventListener('mousemove', this.mousemoveBound);
    document.removeEventListener('mouseup', this.mouseupBound);
    document.removeEventListener('touchmove', this.touchmoveBound);
    document.removeEventListener('touchend', this.touchendBound);
  }

  // === Mouse Events ===
  mouseDown(event: MouseEvent): void {
    event.preventDefault();
    this.isDragging = true;
    document.addEventListener('mousemove', this.mousemoveBound);
    document.addEventListener('mouseup', this.mouseupBound);
  }

  mousemove(event: MouseEvent): void {
    if (!this.isDragging || !this.progressBarDiv) return;
    this.updateFromClientX(event.clientX);
  }

  mouseup(event: MouseEvent): void {
    if (!this.isDragging) return;
    this.isDragging = false;
    document.removeEventListener('mousemove', this.mousemoveBound);
    document.removeEventListener('mouseup', this.mouseupBound);
  }

  // === Touch Events ===
  touchStart(event: TouchEvent): void {
    event.preventDefault();
    this.isDragging = true;
    document.addEventListener('touchmove', this.touchmoveBound, { passive: false });
    document.addEventListener('touchend', this.touchendBound);
  }

  touchmove(event: TouchEvent): void {
    if (!this.isDragging) return;
    event.preventDefault();
    const touch = event.touches[0];
    this.updateFromClientX(touch.clientX);
  }

  touchend(event: TouchEvent): void {
    if (!this.isDragging) return;
    this.isDragging = false;
    document.removeEventListener('touchmove', this.touchmoveBound);
    document.removeEventListener('touchend', this.touchendBound);
  }

  // === Core Update Logic ===
  private updateFromClientX(clientX: number): void {
  if (!this.progressBarDiv || !this.dot) return;

  const barRect = this.progressBarDiv.nativeElement.getBoundingClientRect();
  const barWidth = barRect.width;
  const dotWidth = this.dot.nativeElement.offsetWidth;

  if (barWidth === 0) return;

  let centerX = clientX - barRect.left;
  centerX = Math.max(0, Math.min(centerX, barWidth));

  const totalMinutes = (centerX / barWidth) * 24 * 60;
  let hour = Math.floor(totalMinutes / 60);
  let minute = Math.round(totalMinutes % 60 / 5) * 5;

  if (minute >= 60) {
    minute = 0;
    hour++;
  }
  hour = hour % 24; // FIXED: wrap 24 → 0

  const newTime = new Date(
    this.selectedTime.getFullYear(),
    this.selectedTime.getMonth(),
    this.selectedTime.getDate(),
    hour,
    minute,
    0
  );

  this.emitTime(newTime);
  this.dot.nativeElement.style.left = `${centerX - dotWidth / 2}px`;
}

  // === Clock Setup ===
  initialiseClock(): void {
    this.hours = Array.from({ length: 24 }, (_, i) =>
      i.toString().padStart(2, '0')
    );
  }

  setClock(date: Date): void {
    if (!this.viewInitialized || !this.progressBarDiv || !this.dot) return;

    const barRect = this.progressBarDiv.nativeElement.getBoundingClientRect();
    const barWidth = barRect.width;
    if (barWidth === 0) return;

    const totalMinutes = date.getHours() * 60 + date.getMinutes();
    const centerX = (totalMinutes / (24 * 60)) * barWidth;

    const dotWidth = this.dot.nativeElement.offsetWidth;
    const left = centerX - dotWidth / 2;

    this.dot.nativeElement.style.left = `${left}px`;
  }

  emitTime(date: Date): void {
    this.selectTimeEvent.emit(date);
  }
}