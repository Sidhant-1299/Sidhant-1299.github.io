export const scrollIntoViewWithID = (id) => {
  const element = document.getElementById(id);
  element.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const openInNewTab = (url) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};
