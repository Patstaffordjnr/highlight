import * as L from 'leaflet';
import { EventType } from 'src/app/model/event-types';

const GENRE_COLORS: Record<EventType, string> = {
  [EventType.ALL]:         'deepskyblue',
  [EventType.BUSKER]:      'red',
  [EventType.BAND]:        'green',
  [EventType.DJ]:          'yellow',
  [EventType.PERFORMANCE]: 'hotpink',
};

function pinIcon(color: string): L.DivIcon {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="41" viewBox="0 0 25 41">
      <path d="M12.5 0C5.6 0 0 5.6 0 12.5C0 22 12.5 41 12.5 41C12.5 41 25 22 25 12.5C25 5.6 19.4 0 12.5 0Z"
            fill="${color}" stroke="rgba(0,0,0,0.4)" stroke-width="1.5"/>
      <circle cx="12.5" cy="12.5" r="5" fill="white" opacity="0.7"/>
    </svg>`;
  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
}

export const markerIcons: Record<EventType, L.DivIcon> = {
  [EventType.ALL]:         pinIcon(GENRE_COLORS[EventType.ALL]),
  [EventType.BUSKER]:      pinIcon(GENRE_COLORS[EventType.BUSKER]),
  [EventType.BAND]:        pinIcon(GENRE_COLORS[EventType.BAND]),
  [EventType.DJ]:          pinIcon(GENRE_COLORS[EventType.DJ]),
  [EventType.PERFORMANCE]: pinIcon(GENRE_COLORS[EventType.PERFORMANCE]),
};
