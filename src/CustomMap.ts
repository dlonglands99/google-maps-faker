// Mappable is the gatekeeper to my 'addMakrer' function
// The data type has to have a 'location' property of 'google.maps.LatLngLiteral'

export interface Mappable {
  location: google.maps.LatLngLiteral;
  markerContent(): string;
}

const center: google.maps.LatLngLiteral = {
  lat: 0,
  lng: 0,
};

const mapOptions: google.maps.MapOptions = {
  zoom: 2,
  center: center,
};

export class CustomMap {
  private map: google.maps.Map;

  constructor(elementId: string) {
    this.map = new google.maps.Map(
      document.getElementById(elementId),
      mapOptions
    );
  }

  addMarker(mappable: Mappable): void {
    const marker = new google.maps.Marker({
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng,
      },
      map: this.map,
    });

    marker.addListener('click', () => {
      this.openInfoWindow(mappable.markerContent(), marker);
    });
  }

  private openInfoWindow(
    markerContent: string,
    marker: google.maps.Marker
  ): void {
    const infoWindow = new google.maps.InfoWindow({
      content: markerContent,
    });

    infoWindow.open(this.map, marker);
  }
}
