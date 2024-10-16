import * as React from "react";
import Map, {GeolocateControl, Marker, MapRef, AttributionControl} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {useEffect, useMemo, useRef, useState} from "react";
import mapboxgl from "mapbox-gl";
// import MapMarker from "./mapMarker";
import {container, locateButton} from './shipwreckMap.module.scss'
import IShipwreck from "../types/IShipwreck";
import MapMarker from "./mapMarker";
import getShipID from "../lib/getShipID";
import { csv } from 'd3-fetch';
import SmallMapMarker from "./smallMapMarker";
import {Tooltip as ReactTooltip} from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css'


type ShipwreckMapProps = {
    shipwrecks: IShipwreck[]
    setSelectedShip: (arg0: IShipwreck) => void
    setHoveredShipID: (arg0: string) => void
    selectedShip: IShipwreck | null
    hoveredShipID: string
    shipDetailIsExpanded: boolean
}

const ShipwreckMap: React.FC<ShipwreckMapProps> = (props: ShipwreckMapProps) => {
    const mapRef = useRef<MapRef>(null);
    const onMarkerClick = (shipwreck: IShipwreck, index: number) => {
        // ref.current?.getElement().getElementsByTagName("svg")[0].getElementsByTagName("path")[0].setAttribute("fill", "#dc2626");
        props.setSelectedShip(shipwreck)
        mapRef.current?.easeTo({center: [parseFloat(shipwreck.Longitude), parseFloat(shipwreck.Latitude)], offset: [props.shipDetailIsExpanded ? mapRef.current.getContainer().clientWidth * 0.25 : 0, 0]})
    }
    const [markerZoom, setMarkerZoom] = useState(1)
    let geolocateControlRef = useRef<mapboxgl.GeolocateControl>(null);
    const [geolocateLoading, setGeolocateLoading] = useState(false)
    const [unexploredShipwrecks, setUnexploredShipwrecks] = useState([])

    useEffect(() => {
        csv('/awois.csv').then(data => {
            setUnexploredShipwrecks(data);
        });
    }, []);

    useEffect(() => {
        if (props.selectedShip !== null) {
            const long = parseFloat(props.selectedShip.Longitude)
            const lat = parseFloat(props.selectedShip.Latitude)
            if (!isNaN(long) && !isNaN(lat)) {
                mapRef.current?.easeTo({center: [ long, lat], offset: [props.shipDetailIsExpanded ? mapRef.current.getContainer().clientWidth * -0.35 : 0, 0]})
            }
        }
    }, [props.selectedShip]);

    useEffect(() => {
        if (props.selectedShip !== null) {
            if (props.shipDetailIsExpanded) {
                mapRef.current?.easeTo({
                    center: [parseFloat(props.selectedShip.Longitude), parseFloat(props.selectedShip.Latitude)],
                    offset: [mapRef.current.getContainer().clientWidth * -0.35, 0]
                });
            } else {

                mapRef.current?.easeTo({center: [parseFloat(props.selectedShip.Longitude), parseFloat(props.selectedShip.Latitude)]})
            }
        }
    }, [props.shipDetailIsExpanded]);


    // @ts-ignore
    return (<Map
        ref={mapRef}
        mapboxAccessToken={process.env.GATSBY_MAPBOX_TOKEN}
        initialViewState={{
            longitude: -73.98,
            latitude: 40.725,
            zoom: 5
        }}
        // style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0,  borderRadius: '15px'}}
        // mapStyle="mapbox://styles/wwwkieran/cm1ibsr0e008r01p6hlr64jd5"
        mapStyle="mapbox://styles/wwwkieran/cm2b3oyp4000c01qk1oi07w4i"
        minZoom={5}
        onZoom={(e) => {
            setMarkerZoom(e.viewState.zoom/5)
        }}
    >
        <GeolocateControl ref={geolocateControlRef} style={{scale: 2, visibility: "hidden"}} position={"bottom-right"} onGeolocate={() => {setGeolocateLoading(false)}}
                          showUserHeading={true} onError={ (e) => {
            setGeolocateLoading(false)
            console.log(e)
        }}/>
            {
                props.shipwrecks.map((shipwreck, index) => {
                const lat = parseFloat(shipwreck.Latitude)
                const long = parseFloat(shipwreck.Longitude)
                if (isNaN(lat) || isNaN(long)) {
                   return
                }
                return (<Marker key={shipwreck.id} longitude={long} element={undefined} latitude={lat} onClick={(e) => {onMarkerClick(shipwreck, index)}} >
                    <MapMarker shipwreck={shipwreck}
                               selected={shipwreck.id === getShipID(props.selectedShip)}
                               hovered={shipwreck.id === props.hoveredShipID}
                               scale={markerZoom}
                               setHoveredShipID={props.setHoveredShipID}
                               scaleByNumDied={true}
                               numDied={parseInt(shipwreck.Number_Died)}
                    />
                </Marker>)
            })
            }
        {unexploredShipwrecks.map((row, index) => {
            const lat = parseFloat(row["Column4"])
            const long = parseFloat(row["Column5"])
            if (isNaN(lat) || isNaN(long)) {
                return
            }
            return (<Marker key={row["Column1"] + row["Column4"] + row["Column5"]}  element={undefined} longitude={long} /*element={undefined}*/ latitude={lat} >
                <SmallMapMarker scale={markerZoom}/>
            </Marker>)
        })}
        <ReactTooltip id="tooltip"/>
    </Map>)
}



export default ShipwreckMap