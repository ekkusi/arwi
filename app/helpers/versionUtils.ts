export const isVersionSmaller = (currentVersion: Maybe<string>, versionToCompare: Maybe<string>) => {
  if (!currentVersion || !versionToCompare) {
    return false;
  }

  const currentVersionArray = currentVersion.split(".");
  const versionToCompareArray = versionToCompare.split(".");
  for (let i = 0; i < currentVersionArray.length; i += 1) {
    const currentVersionNumber = parseInt(currentVersionArray[i], 10);
    const versionToCompareNumber = parseInt(versionToCompareArray[i], 10) || 0;

    if (currentVersionNumber < versionToCompareNumber) {
      return true;
    }
  }
  return false;
};
