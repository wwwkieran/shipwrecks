import * as React from "react";
// @ts-ignore
import { motion } from "framer-motion";
import IShipwreck from "../types/IShipwreck";



type MapMarkerProps = {
    selected: boolean,
    scale: number,
    shipwreck: IShipwreck,
}

const MapMarker: React.FC<MapMarkerProps> = (props: MapMarkerProps) => {

    let emoji = "⚓️️"
    // if (props.emoji !== "") {
    //     emoji = Array.from(props.emoji)[0]
    // }
    return (<motion.div initial={{scale: 0}} exit={{scale: 0}} animate={{scale: props.selected ? 1.5*props.scale : props.scale}} transition={{type: "spring", duration: 0.4, bounce: 0.6}}>
    {/*<BaseMarker style={{position: "absolute", top: "0px", left: "-5px", width: "20px"}}></BaseMarker>*/}
    <p style={{position: "absolute", top: "0px", left: "-8px", margin: "0px", filter: props.selected ? "brightness(65%)" : "", cursor: "pointer", opacity: 1}}>{emoji}</p>
    </motion.div>)
}

export default MapMarker