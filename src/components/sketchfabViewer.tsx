import React, { useEffect, useRef, useState } from "react";
import IShipwreck from "../types/IShipwreck";
// @ts-ignore
import Sketchfab from "@sketchfab/viewer-api"
import {CircularProgress} from "@nextui-org/react";

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
    const [loading, setLoading] = useState(true)
    const [api, setApi] = useState();

    const frame = (
        <iframe
            ref={iframeRef}
            title="sketchfab"
            frameBorder={0}
            style={{ height: "100%", width: "100%", outline: "none", display: loading ? "none" : "block" }}
        />
    );

    useEffect(() => {
        // Initialize the viewer
        setLoading(true)
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
            ui_controls: 0,
            ui_general_controls:0,
            ui_inspector: 0,
            camera: 0,
            ui_stop: 0,
        });
    }, [props.shipwreck]);

    useEffect(() => {
        if (api !== undefined) {
            setLoading(false)
            api.addEventListener('viewerready', function() {
                api.getCameraLookAt(function(err, camera) {
                    const pos = camera.position; // [x, y, z]
                    const target = camera.target; // [x, y, z]

                    api.getSceneGraph(function (err, result) {
                        if (err) {
                            console.log('Error getting nodes');
                            return;
                        }
                        console.log(result);
                        // pos[0] += -25
                        // pos[1] += -10
                        // pos[2] += -50
                        api.setCameraLookAt(pos, target, 3, function(err) {
                            if (!err) {
                                window.console.log('Camera moved');
                            }
                        });
                    });


                    // api.recenterCamera(function(err) {
                    //     if (!err) {
                    //         window.console.log('Camera recentered');
                    //     }
                    // });
                });
            });

            api.addEventListener(
                'click',
                function(info) {
                    api.getCameraLookAt(function(err, camera) {
                        window.console.log(camera.position); // [x, y, z]
                        window.console.log(camera.target); // [x, y, z]
                    });
                },
                { pick: 'slow' }
            );

        }
    }, [api]);

    // if (loading) {
    //     return (<div>
    //         {/*<CircularProgress color="default" aria-label="Loading..."/>*/}
    //     </div>)
    // } else {
    //     return iframe;
    // }
    return <div style={{ display: "flex", height: "100%", textAlign: "center"}}>
        {loading && <CircularProgress color="default" style={{ display: "block", marginLeft: "auto", marginRight: "auto", marginTop: "auto", marginBottom:"auto"}} aria-label="Loading..."/>}
        {frame}
    </div>
};