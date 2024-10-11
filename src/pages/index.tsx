import * as React from "react"
import {graphql, HeadFC, PageProps, useStaticQuery} from "gatsby"
import {useEffect, useState} from "react";
import ShipwreckMap from "../components/shipwreckMap";
import { gridContainer, gridItem, overlay, shipInfo, depth, timeline } from "./index.module.scss";
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
        <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: "100%" }}>
            <ShipwreckMap shipwrecks={data.allDataCsv.nodes} setSelectedShip={setSelectedShip} setHoveredShipID={setHoveredShipID} hoveredShipID={hoveredShipID} selectedShip={selectedShip} />
            <div className={overlay}>
                <div className={gridContainer}>
                    <div className={`${gridItem} top-left`}>
                        Shipwreck Explorer
                    </div>
                    <div className={shipInfo}>
                        <ShipwreckSmallDetail shipwreck={selectedShip} setSelectedShip={setSelectedShip}/>
                    </div>
                    <div className={depth}>
                        <DepthSmall shipwrecks={data.allDataCsv.nodes} setHoveredShipwreckID={setHoveredShipID} setSelectedShipwreck={setSelectedShip} hoveredShipID={hoveredShipID} selectedShip={selectedShip}/>
                    </div>
                    <div className={timeline}>
                        <TimelineSmall shipwrecks={data.allDataCsv.nodes} setHoveredShipwreckID={setHoveredShipID} setSelectedShipwreck={setSelectedShip} hoveredShipID={hoveredShipID} selectedShip={selectedShip}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IndexPage

export const Head: HeadFC = () => <title>Shipwrecks</title>