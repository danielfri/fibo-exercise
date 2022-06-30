const axios = require("axios");

async function getTreeRequest(treeUrl, tabCounter = 0) {
  try {
    let treeStructure = "";
    const response = await axios.get(treeUrl);
    const tree = response.data.tree;
    if (tree.length == 1 && tree[0].type === "tree") {
      treeStructure += `/${tree[0].path}`;
      treeStructure += await getTreeRequest(tree[0].url, tabCounter);
    } else {
      for (let node of tree) {
        treeStructure += `\n${"\t".repeat(tabCounter)}- ${node.path}`;
        if (node.type === "tree") {
          treeStructure += await getTreeRequest(node.url, tabCounter + 1);
        }
      }
    }
    return treeStructure.toString("base64");
  } catch (error) {
    throw error;
  }
}

module.exports = { getTreeRequest };
