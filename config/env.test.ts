describe("Environment Configuration", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("exports NEXT_PUBLIC_API_URL from process.env", async () => {
    process.env.NEXT_PUBLIC_API_URL = "https://swapi.dev/api";

    const env = (await import("./env")).default;

    expect(env.NEXT_PUBLIC_API_URL).toBe("https://swapi.dev/api");
  });

  it("uses default value when NEXT_PUBLIC_API_URL is not set", async () => {
    const originalValue = process.env.NEXT_PUBLIC_API_URL;
    delete process.env.NEXT_PUBLIC_API_URL;
    jest.resetModules();

    const env = (await import("./env")).default;

    expect(env.NEXT_PUBLIC_API_URL).toBe("https://swapi.dev/api");

    process.env.NEXT_PUBLIC_API_URL = originalValue;
  });
});
