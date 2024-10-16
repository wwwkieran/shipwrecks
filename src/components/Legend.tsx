import * as React from "react";
import SmallMapMarker from "./smallMapMarker";

type LegendProps = {
    scale: number,
}

const Legend: React.FC<LegendProps> = ({ scale }) => {
    const baseSize = scale * 15;

    const calculateCircleSize = (numDied: number) => {
        return numDied > 0 ? baseSize * Math.log(numDied + 1) : baseSize;
    };

    const sizes = [
        { label: "0", size: calculateCircleSize(0) },
        { label: "10", size: calculateCircleSize(10) },
        { label: "100", size: calculateCircleSize(100) },
    ];

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "20px", marginTop: "35px" }}>
            <div style={{ position: "relative", width: calculateCircleSize(100), height: calculateCircleSize(100), marginRight: "20px" }}>
                {sizes.map((item, index) => (
                    <div key={index} style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: item.size,
                        height: item.size,
                        backgroundColor: "rgba(0, 0, 255, 0.3)",
                        borderRadius: "50%"
                    }}>
                        <span style={{
                            position: "absolute",
                            right: "100%",
                            top: "50%",
                            transform: "translateY(-55%)",
                            fontSize: "10px",
                            whiteSpace: "nowrap"
                        }}>{item.label}</span></div>
                ))}
                <span style={{
                    position: "absolute",
                    bottom: "110%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontSize: "10px"
                }}>Deaths</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", top: "50%", transform: "translateY(-50%)" }}>
                <span style={{ marginBottom: "5px", fontSize: "10px" }}>Unexplored Shipwreck</span>
                <SmallMapMarker scale={scale} />
            </div>
        </div>
    );
};

export default Legend;