import React, { Component, Fragment } from "react";
import { debounce } from "lodash";

// common components
import Spinner from "../../components/Spinner/Spinner";

// actions
import { doGetGithubUserFollowers } from "../../actions/githubActions";

// css
import "./Home.scss";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: true,
      allUsers: [],
      users: [],
      serverError: "",
      userId: "",
      followerName: "",
    };
  }

  getInitialData = async (userId) => {
    try {
      this.setState({ fetching: false });
      const users = await doGetGithubUserFollowers(userId);
      this.setState({ users, allUsers: users, fetching: true });
    } catch (error) {
      this.setState({ serverError: error.message, fetching: true });
    }
  };

  // componentDidMount() {
  //   this.getInitialData();
  // }

  handleUserIdDebounced = debounce((value) => {
    const userId = value.trim();
    if (userId) {
      this.getInitialData(userId);
    } else {
      this.setState({ users: [] });
    }
  }, 500);

  handleUserId = (e) => {
    this.setState({ userId: e.target.value });
    this.handleUserIdDebounced(e.target.value);
  };

  handleFollowerNameDebounced = debounce((value) => {
    const followerName = value.trim();
    const { allUsers } = this.state;
    if (followerName) {
      const newUser = allUsers.filter((user) => {
        return user.login.toLowerCase().includes(followerName.toLowerCase());
      });

      this.setState({ users: newUser });
    } else {
      this.setState({ users: allUsers });
    }
  }, 500);

  handleFollowerName = (e) => {
    this.setState({ followerName: e.target.value });
    this.handleFollowerNameDebounced(e.target.value);
  };

  handleSelect = (selectedIndex, e) => {
    this.setState({
      index: selectedIndex,
      direction: e.direction,
    });
  };

  render() {
    const { fetching, users, serverError, userId, followerName } = this.state;

    return (
      <Fragment>
        <section id="home">
          <div className="container">
            <div className="row mt-4">
              <div className="col-md-12">
                <input
                  className={`ss_input form-control`}
                  type={"text"}
                  name={"userId"}
                  value={userId}
                  placeholder={"Enter github user id"}
                  onChange={this.handleUserId}
                  maxLength={50}
                />
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-12">
                <input
                  className={`ss_input form-control`}
                  type={"text"}
                  name={"followerName"}
                  value={followerName}
                  placeholder={"Search your follower by name"}
                  onChange={this.handleFollowerName}
                  maxLength={50}
                />
              </div>
            </div>

            <div className="row mt-4 mb-4">
              {!fetching && (
                <div className="col-md-12 p-2">
                  <Spinner />
                </div>
              )}

              {/* {fetching && users.length === 0 && (
                <div className="col-md-12 p-2">No followers available</div>
              )} */}

              {fetching &&
                users.map((user) => {
                  return (
                    <div key={user.id} className="col-md-3 p-2">
                      <div className="user_card mt-2">
                        <img className="user_image" alt={"av"} src={user.avatar_url} />
                        <div className="user_name">{user.login}</div>
                      </div>
                    </div>
                  );
                })}
              {serverError && (
                <div className="text-danger mt-2 mb-2 text-center">{serverError}</div>
              )}
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default Home;
