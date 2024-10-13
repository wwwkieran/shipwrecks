import * as React from "react";
import IShipwreck from "../types/IShipwreck";
import {Layer} from "react-map-gl";
import {Link} from "gatsby";
import { gridLayout, shipName, textContainer, bottomButton } from './shipwreckDetail.module.scss'
import {SketchfabViewer} from "./sketchfabViewer";
import { Button } from "@nextui-org/react";
import exp from "node:constants";


type ShipwreckDetailProps = {
    shipwreck: IShipwreck | null,
    setSelectedShip: (arg0: IShipwreck | null) => void,
    expanded: boolean,
    setExpandedArea: (arg0: string) => void,
}

const ShipwreckDetail: React.FC<ShipwreckDetailProps> = (props) => {
    if (props.shipwreck === null) {
        return (
            <div style={{display: "flex", height: "100%"}}>
                <h3 style={{margin: "auto", marginTop: "auto", marginBottom: "auto"}}>Choose a shipwreck to begin</h3>
            </div>
        );
    }

    return (
        <div className={gridLayout}>
            <div className="modelContainer">
                <SketchfabViewer shipwreck={props.shipwreck}/>
            </div>
            <div className={textContainer}>
                <Button size={"sm"} radius={"full"} variant={"ghost"} onClick={() => {
                    props.setSelectedShip(null)
                }}>Clear Selection</Button>
                <h2 className={shipName}>{props.shipwreck.Name_s_}</h2>
            </div>
            <div className={bottomButton} onClick={() => {
                if (props.expanded) {
                    props.setExpandedArea("")
                } else {
                    props.setExpandedArea("ship")
                }
            }}>
                {props.expanded ? "close" : "expand"}
            </div>
        </div>
    );

        // return (
        //     <div style={{overflowY: "auto", maxHeight: "100%"}}>
        //         <div style={{ overflowY: "auto", maxHeight: "100%" }}>
        //             <h5 style={{ color: "red", cursor: "pointer" }} onClick={() => { props.setSelectedShip(null) }}> Clear selection</h5>
        //             <h1>{props.shipwreck.Name_s_}</h1>
        //             <div>
        //                 <Link to={`/ships/${props.shipwreck.id}`}>
        //                 <strong>id:</strong> <span>{props.shipwreck.id}</span>
        //                 </Link>
        //             </div>
        //             <div>
        //                 <strong>Depth:</strong> <span>{props.shipwreck.Depth}</span>
        //             </div>
        //             <div>
        //                 <strong>Lake:</strong> <span>{props.shipwreck.Lake}</span>
        //             </div>
        //             <div>
        //                 <strong>Length:</strong> <span>{props.shipwreck.Length}</span>
        //             </div>
        //             <div>
        //                 <strong>Site_Description:</strong> <span>{props.shipwreck.Description}</span>
        //             </div>
        //             <div>
        //                 <strong>Vessel_Type:</strong> <span>{props.shipwreck.Vessel_Type}</span>
        //             </div>
        //             <div>
        //                 <strong>Year_Built:</strong> <span>{props.shipwreck.Year_Built}</span>
        //             </div>
        //             <div>
        //                 <strong>Year_Sank:</strong> <span>{props.shipwreck.Year_Sank}</span>
        //             </div>
        //             <div>
        //                 <img src={props.shipwreck.Underwater_Image_Path} alt="shipwreck" style={{ width: "100%" }} />
        //             </div>
        //         </div>
        //     </div>
        // )
}

export default ShipwreckDetail