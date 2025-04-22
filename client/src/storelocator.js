import React from "react";
import {
  GoogleMap,
  Marker,
  LoadScript,
  InfoWindow,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 12.9716,
  lng: 77.5946,
};

const stores = [
  {
    id: 1,
    name: "MedPlus - MG Road",
    lat: 12.974,
    lng: 77.6091,
  },
  {
    id: 2,
    name: "MedPlus - Koramangala",
    lat: 12.9352,
    lng: 77.6141,
  },
  // Add more stores as needed
];

const StoreLocator = () => {
  const [selectedStore, setSelectedStore] = React.useState(null);

  return (
    <LoadScript googleMapsApiKey="AIzaSyDm_DBBIEnQup4KQYtELMdC_R9Y3xELOzc">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
        {stores.map((store) => (
          <Marker
            key={store.id}
            position={{ lat: store.lat, lng: store.lng }}
            onClick={() => setSelectedStore(store)}
          />
        ))}

        {selectedStore && (
          <InfoWindow
            position={{
              lat: selectedStore.lat,
              lng: selectedStore.lng,
            }}
            onCloseClick={() => setSelectedStore(null)}
          >
            <div>
              <h4>{selectedStore.name}</h4>
              <p>Visit us here!</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default StoreLocator;
