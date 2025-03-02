import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import axios from "axios";
import { RepoList } from "../pages/RepoList";

vi.mock("axios");

describe("RepoList Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("loader before fetching data", async () => {
    render(<RepoList />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("renders error state when fetch fails", async () => {
    vi.spyOn(axios, "get").mockRejectedValue(new Error("Failed to fetch"));
    render(<RepoList />);
    await waitFor(() =>
      expect(screen.getByTestId("error-state")).toBeInTheDocument()
    );
  });

  it("displays 'No repositories found' when there are no repos", async () => {
    vi.spyOn(axios, "get").mockResolvedValue({ data: [] });
    render(<RepoList />);
    await waitFor(() =>
      expect(screen.getByText("No repositories found.")).toBeInTheDocument()
    );
  });
});
