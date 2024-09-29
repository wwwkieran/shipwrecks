import * as React from "react"
import {graphql, HeadFC, PageProps, useStaticQuery} from "gatsby"
import {useEffect, useState} from "react";
import ShipwreckMap from "../components/shipwreckMap";
import { gridContainer, gridItem, fullWidth } from "./index.module.scss";
import TimelineSmall from "../components/timelineSmall";


const IndexPage: React.FC<PageProps> = () => {
    const data = useStaticQuery(graphql`
    query MyQuery {
      allDataCsv {
        nodes {
            id
            imgPath
            Dataset
            Depth
            ImgPath__3d
            Destination_Port
            Lake
            ImgPath__Historical_other
            Latitude
            Length
            Longitude
            Origin_Port
            Ship
            Site_Description
            Vessel_Type
            Year_Built
            Year_Sank
        }
      }
    }`)

    const [selectedShipID, setSelectedShipID] = useState<string>("default value");
    const [hoveredShipID, setHoveredShipID] = useState<string>("default value");


    useEffect(() => {
        console.log("hover:" + hoveredShipID)
    }, [hoveredShipID]);

    useEffect(() => {
        console.log("selected:" + selectedShipID)
    }, [selectedShipID]);


    return (
        <div className={gridContainer}>
            <div className={gridItem}>

            </div>
            <div className={gridItem}>2</div>
            <div className={gridItem}>
                <ShipwreckMap shipwrecks={data.allDataCsv.nodes} setSelectedShipID={setSelectedShipID} setHoveredShipID={setHoveredShipID} hoveredShipID={hoveredShipID} selectedShipID={selectedShipID}></ShipwreckMap>
            </div>
            <div className={`${gridItem} ${fullWidth}`}>
                <TimelineSmall shipwrecks={data.allDataCsv.nodes} setHoveredShipwreckID={setHoveredShipID} setSelectedShipwreckID={setSelectedShipID} hoveredShipID={hoveredShipID} selectedShipID={selectedShipID}/>
            </div>
        </div>
    )
}

export default IndexPage

export const Head: HeadFC = () => <title>Shipwrecks</title>
