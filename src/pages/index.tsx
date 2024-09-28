import * as React from "react"
import {graphql, HeadFC, PageProps, useStaticQuery} from "gatsby"


const IndexPage: React.FC<PageProps> = () => {
    const data = useStaticQuery(graphql`query MyQuery {
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

    console.log(data.allDataCsv.nodes)

    return (
        <div>
            {data.allDataCsv.nodes.map((i: any) => {
                return (<h1>{i.Ship}</h1>)
            })}
        </div>
    )
}

export default IndexPage

export const Head: HeadFC = () => <title>Shipwrecks</title>
