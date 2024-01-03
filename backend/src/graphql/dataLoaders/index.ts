import groupLoaders from "./group";
import collectionLoaders from "./collection";
import studentLoaders from "./student";
import evaluationLoaders from "./evaluation";
import teacherLoaders from "./teacher";
import moduleLoaders from "./module";
import collectionType from "./collectionType";

const loaders = {
  ...groupLoaders,
  ...collectionLoaders,
  ...studentLoaders,
  ...evaluationLoaders,
  ...teacherLoaders,
  ...moduleLoaders,
  ...collectionType,
};

export default loaders;
