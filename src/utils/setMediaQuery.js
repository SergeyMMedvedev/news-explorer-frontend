function setMediaQuery(width, setMaxWidth) {
  if (width >= 1440) {
    setMaxWidth(1440);
  } else if (width >= 1280 && width < 1440) {
    setMaxWidth(1280);
  } else if (width >= 1024 && width < 1280) {
    setMaxWidth(1024);
  } else if (width >= 768 && width < 1024) {
    setMaxWidth(768);
  } else if (width >= 680 && width < 768) {
    setMaxWidth(680);
  } else if (width >= 480 && width < 680) {
    setMaxWidth(480);
  } else if (width < 480) {
    setMaxWidth(320);
  }
}

export default setMediaQuery;
