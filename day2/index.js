const fs = require("node:fs");

//read file

// const fileContent = fs.readFileSync("./hello.txt", "utf-8");
// console.log("file content:", fileContent);

fs.readFile("./hello.txt", "utf-8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  console.log("file content:", data);
});
