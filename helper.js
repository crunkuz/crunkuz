import fetch from 'node-fetch'

export const getTotalStars = (repoData) => {
  let count = 0;
  for (let c = 0; c < repoList.length; ++c) {
    count += repoList[c]["stargazers_count"];
  }
  return count
};

export const getTotalRepos = (repoData) => repoList.length

export const getTotalFollowers = (userData) => userData.followers

export const getTotalContributions = (repoData) => {
    let count = 0

    for (let c = 0; c < repoList.length; ++c) {
        count += repoList[c]["stargazers_count"];


      }

	// for item in REPOS_DATA:
	// 	msg = f"Fetching {USERNAME}/{item['name']}"

	// 	logStatus(msg, 0)
	// 	contributors = requests.get(f"https://api.github.com/repos/{USERNAME}/{item['name']}/contributors", headers = headers).json()
	// 	logStatus(msg, 1, True)

	// 	for contributor in contributors:
	// 		if (contributor["login"] == USERNAME):
	// 			log("DEBG", f"{Fore.LIGHTBLUE_EX}{USERNAME}/{item['name']}{Fore.LIGHTWHITE_EX}: {contributor['contributions']} contributions")
	// 			counter += contributor["contributions"]
	
	// return counter
}