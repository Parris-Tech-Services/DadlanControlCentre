import type { IntegrationObservation } from "../types";

export type Action1Adapter = {
  listEndpoints: () => Promise<never>;
  getEndpointStatus: () => Promise<never>;
  getEndpointInventory: () => Promise<never>;
  runAutomation: () => Promise<never>;
  getAutomationStatus: () => Promise<never>;
};

export function action1Observation(): IntegrationObservation {
  return { state: "unavailable", label: "Not configured", observedAt: new Date().toISOString(), detail: "Action1 API credentials are not configured" };
}

export const action1Adapter: Action1Adapter = {
  async listEndpoints() { throw new Error("Action1 API is not configured"); },
  async getEndpointStatus() { throw new Error("Action1 API is not configured"); },
  async getEndpointInventory() { throw new Error("Action1 API is not configured"); },
  async runAutomation() { throw new Error("Action1 API is not configured"); },
  async getAutomationStatus() { throw new Error("Action1 API is not configured"); },
};
