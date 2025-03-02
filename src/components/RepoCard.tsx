import { Link } from "react-router-dom";
import { Repo } from "../types/repo";
import { Star, GitFork, Eye } from "lucide-react";

interface RepoCardProps {
  repo: Repo;
}

export const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
  return (
    <Link
      to={`/repo/${repo.name}`}
      state={{ repo }}
      className="repo-card"
      aria-label={`View details of ${repo.name}`}
    >
      <div className="repo-header">
        <img
          src={repo.owner.avatar_url}
          alt={repo.owner.login}
          className="avatar"
        />
        <div>
          <h3>{repo.name}</h3>
          <small>
            Created: {new Date(repo.created_at).toLocaleDateString()}
          </small>
        </div>
      </div>
      <p className="description">{repo.description || "No description"}</p>
      <div className="repo-stats">
        <div className="stat-item">
          <Star size={16} />
          <span>{repo.stargazers_count}</span>
        </div>
        <div className="stat-item">
          <GitFork size={16} />
          <span>{repo.forks_count}</span>
        </div>
        <div className="stat-item">
          <Eye size={16} />
          <span>{repo.watchers_count}</span>
        </div>
      </div>
    </Link>
  );
};
