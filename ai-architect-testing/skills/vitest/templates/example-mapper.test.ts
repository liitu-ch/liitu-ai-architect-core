import { describe, it, expect } from "vitest";

// ─── Mapper / Adapter Tests ─────────────────────────────────────────
// Test data transformations between external formats and internal models.

interface SapCustomer {
  KUNNR: string;
  NAME1: string;
  ORT01: string;
}

interface Customer {
  id: string;
  name: string;
  city: string;
}

function mapSapCustomer(sap: SapCustomer): Customer {
  return {
    id: sap.KUNNR,
    name: sap.NAME1,
    city: sap.ORT01,
  };
}

describe("mapSapCustomer", () => {
  it("maps SAP fields to domain model", () => {
    const sapData: SapCustomer = {
      KUNNR: "0001000042",
      NAME1: "Muster AG",
      ORT01: "Zürich",
    };

    expect(mapSapCustomer(sapData)).toEqual({
      id: "0001000042",
      name: "Muster AG",
      city: "Zürich",
    });
  });

  it("handles empty strings", () => {
    const sapData: SapCustomer = {
      KUNNR: "",
      NAME1: "",
      ORT01: "",
    };

    expect(mapSapCustomer(sapData)).toEqual({
      id: "",
      name: "",
      city: "",
    });
  });
});
