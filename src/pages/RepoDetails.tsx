import React, { useMemo, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Repo } from "../types/repo";
import {
  Star,
  GitFork,
  Eye,
  GitBranch,
  AlertCircle,
  Clock,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import axios from "axios";

export const RepoDetail: React.FC = () => {
  const { state } = useLocation();
  const repo = state?.repo as Repo;
  const [languages, setLanguages] = useState<Record<string, number>>();

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const { data } = await axios.get<Record<string, number>>(
          repo.languages_url
        );
        setLanguages(data);
      } catch (err) {
        console.error("Error fetching languages:", err);
      }
    };

    if (repo) {
      fetchLanguages();
    }
  }, [repo]);

  const languageList = useMemo(() => {
    if (!languages) return;
    return Object.keys(languages).join(", ");
  }, [languages]);

  if (!repo) {
    return (
      <div className="error-state">
        <p>Repository data not found.</p>
        <Link to="/">Back to Repositories</Link>
      </div>
    );
  }

  const renderDetailsHeader = () => (
    <div className="repo-header-details">
      <div className="repo-header-details-left">
        <img
          src={repo.owner.avatar_url}
          alt={repo.owner.login}
          className="avatar"
        />
        <h1>{repo.full_name}</h1>
      </div>
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="github-link"
      >
        <span>View on GitHub</span>
        <ExternalLink size={16} />
      </a>
    </div>
  );

  const renderStatsSection = () => (
    <div className="stats-grid">
      <div className="stat-item">
        <Star size={20} />
        <h4>Stars</h4>
        <p>{repo.stargazers_count}</p>
      </div>
      <div className="stat-item">
        <GitFork size={20} />
        <h4>Forks</h4>
        <p>{repo.forks_count}</p>
      </div>
      <div className="stat-item">
        <Eye size={20} />
        <h4>Watchers</h4>
        <p>{repo.watchers_count}</p>
      </div>
      <div className="stat-item">
        <GitBranch size={20} />
        <h4>Default Branch</h4>
        <p>{repo.default_branch}</p>
      </div>
      <div className="stat-item">
        <AlertCircle size={20} />
        <h4>Open Issues</h4>
        <p>{repo.open_issues_count}</p>
      </div>
      <div className="stat-item">
        <Clock size={20} />
        <h4>Last Updated</h4>
        <p>{new Date(repo.updated_at).toLocaleDateString()}</p>
      </div>
    </div>
  );

  const renderRepoInfo = () => (
    <div className="repo-info-section">
      <h3>Description</h3>
      <p className="description">
        {repo.description || "No description available"}
      </p>

      <h3>Languages Used</h3>
      {languageList && <span>{languageList}</span>}
    </div>
  );

  return (
    <div>
      <div className="back-link">
        <ArrowLeft style={{ color: "gray" }} />
        <Link to="/" style={{ color: "gray" }}>
          Back to Repositories
        </Link>
      </div>
      <div className="repo-detail">
        {renderDetailsHeader()}
        <div className="repo-info">
          {renderRepoInfo()}
          {renderStatsSection()}
        </div>
      </div>
    </div>
  );
};
