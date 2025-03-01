import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RepoList } from "./pages/RepoList";
import { RepoDetail } from "./pages/RepoDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RepoList />} />
        <Route path="/repo/:repoName" element={<RepoDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
