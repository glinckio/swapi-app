import Home from "./page";

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("Home Page", () => {
  it("redirects to planets page", () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { redirect } = require("next/navigation");
    Home();
    expect(redirect).toHaveBeenCalledWith("/planets");
  });
});
