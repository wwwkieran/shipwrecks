import IShipwreck from "../types/IShipwreck";

export default function getShipID(shipwreck: IShipwreck | null): string {
    if (shipwreck === null) {
        return ""
    }
    return shipwreck.id
}