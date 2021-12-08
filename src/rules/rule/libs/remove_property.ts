import { Manipulator } from "../../make_rules";

export function remove_property(
  name: string,
  callback: (manip: Manipulator, prop: string) => Manipulator
) {
  return (manip: Manipulator): Manipulator => {
    if (!manip[name]) {
      return manip;
    }
    manip = callback(manip, manip[name]);
    delete manip[name];
    return manip;
  };
}
