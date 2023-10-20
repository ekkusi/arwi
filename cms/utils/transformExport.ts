/* eslint-disable no-underscore-dangle */
import fs from "fs";
import path from "path";
import json from "../export/data.json";

const data: any = json;

const deleteKeyAndType = (arr: any[]) => {
  for (let i = 0; i < arr.length; i += 1) {
    const obj = arr[i];
    delete obj._key;
    delete obj._type;
  }
};

const formatEnvironments = (environments: any[]) => {
  deleteKeyAndType(environments);
  for (let i = 0; i < environments.length; i += 1) {
    const environment = environments[i];
    if (environment.color?.hex) {
      environment.color = environment.color.hex;
    }
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
  for (let i = 0; i < objectives.length; i += 1) {
    const objective = objectives[i];
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

for (let i = 0; i < data.length; i += 1) {
  const subject = data[i];
  subject.code = subject.code.current;
  if (subject.environments) {
    formatEnvironments(subject.environments);
  } else {
    subject.environments = [];
  }
  if (subject.elementarySchool) {
    const elementary = subject.elementarySchool;
    if (elementary.one_to_two_years) formatLearningObjecives(elementary.one_to_two_years);
    if (elementary.three_to_six_years) formatLearningObjecives(elementary.three_to_six_years);
    if (elementary.seven_to_nine_years) formatLearningObjecives(elementary.seven_to_nine_years);
    if (elementary.environments_1_to_2) formatEnvironments(elementary.environments_1_to_2);
    else elementary.environments_1_to_2 = [];
    if (elementary.environments_3_to_6) formatEnvironments(elementary.environments_3_to_6);
    else elementary.environments_3_to_6 = [];
    if (elementary.environments_7_to_9) formatEnvironments(elementary.environments_7_to_9);
    else elementary.environments_7_to_9 = [];
  } else subject.elementarySchool = {};
  if (subject.highSchoolModules) {
    const modules = subject.highSchoolModules;
    deleteKeyAndType(modules);
    modules.forEach((it: any) => {
      const module = it;
      if (module.learningObjectives) {
        formatLearningObjecives(module.learningObjectives);
      }
      if (module.environments) {
        formatEnvironments(module.environments);
      } else module.environments = [];
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
      if (module.environments) {
        formatEnvironments(module.environments);
      } else module.environments = [];
    });
  }
  delete subject._createdAt;
  delete subject._id;
  delete subject._rev;
  delete subject._type;
  delete subject._updatedAt;
}

// eslint-disable-next-line no-console
fs.writeFile(path.join(__dirname, "../export/data.json"), JSON.stringify(data, null, 2), () => console.log("Transform done!"));
