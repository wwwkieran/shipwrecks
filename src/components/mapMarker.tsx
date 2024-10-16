import * as React from "react";
import { motion } from "framer-motion";
import { Tooltip as ReactTooltip } from 'react-tooltip'
import IShipwreck from "../types/IShipwreck";

type MapMarkerProps = {
    selected: boolean,
    hovered: boolean,
    scale: number,
    shipwreck: IShipwreck,
    setHoveredShipID: (arg0: string) => void,
    numDied: number,
    scaleByNumDied: boolean,
}

const MapMarker: React.FC<MapMarkerProps> = (props: MapMarkerProps) => {
    const baseSize = props.scale * 20;
    const circleSize = props.scaleByNumDied ? (props.numDied > 0 ? baseSize * Math.log(props.numDied + 1) : baseSize) : baseSize;
    const opacity = props.selected ? 0.8 : (props.hovered ? 0.6 : 0.3);
    const boxShadow = props.selected ? "0 0 10px 5px rgba(0, 0, 255, 0.5)" : (props.hovered ? "0 0 5px 2px rgba(0, 0, 255, 0.3)" : "none");
    const strokeWidth = props.selected ? 3 : (props.hovered ? 0.6 : 0.3);

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }} exit={{ opacity: 0 }}
                animate={{ opacity }}
                transition={{ type: "spring", duration: 0.4, bounce: 0.6 }}
                onMouseEnter={() => { props.setHoveredShipID(props.shipwreck.id) }}
                onMouseLeave={() => { props.setHoveredShipID("") }}
                style={{ position: "relative", width: circleSize, height: circleSize }}
                data-tooltip-id={"tooltip"}
                data-tooltip-content={props.shipwreck.Name_s_}
            >
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: circleSize,
                        height: circleSize,
                        backgroundColor: "rgba(0, 0, 255, 0.3)",
                        borderRadius: "50%",
                        transform: "translate(-50%, -50%)",
                        cursor: "pointer",
                        boxShadow,
                        strokeWidth,
                        stroke: "solid white"
                    }}
                />
            </motion.div>
        </>
    )
}

export default MapMarker;