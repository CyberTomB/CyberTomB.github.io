async function getRepos() {
  fetch("https://api.github.com/users/CyberTomB/repos?sort=updated").then(
    async (res) => {
      if (res.ok) {
        const resJson = await res.json();
        console.log(resJson);
        let content = "";
        resJson
          .filter((p) => {
            return (
              p.name !== "CyberTomB.github.io" && (p.homepage || p.has_pages)
            );
          })
          .forEach((page, index) => {
            console.log(page.name);
            if (index > 3) {
              return;
            }
            let title;
            title = page.name
              ?.split("-")
              .map((word) => {
                return word[0].toUpperCase() + word.substr(1);
              })
              .join(" ");
            const url =
              page.homepage || "https://cybertomb.github.io/" + page.name;
            const description =
              page.description ??
              `
        example text that is at least a half dozen words long or something to test the word wrap
        `;
            content += buildGitHubPageCard(title, description, url);
          });
        addContentToDom(content);
      } else {
        throw new Error("Error: " + res.status);
      }
    }
  );
}

function buildGitHubPageCard(title, content, link) {
  return `<div class="card project-card">
  <div class="card-body">
    <h5 class="card-title">${title}</h5>
    <p class="card-text">${content}</p>
    <a href='${link}' target="_blank" class='btn btn-secondary'>Check it out!</a>
  </div>
</div>`;
}

function addContentToDom(template) {
  const marqueeContent = document.getElementById("project-content");
  marqueeContent.innerHTML += template;
}

getRepos();
