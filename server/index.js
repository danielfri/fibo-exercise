const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const path = require("path");

const { getTreeRequest } = require("./utils");

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("/", (req, res) => {
  res.send("<h2>Hello this is fibo</h2>");
});

app.get("/github/:owner/:repository", async function (req, res) {
  const githubOwnerName = req.params.owner;
  const githubRepo = req.params.repository;

  try {
    const ans = await getTreeRequest(`https://api.github.com/repos/${githubOwnerName}/${githubRepo}/git/trees/master`);
    res.send({ message: ans });
  } catch (e) {
    const statusCode = e.response?.status || 404;
    const statusText = e.response?.statusText || "Error";
    res.statusMessage = statusText;
    res.status(statusCode).end();
  }
});

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
