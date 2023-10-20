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

const cleanEnvironments = (environments: any[]) => {
  for (let i = 0; i < environments.length; i += 1) {
    const environment = environments[i];
    if (environment.color?.hex) {
      environment.color = environment.color.hex;
    }
    delete environment._key;
    delete environment._type;
  }
};

for (let i = 0; i < data.length; i += 1) {
  const subject = data[i];
  subject.code = subject.code.current;
  if (subject.environments) {
    cleanEnvironments(subject.environments);
  }
  if (subject.elementarySchool) {
    const elementary = subject.elementarySchool;
    if (elementary.one_to_two_years) deleteKeyAndType(elementary.one_to_two_years);
    if (elementary.three_to_six_years) deleteKeyAndType(elementary.three_to_six_years);
    if (elementary.seven_to_nine_years) deleteKeyAndType(elementary.seven_to_nine_years);
    if (elementary.environments_1_to_2) cleanEnvironments(elementary.environments_1_to_2);
    if (elementary.environments_3_to_6) cleanEnvironments(elementary.environments_3_to_6);
    if (elementary.environments_7_to_9) cleanEnvironments(elementary.environments_7_to_9);
  }
  if (subject.highSchoolModules) {
    const modules = subject.highSchoolModules;
    deleteKeyAndType(modules);
    modules.forEach((it: any) => {
      if (it.learningObjectives) {
        deleteKeyAndType(it.learningObjectives);
      }
      if (it.environments) {
        cleanEnvironments(it.environments);
      }
    });
  }
  if (subject.vocationalSchoolModules) {
    const modules = subject.vocationalSchoolModules;
    deleteKeyAndType(modules);
    modules.forEach((it: any) => {
      if (it.learningObjectives) {
        deleteKeyAndType(it.learningObjectives);
      }
      if (it.environments) {
        cleanEnvironments(it.environments);
      }
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
