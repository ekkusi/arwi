import groupLoaders from "./group";
import collectionLoaders from "./collection";
import studentLoaders from "./student";
import evaluationLoaders from "./evaluation";
import teacherLoaders from "./teacher";
import moduleLoaders from "./module";
import collectionTypeLoaders from "./collectionType";
import feedbackLoaders from "./feedback";

const loaders = {
  ...groupLoaders,
  ...collectionLoaders,
  ...studentLoaders,
  ...evaluationLoaders,
  ...teacherLoaders,
  ...moduleLoaders,
  ...collectionTypeLoaders,
  ...feedbackLoaders,
};

export default loaders;
