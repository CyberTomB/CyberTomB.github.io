async function getRepos() {
  fetch("https://api.github.com/users/CyberTomB/repos?sort=updated").then(
    async (res) => {
      if (res.ok) {
        const resJson = await res.json();
        const pageRepos = resJson.filter((r) => r.has_pages);
        pageRepos.sort((a, b) => {
          const dateA = new Date(a.updated_at);
          const dateB = new Date(b.updated_at);
          return dateA.getTime() < dateB.getTime();
        });
        let content = "";
        pageRepos.forEach((page, index) => {
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
          const url = "https://cybertomb.github.io/" + page.name;
          const description =
            page.description ??
            `
        example text that is at least a half dozen words long or something to test the word wrap
        `;
          content += buildGitHubPageCard(title, description, url);
        });
        addContentToMarquee(content);
      } else {
        throw new Error("Error: " + res.status);
      }
    }
  );
}

function buildGitHubPageCard(title, content, link) {
  return `<div class="card marquee-card">
  <div class="card-body">
    <h5 class="card-title">${title}</h5>
    <p class="card-text">${content}</p>
    <a href='${link}' class='btn btn-secondary'>Check it out!</a>
  </div>
</div>`;
}

const marqueeContent = document.getElementById("marquee-content");

function addContentToMarquee(template) {
  marqueeContent.innerHTML += template;
}

function cloneMarqueeContent() {
  const clonedContent = marqueeContent.cloneNode(true);
  marqueeContent.appendChild(clonedContent);
}

getRepos();
