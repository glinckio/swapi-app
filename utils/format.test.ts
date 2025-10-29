import { formatNumber, extractIdFromUrl } from "./format";

describe("format utilities", () => {
  describe("formatNumber", () => {
    it("formats number with thousands separator", () => {
      const result = formatNumber("1000");
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(4);
    });

    it("returns original value for 'unknown'", () => {
      expect(formatNumber("unknown")).toBe("unknown");
    });

    it("returns original value for 'n/a'", () => {
      expect(formatNumber("n/a")).toBe("n/a");
    });
  });

  describe("extractIdFromUrl", () => {
    it("extracts ID from SWAPI URL", () => {
      expect(extractIdFromUrl("https://swapi.dev/api/planets/1/")).toBe("1");
      expect(extractIdFromUrl("https://swapi.dev/api/films/3/")).toBe("3");
    });

    it("extracts ID from URL with trailing slash", () => {
      expect(extractIdFromUrl("https://swapi.dev/api/planets/5/")).toBe("5");
    });
  });
});
