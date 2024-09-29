import * as React from "react";
import Map, {GeolocateControl, Marker, MapRef, AttributionControl} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {useEffect, useMemo, useRef, useState} from "react";
import mapboxgl from "mapbox-gl";
// import MapMarker from "./mapMarker";
import {container, locateButton} from './shipwreckMap.module.scss'
import IShipwreck from "../types/IShipwreck";
import MapMarker from "./mapMarker";

type ShipwreckMapProps = {
    shipwrecks: IShipwreck[]
    setSelectedShipID: (arg0: string) => void
    setHoveredShipID: (arg0: string) => void
    selectedShipID: string
    hoveredShipID: string
}

const ShipwreckMap: React.FC<ShipwreckMapProps> = (props: ShipwreckMapProps) => {
    const mapRef = useRef<MapRef>(null);
    const onMarkerClick = (shipwreck: IShipwreck, index: number) => {
        // ref.current?.getElement().getElementsByTagName("svg")[0].getElementsByTagName("path")[0].setAttribute("fill", "#dc2626");
        props.setSelectedShipID(shipwreck.id)
        mapRef.current?.easeTo({center: [parseFloat(shipwreck.Longitude), parseFloat(shipwreck.Latitude)]})
    }
    // const [openings, setOpenings] = useState(props.openings)
    // useEffect(() => {
    //     console.log(props.openings)
    //     setOpenings(props.openings)
    // }, [props.openings]);
    const [markerZoom, setMarkerZoom] = useState(1)
    let geolocateControlRef = useRef<mapboxgl.GeolocateControl>(null);
    const [geolocateLoading, setGeolocateLoading] = useState(false)

    useEffect(() => {
        for (const shipwreck of props.shipwrecks) {
            if (shipwreck.id === props.selectedShipID) {
                mapRef.current?.easeTo({center: [parseFloat(shipwreck.Longitude), parseFloat(shipwreck.Latitude)]})
            }
        }
    }, [props.selectedShipID]);


    return (<Map
        ref={mapRef}
        mapboxAccessToken={process.env.GATSBY_MAPBOX_TOKEN}
        initialViewState={{
            longitude: -73.98,
            latitude: 40.725,
            zoom: 5
        }}
        // style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0,  borderRadius: '15px'}}
        mapStyle="mapbox://styles/wwwkieran/cm1ibsr0e008r01p6hlr64jd5"
        minZoom={4}
        onZoom={(e) => {
            setMarkerZoom(e.viewState.zoom/5)
        }}
    >
        <GeolocateControl ref={geolocateControlRef} style={{scale: 2, visibility: "hidden"}} position={"bottom-right"} onGeolocate={() => {setGeolocateLoading(false)}}
                          showUserHeading={true} onError={ (e) => {
            setGeolocateLoading(false)
            console.log(e)
        }}/>
            {props.shipwrecks.map((shipwreck, index) => {
                const lat = parseFloat(shipwreck.Latitude)
                const long = parseFloat(shipwreck.Longitude)
                if (isNaN(lat) || isNaN(long)) {
                   return
                }
                return (<Marker key={shipwreck.id} longitude={long} element={undefined} latitude={lat} onClick={(e) => {onMarkerClick(shipwreck, index)}} >
                    <MapMarker shipwreck={shipwreck} selected={shipwreck.id === props.selectedShipID} hovered={shipwreck.id === props.hoveredShipID} scale={markerZoom} setHoveredShipID={props.setHoveredShipID}/>
                </Marker>)
            })}
    </Map>)
}

export default ShipwreckMap