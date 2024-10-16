import * as React from "react";
// @ts-ignore
import { motion } from "framer-motion";
import IShipwreck from "../types/IShipwreck";

type SmallMapMarkerProps = {
    scale: number,
}

const SmallMapMarker: React.FC<SmallMapMarkerProps> = (props: SmallMapMarkerProps) => {
    const baseSize = props.scale * 5;
    const opacity = 0.7

    return (
        <motion.div
            initial={{ opacity: 0 }} exit={{ opacity: 0 }}
            animate={{ opacity }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.6 }}
            style={{ position: "relative", width: baseSize, height: baseSize }}
            data-tooltip-id={"tooltip"}
            data-tooltip-content={"Unexplored Shipwreck"}
        >
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: baseSize,
                    height: baseSize,
                    backgroundColor: "rgba(36,36,37,0.3)",
                    borderRadius: "50%",
                    transform: "translate(-50%, -50%)",
                    cursor: "pointer",
                }}
            />
        </motion.div>
    )
}

export default SmallMapMarker;