import { Manipulator, ManipulatorConditions } from "../make_rules";

export interface DeviceIdentifiers {
    vendor_id: number;
    product_id: number;
}

let conditionDeviceMap = {
    barocco: {
        vendor_id: 1241,
        product_id: 323,
    },
    apple: {
        vendor_id: 1452,
        product_id: 629,
    },
};

let toConditionDevice = (condition): ManipulatorConditions => {
    if (conditionDeviceMap[condition]) {
        return {
            type: "device_if",
            identifiers: [conditionDeviceMap[condition]],
        };
    }
    if (
        condition.match(/^!/) &&
        conditionDeviceMap[condition.replace(/^!/, "")]
    ) {
        return {
            type: "device_unless",
            identifiers: [conditionDeviceMap[condition.replace(/^!/, "")]],
        };
    }
    throw new Error(`Unknown ConditionDevice "${condition}"`);
};

export function device(manip: Manipulator): Manipulator {
    if (!manip[":device"]) {
        return manip;
    }
    manip.conditions = (manip.conditions || []).concat(
        toConditionDevice(manip[":device"])
    );
    delete manip[":device"];
    return manip;
}
