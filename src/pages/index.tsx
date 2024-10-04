import * as React from "react"
import {graphql, HeadFC, PageProps, useStaticQuery} from "gatsby"
import {useEffect, useState} from "react";
import ShipwreckMap from "../components/shipwreckMap";
import { gridContainer, gridItem, fullWidth } from "./index.module.scss";
import TimelineSmall from "../components/timelineSmall";
import IShipwreck from "../types/IShipwreck";
import ShipwreckSmallDetail from "../components/shipwreckSmallDetail";
import DepthSmall from "../components/depthSmall";


const IndexPage: React.FC<PageProps> = () => {
    const data = useStaticQuery(graphql`
    query MyQuery {
      allDataCsv {
        nodes {
          Complete_Historic_Information_Link
          Depth
          Description
          Engines
          Hull_Material
          Lake
          Latitude
          Longitude
          Length
          Name_s_
          Official_Number
          Registry
          State_or_Province
          Underwater_Image_Path
          Vessel_Type
          Year_Built
          Width
          Year_Captured
          Year_Sank
          _3DModelUrl
          id
          url
          historicalImages
        }
      }
    }`)

    const [selectedShip, setSelectedShip] = useState<IShipwreck|null>(null);
    const [hoveredShipID, setHoveredShipID] = useState<string>("default value");


    useEffect(() => {
        console.log("hover:" + hoveredShipID)
    }, [hoveredShipID]);


    return (
        <div className={gridContainer}>
            <div className={gridItem}>
                <ShipwreckSmallDetail shipwreck={selectedShip} setSelectedShip={setSelectedShip}/>
            </div>
            <div className={gridItem}><DepthSmall shipwrecks={data.allDataCsv.nodes} setHoveredShipwreckID={setHoveredShipID} setSelectedShipwreck={setSelectedShip} hoveredShipID={hoveredShipID} selectedShip={selectedShip}/>
            </div>
            <div className={gridItem}>
                <ShipwreckMap shipwrecks={data.allDataCsv.nodes} setSelectedShip={setSelectedShip} setHoveredShipID={setHoveredShipID} hoveredShipID={hoveredShipID} selectedShip={selectedShip}></ShipwreckMap>
            </div>
            <div className={`${gridItem} ${fullWidth}`}>
                <TimelineSmall shipwrecks={data.allDataCsv.nodes} setHoveredShipwreckID={setHoveredShipID} setSelectedShipwreck={setSelectedShip} hoveredShipID={hoveredShipID} selectedShip={selectedShip}/>
            </div>
        </div>
    )
}

export default IndexPage

export const Head: HeadFC = () => <title>Shipwrecks</title>
