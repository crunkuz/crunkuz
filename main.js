import dotenv from "dotenv";
import _axios from "axios";
import fs from "fs";

dotenv.config();

const USERNAME = "cuzknothz";

const axios = _axios.create({
  baseURL: "https://api.github.com/",
  headers: { Authorization: `Bearer ${process.env.NEVERLAND_KEY}` },
});

const { data: userData } = await axios.get(`/users/${USERNAME}`);

const {
  data: { items: repoList },
} = await axios.get(`/search/repositories?q=user:${USERNAME}&per_page=100`);

const getTotalStars = () => {
  let count = 0;
  for (let c = 0; c < repoList.length; ++c) {
    count += repoList[c]["stargazers_count"];
  }
  return count;
};

const getTotalRepos = () => repoList.length;

const getTotalFollowers = () => userData.followers;

const getTotalContributions = async () => {
  let count = 0;

  for (let c = 0; c < repoList.length; ++c) {
    const { data: contributors } = await axios.get(
      `/repos/${USERNAME}/${repoList[c]["name"]}/contributors`
    );
    for (let contributor in contributors) {
      if (contributor["login"] === USERNAME) {
        count += contributor["contributions"];
      }
    }
  }
  return count;
};

const PLACEHOLDERS = {
  STARS: getTotalStars(),
  REPOS: getTotalRepos(),
  FOLLOWERS: getTotalFollowers(),
  COMMITS: getTotalContributions(),
};

const processUpdateFile = (inputPath,outputPath) => {
  fs.readFile(inputPath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    let template = data;
    for (let key in PLACEHOLDERS) {
      const value = PLACEHOLDERS[key];
      template = template.replaceAll("{{" + key + "}}", String(value));
    }
    fs.writeFile(outputPath, template, (err) => {
      if (err) {
        return console.log(err);
      }
      console.log("File written successfully\n");
      console.log("The written has the following contents:");
    });
  });
};

// console.log("INFO", {
//   TotalStars: getTotalStars(),
//   TotalRepos: getTotalRepos(),
//   TotalFollowers: getTotalFollowers(),
//   TotalContributions: await getTotalContributions(),
// });
processUpdateFile("templates/1.md", 'README.md');

processUpdateFile("assets/input/card-v2.svg", "assets/output/card-v2.svg")