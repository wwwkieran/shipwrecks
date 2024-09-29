import * as Plot from "@observablehq/plot";
import React from "react";
import {LegacyRef, MutableRefObject, useEffect, useRef, useState} from "react";
import IShipwreck from "../types/IShipwreck";

type TimelineSmallProps = {
    shipwrecks: IShipwreck[]
    setHoveredShipwreckID: (arg0: string) => void,
    setSelectedShipwreckID: (arg0: string) => void,
    selectedShipID: string
    hoveredShipID: string
}

const TimelineSmall: React.FC<TimelineSmallProps> = (props: TimelineSmallProps) => {
    const containerRef = useRef<HTMLDivElement>();
    const [data, setData] = useState<IShipwreck[]>();
    const [userIsCurrentlyInteracting, setUserIsCurrentlyInteracting] = useState<boolean>(false);
    const [externalHoveredShipID, setExternalHoveredShipID] = useState<string>("");
    // const [externalSelectedShipID, setExternalSelectedShipID] = useState<string>("");

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
        if (!userIsCurrentlyInteracting) {
            setExternalHoveredShipID(props.hoveredShipID)
        }
    }, [props.hoveredShipID]);

    // useEffect(() => {
    //     // if (!userIsCurrentlyInteracting) {
    //         setExternalSelectedShipID(props.selectedShipID)
    //     // }
    // }, [props.selectedShipID]);


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
                    fill: d => (d.id === props.hoveredShipID || d.id === props.selectedShipID) ? "red" : "currentColor",
                    stroke: d => d.id === props.selectedShipID ? "white" : "none",
                })),
                Plot.dotX(data, Plot.pointer(Plot.dodgeY({
                    x: "year",
                    sort: "year",
                    title: "name",
                    fill: "red",
                }))),
            ]
        });
        plot.addEventListener("input", (event) => {
            if (plot.value?.id !== undefined) {
                setUserIsCurrentlyInteracting(true);
                props.setHoveredShipwreckID(plot.value?.id);
            } else {
                setUserIsCurrentlyInteracting(false);
                props.setHoveredShipwreckID("");
            }
        });
        plot.addEventListener("mousedown", (event) => {
            if (plot.value?.id !== undefined) {
                setUserIsCurrentlyInteracting(true);
                props.setSelectedShipwreckID(plot.value?.id);
            } else {
                setUserIsCurrentlyInteracting(false);
                props.setSelectedShipwreckID("");
            }
        });
        // @ts-ignore
        containerRef.current.append(plot);
        return () => plot.remove();
    }, [data, externalHoveredShipID, props.selectedShipID]);

    // @ts-ignore
    return (<div ref={containerRef}  style={{width: '100%'}}/>);
}

export default TimelineSmall