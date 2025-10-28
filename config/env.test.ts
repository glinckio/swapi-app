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

  it("returns undefined when NEXT_PUBLIC_API_URL is not set", async () => {
    delete process.env.NEXT_PUBLIC_API_URL;

    const env = (await import("./env")).default;

    expect(env.NEXT_PUBLIC_API_URL).toBeUndefined();
  });
});
