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
        console.log(pageRepos);
        let content = "";
        for (let p of pageRepos) {
          console.log(p.name);
          let title;
          title = p.name
            ?.split("-")
            .map((word) => {
              console.log(word);
              return word[0].toUpperCase() + word.substr(1);
            })
            .join(" ");
          const url = "https://cybertomb.github.io/" + p.name;
          const description =
            p.description ??
            `
        example text that is at least a half dozen words long or something to test the word wrap
        `;
          content += generateMarqueeCardHtml(title, description, url);
        }
        addContentToMarquee(content);
      } else {
        throw new Error("Error: " + res.status);
      }
    }
  );
}

function generateMarqueeCardHtml(title, content, link) {
  console.log(title, content, link);
  return `<div class="card marquee-card">
  <div class="card-body">
    <h5 class="card-title">${title}</h5>
    <p class="card-text">${content}</p>
    <a href='${link}'>Check it out!</a>
  </div>
</div>`;
}

function addContentToMarquee(template) {
  const marquee = document.getElementById("marquee-content");
  marquee.innerHTML += template;
}

await getRepos();
