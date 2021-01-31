import { apiCalls } from "../../../actions/apiCalls";

// action types
export const REQUESTING = "REQUESTING";
export const SUCCESS = "SUCCESS";
export const FAILURE = "FAILURE";

export const GET_FOLLOWERS_REQUESTING = "GET_FOLLOWERS_REQUESTING";
export const GET_FOLLOWERS_FAILURE = "GET_FOLLOWERS_FAILURE";
export const GET_FOLLOWERS = "GET_FOLLOWERS";

export const RESET_FOLLOWERS = "RESET_FOLLOWERS";
export const SEARCH_FOLLOWERS = "SEARCH_FOLLOWERS";
export const RESET_SEARCH_FOLLOWERS = "RESET_SEARCH_FOLLOWERS";

const github_api_url = process.env.REACT_APP_GITHUB_API_URL;

// util functions
function startRequest(actionType) {
  return {
    type: actionType,
    status: REQUESTING,
  };
}
function failureRequest(actionType, error) {
  return {
    type: actionType,
    status: FAILURE,
    error,
  };
}

function successRequest(actionType, data) {
  return {
    type: actionType,
    status: SUCCESS,
    data,
  };
}

// get followers by user id
export const getFollowers = (userId) => {
  return async (dispatch) => {
    dispatch(startRequest(GET_FOLLOWERS_REQUESTING));
    const url = github_api_url + `/users/${userId}/followers`;
    try {
      const result = await apiCalls("get", url);
      dispatch(successRequest(GET_FOLLOWERS, result.data));
    } catch (e) {
      console.error("github user followers, server err:", e);
      let err = e.response ? e.response.data.error : e.message;
      dispatch(failureRequest(GET_FOLLOWERS_FAILURE, err));
    }
  };
};

// reset followers
export const resetFollowers = () => {
  return (dispatch) => {
    dispatch(successRequest(RESET_FOLLOWERS, []));
  };
};

// rearch followers without api call
export const searchFollowers = (value) => {
  return (dispatch) => {
    dispatch(successRequest(SEARCH_FOLLOWERS, value));
  };
};

// reset followers
export const resetSearchFollowers = () => {
  return (dispatch) => {
    dispatch(successRequest(RESET_SEARCH_FOLLOWERS, []));
  };
};
