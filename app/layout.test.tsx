import { render } from "@testing-library/react";
import RootLayout from "./layout";

describe("RootLayout", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>,
      { container: document.body }
    );

    expect(getByText("Test Content")).toBeInTheDocument();
  });
});
