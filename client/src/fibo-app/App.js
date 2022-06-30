import React, { useState } from "react";
import logo from "../images/fibo.png";
import "./App.css";

function App() {
  const [gitRepoStructure, setGitRepoStructure] = useState(null);
  const [githubOwner, setGithubOwner] = useState("");
  const [githubRepo, setGithubRepo] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldAlert, setFieldAlert] = useState(false);

  const getTreeStructure = () => {
    if (githubOwner.length === 0 || githubRepo.length === 0) {
      setFieldAlert(true);
      return;
    }
    setGitRepoStructure(null);
    setFieldAlert(false);
    setLoading(true);
    fetch(`/github/${githubOwner}/${githubRepo}`)
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status} because: ${res.statusText}`);
        else return res.json();
      })
      .then((data) => {
        setLoading(false);
        setGitRepoStructure(data.message);
      })
      .catch((e) => {
        setLoading(false);
        setGitRepoStructure(e.toString());
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="logo" />
        <span style={{ fontSize: "28px" }}>Github Public Repository Exercise</span>
      </header>
      <div className="get-repo-fields">
        <span style={{ fontSize: "20px" }}>Please enter the Github owner & repository name</span>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <div className="fields-row">
            <input
              className="input-field"
              type="text"
              value={githubOwner}
              placeholder="Github owner's name"
              onChange={(e) => setGithubOwner(e.target.value)}
              style={{ borderColor: fieldAlert && githubOwner.length === 0 ? "red" : "" }}
            />
            <input
              className="input-field"
              type="text"
              value={githubRepo}
              placeholder="Github repository's name"
              onChange={(e) => setGithubRepo(e.target.value)}
              style={{ borderColor: fieldAlert && githubRepo.length === 0 ? "red" : "" }}
            />
          </div>
          <button className="get-tree-button" onClick={getTreeStructure}>
            Get Tree Structure
          </button>
        </div>
      </div>
      <pre className="repo-structure">{loading ? "Loading..." : gitRepoStructure}</pre>
    </div>
  );
}

export default App;
