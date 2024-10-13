import React, { useEffect, useRef, useState } from "react";
import IShipwreck from "../types/IShipwreck";
// @ts-ignore
import Sketchfab from "@sketchfab/viewer-api"

type SketchfabViewerProps = {
    shipwreck: IShipwreck,
}

function extractModelID(url: string): string | null {
    const regex = /\/models\/(.*?)\/embed/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

export const SketchfabViewer: React.FC<SketchfabViewerProps> = (props) => {
    // This ref will contain the actual iframe object
    const iframeRef = useRef(null);
    const [api, setApi] = useState();

    const iframe = (
        <iframe
            // We feed the ref to the iframe component to get the underlying DOM object
            ref={iframeRef}
            title="sketchfab"
            style={{ height: "100%", width: "100%" }}
        />
    );

    useEffect(() => {
            // Initialize the viewer
            let client = new Sketchfab(iframeRef.current);
            client.init(extractModelID(props.shipwreck._3DModelUrl), {
                success: setApi,
                error: () => {
                    console.log("Viewer error");
                },
                autostart: 1,
                autospin: 0.1,
                transparent: 1,
                ui_watermark: 0,
            });
        }, []);

    return iframe;
};