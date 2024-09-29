import * as React from "react"
import {graphql, HeadFC, PageProps, useStaticQuery} from "gatsby"
import {useState} from "react";
import ShipwreckMap from "../components/shipwreckMap";


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



    return (
        <div>
            <ShipwreckMap shipwrecks={data.allDataCsv.nodes} setSelectedShipID={setSelectedShipID}></ShipwreckMap>
        </div>
    )
}

export default IndexPage

export const Head: HeadFC = () => <title>Shipwrecks</title>
