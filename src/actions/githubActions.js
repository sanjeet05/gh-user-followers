import { apiCalls } from "./apiCalls";

const github_api_url = "https://api.github.com";

export const doGetGithubUserFollowers = async (userId) => {
  const url = github_api_url + `/users/${userId}/followers`;
  try {
    const result = await apiCalls("get", url);
    return result.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error);
    } else {
      console.error("github user followers, server err:", error.message);
      throw new Error(error.message);
    }
  }
};
