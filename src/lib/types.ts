export type ObservationState = "online" | "offline" | "mounted" | "unmounted" | "unavailable" | "unknown";

export type IntegrationObservation = {
  state: ObservationState;
  label: string;
  observedAt?: string;
  detail?: string;
};

export type StorageObservation = IntegrationObservation & {
  totalBytes?: number;
  usedBytes?: number;
  freeBytes?: number;
  readable?: boolean;
  source?: string;
};

export type Machine = {
  id: string;
  name: string;
  hostname: string;
  model: string;
  mountPath: string;
};

export type MachineSnapshot = Machine & {
  observations: {
    smb: StorageObservation;
    forgegrid: IntegrationObservation;
    meshcentral: IntegrationObservation & { consoleUrl?: string };
    action1: IntegrationObservation;
  };
  derived: {
    state: "reachable" | "partially-reachable" | "unreachable" | "unknown";
    label: string;
  };
};

export type IntegrationHealth = {
  key: "smb" | "forgegrid" | "meshcentral" | "action1" | "jenkins" | "lancommander";
  name: string;
  state: "healthy" | "degraded" | "unavailable" | "not-configured";
  detail: string;
};

export type FleetSnapshot = {
  generatedAt: string;
  machines: MachineSnapshot[];
  integrations: IntegrationHealth[];
};
