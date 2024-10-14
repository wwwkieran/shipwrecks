import * as React from "react";
import IShipwreck from "../types/IShipwreck";
import {Layer} from "react-map-gl";
import {Link} from "gatsby";
import { gridLayout, shipName, textContainer, bottomButton, descDiv, galleryImage, infoContainers } from './shipwreckDetail.module.scss'
import {SketchfabViewer} from "./sketchfabViewer";
import { Button } from "@nextui-org/react";
import exp from "node:constants";
import IHistoricalImage from "../types/IHistoricalImage";
import {RowsPhotoAlbum} from "react-photo-album";
import "react-photo-album/rows.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import {useEffect} from "react";
import shipwreckMap from "./shipwreckMap";


type ShipwreckDetailProps = {
    shipwreck: IShipwreck | null,
    setSelectedShip: (arg0: IShipwreck | null) => void,
    expanded: boolean,
    setExpandedArea: (arg0: string) => void,
}

const ShipwreckDetail: React.FC<ShipwreckDetailProps> = (props) => {
    const [index, setIndex] = React.useState(0);
    const [numHistoricalImages, setNumHistoricalImages] = React.useState(0);
    let slides: any[] = []
    let photoComponents = (<></>)


    // useEffect(() => {
    //     if (props.shipwreck !== null) {
    //         slides = []
    //         JSON.parse(props.shipwreck.historicalImages).map((v: IHistoricalImage, index: number) => (
    //             // <img key={index} src={`/historical/${v.fileName}.jpeg`} alt="shipwreck" className={galleryImage} />
    //             slides.push({src: `/historical/${v.fileName}.jpeg`, width: 150, height: 150})
    //         ))
    //         photoComponents = (<><RowsPhotoAlbum
    //             photos={slides}
    //             targetRowHeight={150}
    //             onClick={({ index: current }) => setIndex(current)}
    //         />
    //
    //         <Lightbox
    //             index={index}
    //             slides={slides}
    //             open={index >= 0}
    //             close={() => setIndex(-1)}
    //         /></>)
    //     }
    //     console.log(slides)
    // }, [props.shipwreck]);

    useEffect(() => {
        if (props.shipwreck !== null) {
            setNumHistoricalImages(JSON.parse(props.shipwreck.historicalImages).length)
        }
    }, [props.shipwreck]);


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
                    if (props.expanded) {
                        props.setExpandedArea("")
                    }
                }}>Clear Selection</Button>
                <h2 className={shipName}>{props.shipwreck.Name_s_}</h2>
            </div>
            {props.expanded && (<div className={infoContainers}>

                <div className={descDiv} style={{marginLeft: "auto", display: numHistoricalImages > 0 ? "block" : "none" }}>
                    {
                        JSON.parse(props.shipwreck.historicalImages).map((v: IHistoricalImage, index: number) => (
                        <img key={index} src={`/historical/${v.fileName}.jpeg`} alt="shipwreck" className={galleryImage} />
                    ))}
                </div>


                <div className={descDiv} style={{maxWidth:500}}>{props.shipwreck.Summary}</div>
            </div>)}
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