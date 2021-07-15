import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};
 
export class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
        store: { latitud: props.latitud, longitud: props.longitud }
    }
    console.log('e1', this.state.store.latitud);
    console.log('e2', this.state.store.longitud);
  }

  displayMarkers = () => {
      return <Marker position={{
        lat: this.state.store.latitud,
        lng: this.state.store.longitud
      }}
     onClick={() => console.log("You clicked me!")} />
  }

  render() {
    return !this.props.latitud ? null : (
      <Map
        google={this.props.google}
        zoom={13}
        style={mapStyles}
        initialCenter={{ lat: this.state.store.latitud, lng: this.state.store.longitud }}
      >
        {this.displayMarkers()}
      </Map>
    );
  }
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBlmA6WWmOCDNwP1Cnqihm4VCB-dK35hac'
})(GoogleMap);

// API RIMAC: AIzaSyAQFXPbnXkS-Gt_oEKOFZkJcUlVdBV1xos
//    MI API: AIzaSyDk4CMkUU4z11vy-BkHQjgOkRNvGgxBlYQ