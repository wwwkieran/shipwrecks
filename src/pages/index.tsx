import * as React from "react"
import {graphql, HeadFC, PageProps, useStaticQuery} from "gatsby"
import {useEffect, useState} from "react";
import ShipwreckMap from "../components/shipwreckMap";
import { gridContainer, gridItem, overlay, shipInfo, depth, timeline, globalContainer, title } from "./index.module.scss";
import TimelineSmall from "../components/timelineSmall";
import IShipwreck from "../types/IShipwreck";
import ShipwreckDetail from "../components/shipwreckDetail";
import DepthSmall from "../components/depthSmall";
import { motion } from "framer-motion";

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
    const [expandedArea, setExpandedArea] = useState<string>("");

    useEffect(() => {
        console.log("hover:" + hoveredShipID)
    }, [hoveredShipID]);

    return (
        <main className={globalContainer}>
            <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: "100%" }}>
                <ShipwreckMap shipwrecks={data.allDataCsv.nodes} setSelectedShip={setSelectedShip} setHoveredShipID={setHoveredShipID} hoveredShipID={hoveredShipID} selectedShip={selectedShip} />
                <div className={overlay}>
                    <div className={gridContainer}>
                        <div className={`${gridItem} top-left`}>
                            <h1 className={title}>Shipwreck Explorer</h1>
                        </div>
                        <motion.div className={shipInfo}  initial={{height: "100%"}} animate={{height: expandedArea === "ship" ? "96vh" : "100%" }}>
                            <ShipwreckDetail shipwreck={selectedShip} setSelectedShip={setSelectedShip} expanded={expandedArea === "ship"} setExpandedArea={(s) => {setExpandedArea(s)}}/>
                        </motion.div>
                        <motion.div className={depth} animate={{opacity: expandedArea === "" ? 1 : 0, display: expandedArea === "" ? "block" : "none",}}>
                            <DepthSmall shipwrecks={data.allDataCsv.nodes} setHoveredShipwreckID={setHoveredShipID} setSelectedShipwreck={setSelectedShip} hoveredShipID={hoveredShipID} selectedShip={selectedShip}/>
                        </motion.div>
                        <motion.div className={timeline}  animate={{
                            opacity: expandedArea === "" || expandedArea === "timeline" ? 1 : 0,
                            display: expandedArea === "" || expandedArea === "timeline" ? "block" : "none"}}>
                            <TimelineSmall shipwrecks={data.allDataCsv.nodes} setHoveredShipwreckID={setHoveredShipID} setSelectedShipwreck={setSelectedShip} hoveredShipID={hoveredShipID} selectedShip={selectedShip}/>
                        </motion.div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default IndexPage

export const Head: HeadFC = () => <title>Shipwrecks</title>