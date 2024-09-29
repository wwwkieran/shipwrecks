import * as React from "react";
import IShipwreck from "../types/IShipwreck";

type ShipwreckSmallDetailProps = {
        shipwreck: IShipwreck | null,
        setSelectedShip: (arg0: IShipwreck | null) => void,

}

const ShipwreckSmallDetail: React.FC<ShipwreckSmallDetailProps> = (props) => {
        if (props.shipwreck === null) {
                return (<div>
                        <h2>No shipwreck selected</h2>
                </div>)
        }
        return (
            <div style={{overflowY: "auto", maxHeight: "100%"}}>
                    <h5 style={{color: "red", cursor: "pointer"}} onClick={() => {props.setSelectedShip(null)}}> Clear selection</h5>
                    <h1>{props.shipwreck.Ship}</h1>
                    <h3>id</h3>
                    <p>{props.shipwreck.id}</p>
                    <h3>imgPath</h3>
                    <p>{props.shipwreck.imgPath}</p>
                    <h3>Dataset</h3>
                    <p>{props.shipwreck.Dataset}</p>
                    <h3>Depth</h3>
                    <p>{props.shipwreck.Depth}</p>
                    <h3>ImgPath\_\_3d</h3>
                    <p>{props.shipwreck.ImgPath__3d}</p>
                    <h3>Destination\_Port</h3>
                    <p>{props.shipwreck.Destination_Port}</p>
                    <h3>Lake</h3>
                    <p>{props.shipwreck.Lake}</p>
                    <h3>ImgPath\_\_Historical\_other</h3>
                    <p>{props.shipwreck.ImgPath__Historical_other}</p>
                    <h3>Latitude</h3>
                    <p>{props.shipwreck.Latitude}</p>
                    <h3>Length</h3>
                    <p>{props.shipwreck.Length}</p>
                    <h3>Longitude</h3>
                    <p>{props.shipwreck.Longitude}</p>
                    <h3>Origin\_Port</h3>
                    <p>{props.shipwreck.Origin_Port}</p>
                    <h3>Site\_Description</h3>
                    <p>{props.shipwreck.Site_Description}</p>
                    <h3>Vessel\_Type</h3>
                    <p>{props.shipwreck.Vessel_Type}</p>
                    <h3>Year\_Built</h3>
                    <p>{props.shipwreck.Year_Built}</p>
                    <h3>Year\_Sank</h3>
                    <p>{props.shipwreck.Year_Sank}</p>
            </div>
        )
}

export default ShipwreckSmallDetail