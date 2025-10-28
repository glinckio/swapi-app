import { render, screen } from "@testing-library/react";
import NotFound from "./not-found";

describe("NotFound Page", () => {
  it("renders 404 heading", () => {
    render(<NotFound />);

    const heading = screen.getByText("404");
    expect(heading).toBeInTheDocument();
  });

  it("renders planet not found message", () => {
    render(<NotFound />);

    const message = screen.getByText(/Planet not found/i);
    expect(message).toBeInTheDocument();
  });

  it("renders description text", () => {
    render(<NotFound />);

    const description = screen.getByText(
      /This planet seems to have disappeared into the void/i
    );
    expect(description).toBeInTheDocument();
  });

  it("renders return to home button with correct link", () => {
    render(<NotFound />);

    const homeButton = screen.getByRole("link", {
      name: /Return to Home Planet/i,
    });
    expect(homeButton).toHaveAttribute("href", "/");
  });

  it("renders explore planets button with correct link", () => {
    render(<NotFound />);

    const exploreButton = screen.getByRole("link", {
      name: /Explore Other Planets/i,
    });
    expect(exploreButton).toHaveAttribute("href", "/planets");
  });

  it("renders galaxy map link in footer", () => {
    render(<NotFound />);

    const galaxyMapLink = screen.getByRole("link", { name: /galaxy map/i });
    expect(galaxyMapLink).toHaveAttribute("href", "/");
  });

  it("has correct page structure with card", () => {
    const { container } = render(<NotFound />);

    // Check if card exists (shadcn card component)
    const card = container.querySelector('[data-slot="card"]');
    expect(card).toBeInTheDocument();
  });

  it("renders all interactive elements", () => {
    render(<NotFound />);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(3); // Home button, Explore button, galaxy map link
  });
});
