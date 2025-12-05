const GITHUB_REPO = "https://github.com/colevandersWands";

document
  .getElementById("gh-corner")
  .addEventListener("click", function openPageSource() {
    const quickReadSourceURL = `${GITHUB_REPO}/${window.location.pathname
      .split("/")
      .filter(Boolean)
      .join("/tree/main/")}`;
    window.open(quickReadSourceURL, "_blank");
  });
