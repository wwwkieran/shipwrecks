import * as React from "react"
import {graphql, HeadFC, PageProps, useStaticQuery} from "gatsby"



const ShipPage: React.FC<PageProps> = (props) => {


    return (
       <h1>Hello this is the ship page</h1>
    )
}

export default ShipPage
export const query = graphql`
  query ($id: String) {
    csv(id: {eq: $id}) {
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



