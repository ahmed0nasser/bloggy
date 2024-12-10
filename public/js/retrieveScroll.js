// store user's scroll position when leave the page
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState !== "hidden") return;

  localStorage.setItem("scrollX", String(window.scrollX));
  localStorage.setItem("scrollY", String(window.scrollY));
});
// retrieve user's scroll when reload the page
document.addEventListener("DOMContentLoaded", () => {
  window.scrollTo(localStorage.scrollX, localStorage.scrollY);
});