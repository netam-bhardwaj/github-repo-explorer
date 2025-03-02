import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import axios from "axios";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { RepoDetail } from "../pages/RepoDetails";
import { Repo } from "../types/repo";

vi.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockRepo: Repo = {
  id: 4967118,
  node_id: "MDEwOlJlcG9zaXRvcnk0OTY3MTE4",
  name: "gdapi-php",
  full_name: "godaddy/gdapi-php",
  private: false,
  owner: {
    login: "godaddy",
    avatar_url: "https://avatars.githubusercontent.com/u/1406546?v=4",
    html_url: "https://github.com/godaddy",
  },
  html_url: "https://github.com/godaddy/gdapi-php",
  description: "A PHP client for Go Daddy® REST APIs",
  fork: false,
  created_at: "2012-07-10T00:55:55Z",
  updated_at: "2023-01-28T18:03:32Z",
  pushed_at: "2014-02-18T00:28:39Z",
  homepage: null,
  size: 323,
  stargazers_count: 31,
  watchers_count: 30,
  language: "PHP",
  languages_url: "https://api.github.com/repos/godaddy/gdapi-php/languages",
  has_issues: true,
  has_projects: true,
  has_downloads: true,
  has_wiki: true,
  has_pages: false,
  forks_count: 15,
  open_issues_count: 2,
  forks: 15,
  open_issues: 2,
  watchers: 35,
  default_branch: "master",
  license: {
    key: "mit",
    name: "MIT License",
  },
};

const mockLanguages = {
  PHP: 1000,
  JavaScript: 500,
};

describe("RepoDetail", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders repository details when data is available", async () => {
    mockedAxios.get.mockResolvedValue({ data: mockLanguages });
    render(
      <MemoryRouter
        initialEntries={[
          { pathname: "/repo/gdapi-php", state: { repo: mockRepo } },
        ]}
      >
        <Routes>
          <Route path="/repo/:repoName" element={<RepoDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(mockRepo.full_name)).toBeInTheDocument();
      expect(screen.getByText(mockRepo.description ?? "")).toBeInTheDocument();
      expect(screen.getByText("PHP, JavaScript")).toBeInTheDocument();
    });

    expect(
      screen.getByText(mockRepo.stargazers_count.toString())
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockRepo.forks_count.toString())
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockRepo.watchers_count.toString())
    ).toBeInTheDocument();
    expect(screen.getByText(mockRepo.default_branch)).toBeInTheDocument();
    expect(
      screen.getByText(mockRepo.open_issues_count.toString())
    ).toBeInTheDocument();
    expect(
      screen.getByText(new Date(mockRepo.updated_at).toLocaleDateString())
    ).toBeInTheDocument();
  });

  it("displays error message when repository data is missing", () => {
    render(
      <MemoryRouter initialEntries={["/repo/gdapi-php"]}>
        <Routes>
          <Route path="/repo/:repoName" element={<RepoDetail />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Repository data not found.")).toBeInTheDocument();
    expect(screen.getByText("Back to Repositories")).toBeInTheDocument();
  });
});
