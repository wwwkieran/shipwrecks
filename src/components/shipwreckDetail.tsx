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
import { motion } from "framer-motion";


type ShipwreckDetailProps = {
    shipwreck: IShipwreck | null,
    setSelectedShip: (arg0: IShipwreck | null) => void,
    expanded: boolean,
    setExpandedArea: (arg0: string) => void,
}

const ShipwreckDetail: React.FC<ShipwreckDetailProps> = (props) => {
    const [index, setIndex] = React.useState(0);
    const [numHistoricalImages, setNumHistoricalImages] = React.useState(0);
    const [isGalleryExpanded, setIsGalleryExpanded] = React.useState(false);
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
            let images = []
            try {
                images = JSON.parse(props.shipwreck.historicalImages).length
            } catch (e) {
                console.log("couldn't parse")
            }
            setNumHistoricalImages(images)
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

                <motion.div
                    className={descDiv}
                    style={{
                        cursor: "pointer"
                    }}
                    animate={{
                        marginLeft: "auto",
                        display: numHistoricalImages > 0 ? "block" : "none",
                        // position: isGalleryExpanded ? "fixed" : "relative",
                        // top: isGalleryExpanded ? 0 : "auto",
                        // left: isGalleryExpanded ? 0 : "auto",
                        width: isGalleryExpanded ? "30vw" : "300px",
                        maxHeight: isGalleryExpanded ? "80vh" : "30vh",
                        zIndex: isGalleryExpanded ? 1000 : "auto",
                    }}
                    onClick={() => setIsGalleryExpanded(!isGalleryExpanded)}
                >
                    {
                        numHistoricalImages > 0 && JSON.parse(props.shipwreck.historicalImages).map((v: IHistoricalImage, index: number) => (
                            <img key={index} src={`/historical/${v.fileName}.jpeg`} alt="shipwreck" className={galleryImage} style={{width: "100%"}} />
                        ))}
                </motion.div>


                <div className={descDiv} style={{maxWidth:500,  display: isGalleryExpanded ? "none" : "block",
                }}>{props.shipwreck.Summary}</div>
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
}

export default ShipwreckDetail;