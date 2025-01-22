import { ManipulatorConditions } from "../make_rules";
import { condition_map } from "./libs/condition_map";

export interface DeviceIdentifiers {
  vendor_id: number;
  product_id: number;
}

let conditionDeviceMap = {
  barocco: {
    vendor_id: 1241,
    product_id: 323,
  },
  baroccoMD770BT: {
    vendor_id: 1241,
    product_id: 1049,
  },
  apple: {
    vendor_id: 1452,
    product_id: 629,
  },
  appleTouchbar: {
    vendor_id: 1452,
    product_id: 635,
  },
  appleTouchId: {
    vendor_id: 1452,
    product_id: 834,
  },
};

export const device = condition_map(
  ":device",
  (condition): ManipulatorConditions => {
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
  },
);
