import * as React from "react"
import {graphql, HeadFC, PageProps, useStaticQuery} from "gatsby"



const ShipPage: React.FC<PageProps> = () => {



    return (
       <h1>Hello this is the ship page</h1>
    )
}

export default ShipPage

export const Head: HeadFC = () => <title>Shipwrecks</title>
