import { render, screen } from "@testing-library/react";
import Home from "./page";

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, priority, ...props }: Record<string, unknown>) => {
    return (
      <img
        src={src as string}
        alt={alt as string}
        data-priority={priority}
        {...props}
      />
    );
  },
}));

describe("Home Page", () => {
  it("renders the main heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /to get started, edit the page.tsx file/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it("renders deploy button with correct link", () => {
    render(<Home />);

    const deployButton = screen.getByRole("link", { name: /Deploy Now/i });
    expect(deployButton).toHaveAttribute(
      "href",
      "https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    );
  });

  it("renders documentation button with correct link", () => {
    render(<Home />);

    const docButton = screen.getByRole("link", { name: /Documentation/i });
    expect(docButton).toHaveAttribute(
      "href",
      "https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    );
  });

  it("renders Next.js logo", () => {
    render(<Home />);

    const logo = screen.getByAltText("Next.js logo");
    expect(logo).toBeInTheDocument();
  });

  it("has correct page structure", () => {
    const { container } = render(<Home />);

    const main = container.querySelector("main");
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass("flex");
  });
});
