import L from 'leaflet'

function createMapPinIcon(fillColor: string) {
  return L.divIcon({
    className: 'map-pin-marker-container',
    html: `<svg aria-hidden="true" width="30" height="42" viewBox="0 0 30 42" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 1C7.27 1 1 7.27 1 15c0 10.5 14 26 14 26s14-15.5 14-26C29 7.27 22.73 1 15 1Z" fill="${fillColor}" stroke="#f8fafc" stroke-width="2" stroke-linejoin="round" />
      <circle cx="15" cy="15" r="4" fill="#f8fafc" />
    </svg>`,
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    tooltipAnchor: [0, -36],
  })
}

export const GUESS_MAP_PIN_ICON = createMapPinIcon('#f43f5e')
export const ANSWER_MAP_PIN_ICON = createMapPinIcon('#34d399')
