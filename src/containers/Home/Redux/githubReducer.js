import * as GithubActions from "./githubActions";

let intialData = {
  followers: [],
  allFollowers: [],
  getFollowerLoading: false,
  getFollowerStatus: "",
  getFollowerError: "",
};

export default function reducer(state = intialData, action) {
  switch (action.type) {
    case GithubActions.GET_FOLLOWERS_REQUESTING:
      state = {
        ...state,
        getFollowerLoading: true,
        getFollowerStatus: action.status,
      };
      break;
    case GithubActions.GET_FOLLOWERS_FAILURE:
      state = {
        ...state,
        getFollowerLoading: false,
        getFollowerStatus: action.status,
        getFollowerError: action.error,
      };
      break;
    case GithubActions.GET_FOLLOWERS:
      state = {
        ...state,
        followers: action.data,
        allFollowers: action.data,
        getFollowerLoading: false,
        getFollowerStatus: action.status,
        getFollowerError: "",
      };
      break;

    case GithubActions.RESET_FOLLOWERS:
      state = {
        ...state,
        followers: action.data,
        allFollowers: action.data,
        getFollowerLoading: false,
        getFollowerStatus: action.status,
        getFollowerError: "",
      };
      break;

    case GithubActions.SEARCH_FOLLOWERS:
      const newUser = state.allFollowers.filter((user) => {
        return user.login.toLowerCase().includes(action.data.toLowerCase());
      });

      state = {
        ...state,
        followers: newUser,
        getFollowerLoading: false,
        getFollowerStatus: action.status,
        getFollowerError: "",
      };
      break;

    case GithubActions.RESET_SEARCH_FOLLOWERS:
      state = {
        ...state,
        followers: state.allFollowers,
        getFollowerLoading: false,
        getFollowerStatus: action.status,
        getFollowerError: "",
      };
      break;

    default:
      break;
  }
  return state;
}
