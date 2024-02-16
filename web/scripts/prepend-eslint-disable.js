const fs = require("fs");
const path = require("path");

const gqlPath = path.join(__dirname, "..", "src", "gql");

const filesToModify = [path.join(gqlPath, "fragment-masking.ts"), path.join(gqlPath, "index.ts")];

const contentToAdd = "/* eslint-disable */\n";

filesToModify.forEach((filePath) => {
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, "utf8");
    if (!fileContent.startsWith(contentToAdd)) {
      const updatedContent = contentToAdd + fileContent;
      fs.writeFileSync(filePath, updatedContent, "utf8");
      console.log(`Updated: ${filePath}`);
    } else {
      console.log(`Already up-to-date: ${filePath}`);
    }
  } else {
    console.warn(`File not found: ${filePath}`);
  }
});
