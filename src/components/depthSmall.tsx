import * as Plot from "@observablehq/plot";
import React from "react";
import {LegacyRef, MutableRefObject, useEffect, useRef, useState} from "react";
import IShipwreck from "../types/IShipwreck";
import getShipID from "../lib/getShipID";

type DepthSmallProps = {
    shipwrecks: IShipwreck[]
    setHoveredShipwreckID: (arg0: string) => void,
    setSelectedShipwreck: (arg0: IShipwreck | null) => void,
    selectedShip: IShipwreck | null
    hoveredShipID: string
}

const DepthSmall: React.FC<DepthSmallProps> = (props: DepthSmallProps) => {
    const containerRef = useRef<HTMLDivElement>();
    const [data, setData] = useState<{shipwreck: IShipwreck, depth: number}[]>();
    const [userIsCurrentlyInteracting, setUserIsCurrentlyInteracting] = useState<boolean>(false);
    const [externalHoveredShipID, setExternalHoveredShipID] = useState<string>("");
    // const [externalSelectedShipID, setExternalSelectedShipID] = useState<string>("");

    useEffect(() => {
        const data: any[] = []
        props.shipwrecks.forEach((shipwreck) => {
            const depth_str = shipwreck.Depth.replace('ft', '').replace('\'', '').trim()
            const depth = parseInt(depth_str)
            if (!isNaN(depth)) {
                data.push({
                    shipwreck: shipwreck,
                    depth: depth
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
            height: containerRef.current?.clientHeight,
            y: {
                reverse: true,
                line: true,
            },
            marks: [
                Plot.ruleY([props.hoveredShipID], {
                    y: d => data.find(ship => ship.shipwreck.id === d)?.depth,
                    stroke: "blue",
                    strokeWidth: 10,
                    opacity: 0.1
                }),
                Plot.ruleY([props.selectedShip?.id], {
                    y: d => data.find(ship => ship.shipwreck.id === d)?.depth,
                    stroke: "blue",
                    strokeWidth: 3,
                    opacity: 0.5
                }),
                Plot.dotY(data, Plot.dodgeX({
                    y: "depth",
                    sort: "depth",
                    title: "name",
                    fill: d => (d.shipwreck.id === props.hoveredShipID || d.id === getShipID(props.selectedShip)) ? "blue" : "currentColor",
                    stroke: d => d.shipwreck.id === getShipID(props.selectedShip) ? "white" : "none",
                })),
                Plot.dotY(data, Plot.pointer(Plot.dodgeX({
                    y: "depth",
                    sort: "depth",
                    title: "name",
                    fill: "blue",
                }))),
                Plot.ruleY(data, Plot.pointer(Plot.dodgeX({
                    y: "depth",
                    stroke: "blue",
                    strokeWidth: 10,
                    opacity: 0.1
                }))),
                Plot.tip(data, Plot.pointer(Plot.dodgeX({
                    y: "depth",
                    title: d => d.shipwreck.Name_s_,
                    opacity: 0.8,
                    // fill: "black",
                    // stroke: "white",
                    // color: "white"
                }))),
            ]
        });
        plot.addEventListener("input", (event) => {
            if (plot.value?.shipwreck !== undefined) {
                setUserIsCurrentlyInteracting(true);
                props.setHoveredShipwreckID(plot.value.shipwreck.id);
            } else {
                setUserIsCurrentlyInteracting(false);
                props.setHoveredShipwreckID("");
            }
        });
        plot.addEventListener("mousedown", (event) => {
            if (plot.value?.shipwreck !== undefined) {
                setUserIsCurrentlyInteracting(true);
                props.setSelectedShipwreck(plot.value.shipwreck);
            } else {
                setUserIsCurrentlyInteracting(false);
                props.setSelectedShipwreck(null);
            }
        });
        // @ts-ignore
        containerRef.current.append(plot);
        return () => plot.remove();
    }, [data, externalHoveredShipID, props.selectedShip]);

    // @ts-ignore
    return (<div ref={containerRef}  style={{width: '100%', height: '100%'}}/>);
}

export default DepthSmall