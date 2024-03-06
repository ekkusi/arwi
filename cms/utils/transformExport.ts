/* eslint-disable no-underscore-dangle */
import fs from "fs";
import path from "path";
import json from "../export/data.json";

const data: any = json;
const subjectsData = data.filter((it: any) => it._type === "subject");

const deleteKeyAndType = (arr: any[]) => {
  for (let i = 0; i < arr.length; i += 1) {
    const obj = arr[i];
    delete obj._key;
    delete obj._type;
  }
};

function hslToHex(hue: number, sat: number, light: number): string {
  const lightConverted = light / 100;
  const a = (sat * Math.min(lightConverted, 1 - lightConverted)) / 100;
  const f = (n: number) => {
    const k = (n + hue / 30) % 12;
    const color = lightConverted - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0"); // Convert to Hex and format
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function generatePastelColors(numColors: number, initialHue: number, saturation: number, lightness: number): string[] {
  const colors: string[] = [];
  const goldenRatioConjugate: number = 0.618033988749895; // Golden ratio conjugate
  let hue: number = initialHue;

  for (let i: number = 0; i < numColors; i += 1) {
    hue += goldenRatioConjugate; // Use the golden ratio to distribute hues
    hue %= 1; // Keep hue in the range [0, 1)
    const color: string = hslToHex(hue * 360, saturation, lightness); // Create HEX color
    colors.push(color); // Add the color to the array
  }

  return colors;
}

const formatEnvironments = (environments: any[]) => {
  deleteKeyAndType(environments);
  const colors = generatePastelColors(environments.length, 0.2, 45, 50);
  for (let i = 0; i < environments.length; i += 1) {
    const environment = environments[i];
    environment.color = colors[i];
    Object.keys(environment.name).forEach((lang) => {
      const label: string = environment.name[lang].trim();
      if (label.length > 0) {
        environment.name[lang] = label.charAt(0).toUpperCase() + label.slice(1);
      }
    });
  }
};

const formatLearningObjecives = (objectives: any[]) => {
  deleteKeyAndType(objectives);
  const colors = generatePastelColors(objectives.length, 0.05, 30, 45);
  for (let i = 0; i < objectives.length; i += 1) {
    const objective = objectives[i];
    objective.color = colors[i];
    Object.keys(objective.label).forEach((lang) => {
      const label: string = objective.label[lang].trim();
      if (label.length > 0) {
        objective.label[lang] = label.charAt(0).toUpperCase() + label.slice(1);
      }
    });
    Object.keys(objective.longDescription).forEach((lang) => {
      const description: string = objective.longDescription[lang].trim();
      if (description.length > 0) {
        objective.longDescription[lang] = description.charAt(0).toUpperCase() + description.slice(1);
      }
    });
  }
};

for (let i = 0; i < subjectsData.length; i += 1) {
  const subject = subjectsData[i];
  subject.code = subject.code.current;
  const commonEnvironments = subject.environments || [];
  delete subject.environments;
  if (subject.elementarySchool) {
    const elementary = subject.elementarySchool;
    // Format learning objectives
    if (elementary.one_to_two_years) formatLearningObjecives(elementary.one_to_two_years);
    if (elementary.three_to_six_years) formatLearningObjecives(elementary.three_to_six_years);
    if (elementary.seven_to_nine_years) formatLearningObjecives(elementary.seven_to_nine_years);
    // Format environments by combining common environments and level specific environments
    elementary.environments_1_to_2 = elementary.environments_1_to_2
      ? [...commonEnvironments, ...elementary.environments_1_to_2]
      : [...commonEnvironments];
    formatEnvironments(elementary.environments_1_to_2);
    elementary.environments_3_to_6 = elementary.environments_3_to_6
      ? [...commonEnvironments, ...elementary.environments_3_to_6]
      : [...commonEnvironments];
    formatEnvironments(elementary.environments_3_to_6);
    elementary.environments_7_to_9 = elementary.environments_7_to_9
      ? [...commonEnvironments, ...elementary.environments_7_to_9]
      : [...commonEnvironments];
    formatEnvironments(elementary.environments_7_to_9);
  } else subject.elementarySchool = {};
  if (subject.highSchoolModules) {
    const modules = subject.highSchoolModules;
    deleteKeyAndType(modules);
    modules.forEach((it: any) => {
      const module = it;
      if (module.learningObjectives) {
        formatLearningObjecives(module.learningObjectives);
      }
      module.environments = module.environments ? [...commonEnvironments, ...module.environments] : [...commonEnvironments];
      formatEnvironments(module.environments);
    });
  }
  if (subject.vocationalSchoolModules) {
    const modules = subject.vocationalSchoolModules;
    deleteKeyAndType(modules);
    modules.forEach((it: any) => {
      const module = it;
      if (module.learningObjectives) {
        formatLearningObjecives(module.learningObjectives);
      }
      module.environments = module.environments ? [...commonEnvironments, ...module.environments] : [...commonEnvironments];
      formatEnvironments(module.environments);
    });
  }
  delete subject._createdAt;
  delete subject._id;
  delete subject._rev;
  delete subject._type;
  delete subject._updatedAt;
}

// eslint-disable-next-line no-console
fs.writeFile(path.join(__dirname, "../export/data.json"), JSON.stringify(subjectsData, null, 2), () => console.log("Transform done!"));
