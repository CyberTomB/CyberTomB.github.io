async function getRepos() {
  fetch("https://api.github.com/users/CyberTomB/repos").then(async (res) => {
    if (res.ok) {
      const resJson = await res.json();
      const pageRepos = resJson.filter((r) => r.has_pages);
      pageRepos.sort((a, b) => {
        const dateA = new Date(a.updated_at);
        const dateB = new Date(b.updated_at);
        return dateA.getTime() < dateB.getTime();
      });
      console.log(pageRepos);
      const repoNames = pageRepos.map((p) => p.name);
      for (let n of repoNames) {
        console.log("https://cybertomb.github.io/" + n);
      }
    } else {
      throw new Error("Error: " + res.status);
    }
  });
}

await getRepos();
