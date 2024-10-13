import * as React from "react"
import { graphql, HeadFC, Link, PageProps } from "gatsby"
import IShipwreck from "../types/IShipwreck"
import IHistoricalImage from "../types/IHistoricalImage"
import { shipPage, shipName, iframeContainer, description, dataBox, gallery, galleryImage, backButton } from './ship.module.scss'
import {SketchfabViewer} from "../components/sketchfabViewer";

const ShipPage: React.FC<PageProps> = (props) => {
    // @ts-ignore
    const shipwreck: IShipwreck = props.data.dataCsv
    console.log(shipwreck.historicalImages)

    return (
        <div className={shipPage}>
            <button className={backButton} onClick={() => window.history.back()}>Back</button>
            <h1 className={shipName}>{shipwreck.Name_s_}</h1>
            <div className={dataBox}>
                <h2>Ship Data</h2>
                <div><strong>id:</strong> <span>{shipwreck.id}</span></div>
                <div><strong>Depth:</strong> <span>{shipwreck.Depth}</span></div>
                <div><strong>Lake:</strong> <span>{shipwreck.Lake}</span></div>
                <div><strong>Length:</strong> <span>{shipwreck.Length}</span></div>
                <div><strong>Vessel Type:</strong> <span>{shipwreck.Vessel_Type}</span></div>
                <div><strong>Year Built:</strong> <span>{shipwreck.Year_Built}</span></div>
                <div><strong>Year Sank:</strong> <span>{shipwreck.Year_Sank}</span></div>
            </div>
            <div className={iframeContainer}>
                <SketchfabViewer shipwreck={shipwreck}/>
            </div>

            <div className={description}>
                <strong>Description:</strong> <span>{shipwreck.Description}</span>
            </div>

            <div className={gallery}>
                <h2>Historical Images</h2>
                {JSON.parse(shipwreck.historicalImages).map((v: IHistoricalImage, index: number) => (
                    <img key={index} src={`/historical/${v.fileName}`} alt="shipwreck" className={galleryImage} />
                ))}
            </div>
        </div>
    )
}

export default ShipPage

export const query = graphql`
  query ($id: String) {
    dataCsv(id: {eq: $id}) {
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
`

export const Head: HeadFC<PageProps> = () => <title>Shipwreck</title>