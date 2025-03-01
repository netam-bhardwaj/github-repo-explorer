import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { RepoCard } from "../components/RepoCard";
import { Repo } from "../types/repo";

export const RepoList: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchRepos();
  }, []);

  const fetchRepos = async () => {
    try {
      const response = await axios.get<Repo[]>(
        "https://api.github.com/orgs/godaddy/repos"
      );
      setRepos(response.data);
    } catch (err) {
      setError("Failed to fetch repositories. Please try again later.");
      console.error("Error fetching repos:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredRepos = useMemo(() => {
    return repos.filter(
      (repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (repo.description &&
          repo.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [repos, searchQuery]);

  if (loading) {
    return (
      <div className="loader">
        <div className="spinner" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="home">
      <header className="header">
        <h1>GoDaddy's GitHub Repositories</h1>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search repositories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <div className="repo-list">
        {filteredRepos.length > 0 ? (
          filteredRepos.map((repo) => <RepoCard key={repo.id} repo={repo} />)
        ) : (
          <p className="no-results">No repositories found.</p>
        )}
      </div>
    </div>
  );
};
