import fs from "fs";
import path from "path";
import json from "../export/data.json";

const data: any = json;

data.forEach((subject: any) => {
  for (let i = 0; i < subject.environments.length; i += 1) {
    const environment = subject.environments[i];
    if (environment.color?.hex) {
      environment.color = environment.color.hex;
    }
  }
});

fs.writeFile(path.join(__dirname, "../export/data.json"), JSON.stringify(data, null, 2), () => console.log("done"));
