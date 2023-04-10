export const getIsIOS = () => {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;

  if (/iPad|iPhone|iPod/.test(ua)) {
    return true;
  }
  return false;
};
