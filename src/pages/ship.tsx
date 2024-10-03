import * as React from "react"
import {graphql, HeadFC, Link, PageProps, useStaticQuery} from "gatsby"



const ShipPage: React.FC<PageProps> = (props) => {
   // @ts-ignore
    const shipwreck = props.data.dataCsv


    return (
        <div style={{overflowY: "auto", maxHeight: "100%"}}>
            <div style={{overflowY: "auto", maxHeight: "100%"}}>

                <h1>{shipwreck.Ship}</h1>
                <div>
                    <Link to={`/ships/${shipwreck.id}`}>
                        <strong>id:</strong> <span>{shipwreck.id}</span>
                    </Link>
                </div>
                <div>
                    <strong>Depth:</strong> <span>{shipwreck.Depth}</span>
                </div>
                <div>
                    <strong>Destination_Port:</strong> <span>{shipwreck.Destination_Port}</span>
                </div>
                <div>
                    <strong>Lake:</strong> <span>{shipwreck.Lake}</span>
                </div>
                <div>
                    <strong>Length:</strong> <span>{shipwreck.Length}</span>
                </div>
                <div>
                    <strong>Site_Description:</strong> <span>{shipwreck.Site_Description}</span>
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
                    <img src={shipwreck.imgPath} alt="shipwreck" style={{width: "100%"}}/>
                </div>
            </div>
        </div>
    )
}

export default ShipPage
export const query = graphql`
  query ($id: String) {
    dataCsv(id: {eq: $id}) {
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
`
export const Head: HeadFC<PageProps> = () => <title> shipwreck </title>



