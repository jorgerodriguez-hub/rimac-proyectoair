import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%',
};
 
export class GoogleMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
        stores: [{latitude: -12.1220737, longitude: -77.0329272}]
    //   stores: [{latitude: 47.49855629475769, longitude: -122.14184416996333},
    //           {latitude: 47.359423, longitude: -122.021071},
    //           {latitude: 47.2052192687988, longitude: -121.988426208496},
    //           {latitude: 47.6307081, longitude: -122.1434325},
    //           {latitude: 47.3084488, longitude: -122.2140121},
    //           {latitude: 47.5524695, longitude: -122.0425407}]
    }
  }

  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return <Marker key={index} id={index} position={{
        lat: store.latitude,
        lng: store.longitude
     }}
     onClick={() => console.log("You clicked me!")} />
    })
  }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={13}
        style={mapStyles}
        initialCenter={{ lat: -12.1220737, lng: -77.0329272}}
      >
        {this.displayMarkers()}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBlmA6WWmOCDNwP1Cnqihm4VCB-dK35hac'
})(GoogleMap);




// API RIMAC: AIzaSyAQFXPbnXkS-Gt_oEKOFZkJcUlVdBV1xos

//    MI API: AIzaSyDk4CMkUU4z11vy-BkHQjgOkRNvGgxBlYQ