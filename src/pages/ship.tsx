import * as React from "react"
import {graphql, HeadFC, Link, PageProps, useStaticQuery} from "gatsby"
import IShipwreck from "../types/IShipwreck";
import IHistoricalImage from "../types/IHistoricalImage";



const ShipPage: React.FC<PageProps> = (props) => {
   // @ts-ignore
    const shipwreck: IShipwreck = props.data.dataCsv
    console.log(shipwreck.historicalImages)

    return (
        <div style={{overflowY: "auto", maxHeight: "100%"}}>
            <div style={{overflowY: "auto", maxHeight: "100%"}}>

                <h1>{shipwreck.Name_s_}</h1>
                <div>
                    <iframe width={600} height={600} src={shipwreck._3DModelUrl} />
                </div>
                <div>
                    <Link to={`/ships/${shipwreck.id}`}>
                        <strong>id:</strong> <span>{shipwreck.id}</span>
                    </Link>
                </div>
                <div>
                    <strong>Depth:</strong> <span>{shipwreck.Depth}</span>
                </div>
                <div>
                    <strong>Lake:</strong> <span>{shipwreck.Lake}</span>
                </div>
                <div>
                    <strong>Length:</strong> <span>{shipwreck.Length}</span>
                </div>
                <div>
                    <strong>Site_Description:</strong> <span>{shipwreck.Description}</span>
                </div>
                <div>
                    <strong>Vessel_Type:</strong> <span>{shipwreck.Vessel_Type}</span>
                </div>
                <div>
                    <strong>Year_Built:</strong> <span>{shipwreck.Year_Built}</span>
                </div>
                <div>
                    <strong>Year_Sank:</strong> <span>{shipwreck.Year_Sank}</span>
                </div>
                <div>
                    <img src={`/underwater/${shipwreck.Underwater_Image_Path}`} alt="shipwreck" style={{width: "300px"}}/>
                </div>

                {JSON.parse(shipwreck.historicalImages).map((v: IHistoricalImage) => {
                    return  <img src={`/historical/${v.fileName}`} alt="shipwreck" style={{width: "300px"}}/>
                }) }
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
export const Head: HeadFC<PageProps> = () => <title> shipwreck </title>



