import type { Machine } from "./types";

export const machines: Machine[] = [
  ["laptop01", "Laptop01", "DESKTOP-5C3NIQO", "HP ProBook x360 435 G8"],
  ["laptop02", "Laptop02", "DESKTOP-RHHL0GI", "Lenovo ThinkPad L480"],
  ["laptop03", "Laptop03", "DESKTOP-1M0IVQE", "Toshiba Satellite L850D"],
  ["laptop04", "Laptop04", "DESKTOP-T011TJ5", "HP ProBook 4230s"],
  ["laptop05", "Laptop05", "DESKTOP-KTB33OI", "Toshiba Tecra P11"],
  ["laptop06", "Laptop06", "DESKTOP-BRCVC4U", "Toshiba Satellite L630"],
  ["laptop07", "Laptop07", "DESKTOP-KBETS0I", "ASUS X553MA"],
  ["laptop08", "Laptop08", "DESKTOP-6VO4N54", "Toshiba Satellite C50D-A"],
  ["laptop09", "Laptop09", "DESKTOP-43NG4PS", "Compaq Presario CQ56"],
  ["laptop10", "Laptop10", "DESKTOP-MMR0H5N", "Compaq 610"],
  ["laptop11", "Laptop11", "DESKTOP-CD1U980", "HP ProBook (#11)"],
  ["jparrisdesktop", "JParrisDesktop", "JPARRISDESKTOP", "DadLAN LANCommander server / gaming desktop"],
].map(([id, name, hostname, model]) => ({
  id,
  name,
  hostname,
  model,
  mountPath: `/mnt/dadlan/${name}`,
}));

export function getMachine(id: string) {
  return machines.find((machine) => machine.id === id);
}
