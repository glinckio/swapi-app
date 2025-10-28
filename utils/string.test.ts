import { isEmpty, isUnknown, displayValue, truncate } from "./string";

describe("string utilities", () => {
  describe("isEmpty", () => {
    it("returns true for empty string", () => {
      expect(isEmpty("")).toBe(true);
    });

    it("returns true for whitespace-only string", () => {
      expect(isEmpty("   ")).toBe(true);
    });

    it("returns false for non-empty string", () => {
      expect(isEmpty("hello")).toBe(false);
    });
  });

  describe("isUnknown", () => {
    it("returns true for 'unknown'", () => {
      expect(isUnknown("unknown")).toBe(true);
    });

    it("returns true for 'n/a'", () => {
      expect(isUnknown("n/a")).toBe(true);
    });

    it("returns false for valid value", () => {
      expect(isUnknown("valid")).toBe(false);
    });
  });

  describe("displayValue", () => {
    it("returns fallback for unknown values", () => {
      expect(displayValue("unknown")).toBe("N/A");
      expect(displayValue("n/a")).toBe("N/A");
    });

    it("returns custom fallback", () => {
      expect(displayValue("unknown", "Not specified")).toBe("Not specified");
    });

    it("returns value for known values", () => {
      expect(displayValue("valid")).toBe("valid");
    });
  });

  describe("truncate", () => {
    it("truncates long text", () => {
      expect(truncate("This is a long text", 10)).toBe("This is a ...");
    });

    it("does not truncate short text", () => {
      expect(truncate("short", 10)).toBe("short");
    });
  });
});
