import { Manipulator, ManipulatorConditions } from "../../make_rules";
import { remove_property } from "./remove_property";

export function condition_map(
  name: string,
  mapper: (prop: string) => ManipulatorConditions
): (manip: Manipulator) => Manipulator {
  return remove_property(
    name,
    (manip: Manipulator, prop: string): Manipulator => {
      manip.conditions = (manip.conditions || []).concat(mapper(prop));
      return manip;
    }
  );
}
