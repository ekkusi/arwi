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

for (let i = 0; i < data.length; i += 1) {
  const subject = data[i];
  if (subject.environments) {
    for (let j = 0; j < subject.environments.length; j += 1) {
      const environment = subject.environments[j];
      if (environment.color?.hex) {
        environment.color = environment.color.hex;
      }
      delete environment._key;
      delete environment._type;
    }
    deleteKeyAndType(subject.environments);
  }
  if (subject.elementarySchool) {
    const elementary = subject.elementarySchool;
    if (elementary.one_to_two_years) deleteKeyAndType(elementary.one_to_two_years);
    if (elementary.three_to_six_years) deleteKeyAndType(elementary.three_to_six_years);
    if (elementary.seven_to_nine_years) deleteKeyAndType(elementary.seven_to_nine_years);
  }
  if (subject.highSchoolModules) {
    const modules = subject.highSchoolModules;
    deleteKeyAndType(modules);
    modules.forEach((it: any) => {
      if (it.learningObjectives) {
        deleteKeyAndType(it.learningObjectives);
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
    });
  }
  delete subject._createdAt;
  delete subject._id;
  delete subject._rev;
  delete subject._type;
  delete subject._updatedAt;
}

fs.writeFile(path.join(__dirname, "../export/data.json"), JSON.stringify(data, null, 2), () => console.log("done"));
