import * as Plot from "@observablehq/plot";
import React from "react";
import {LegacyRef, MutableRefObject, useEffect, useRef, useState} from "react";
import IShipwreck from "../types/IShipwreck";

type TimelineSmallProps = {
    shipwrecks: IShipwreck[]
    setHoveredShipwreckID: (arg0: string) => void,
    setSelectedShipwreckID: (arg0: string) => void,
}

const TimelineSmall: React.FC<TimelineSmallProps> = (props: TimelineSmallProps) => {
    const containerRef = useRef<HTMLDivElement>();
    const [data, setData] = useState<IShipwreck[]>();

    useEffect(() => {
        const data: any[] = []
        props.shipwrecks.forEach((shipwreck) => {
            const year = parseInt(shipwreck.Year_Sank)
            if (!isNaN(year) && year > 1800) {
                data.push({
                    id: shipwreck.id,
                    year: year
                })
            }
        })
        setData(data)
    }, [props.shipwrecks]);

    useEffect(() => {
        if (data === undefined) return;
        const plot = Plot.plot({
            width: containerRef.current?.offsetWidth, // Set the width to 100% of the container
            height: 100,
            x: {
                line: true,
                tickFormat: d => d.toString()
            },
            marks: [
                Plot.dotX(data, Plot.dodgeY({
                    x: "year",
                    sort: "year",
                    title: "name",
                    fill: "currentColor",
                })),
                Plot.dotX(data, Plot.pointer(Plot.dodgeY({
                    x: "year",
                    sort: "year",
                    title: "name",
                    fill: "red",
                })))
            ]
        });
        plot.addEventListener("input", (event) => {
            props.setHoveredShipwreckID(plot.value?.id || "");
        });
        // @ts-ignore
        containerRef.current.append(plot);
        return () => plot.remove();
    }, [data]);

    // @ts-ignore
    return (<div ref={containerRef}  style={{width: '100%'}}/>);
}

export default TimelineSmall