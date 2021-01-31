import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { debounce } from "lodash";

// common components
import Spinner from "../../components/Spinner/Spinner";

// redux
import { connect } from "react-redux";
import {
  getFollowers,
  resetFollowers,
  searchFollowers,
  resetSearchFollowers,
} from "./Redux/githubActions";

// css
import "./Home.scss";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      followerName: "",
    };
  }

  handleUserIdDebounced = debounce((value) => {
    const userId = value.trim();
    if (userId) {
      this.props.getFollowers(userId);
    } else {
      this.props.resetFollowers();
    }
  }, 500);

  handleUserId = (e) => {
    this.setState({ userId: e.target.value });
    this.handleUserIdDebounced(e.target.value);
  };

  handleFollowerNameDebounced = debounce((value) => {
    const followerName = value.trim();
    if (followerName) {
      this.props.searchFollowers(followerName);
    } else {
      this.props.resetSearchFollowers();
    }
  }, 500);

  handleFollowerName = (e) => {
    this.setState({ followerName: e.target.value });
    this.handleFollowerNameDebounced(e.target.value);
  };

  render() {
    const { userId, followerName } = this.state;

    const { followers, getFollowerLoading, getFollowerError } = this.props.follower;

    return (
      <Fragment>
        <section id="home">
          <div className="container">
            <div className="row mt-4">
              <div className="col-md-12">
                <input
                  className="form-control"
                  type="text"
                  name="userId"
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
                  className="form-control"
                  type="text"
                  name="followerName"
                  value={followerName}
                  placeholder={"Search your follower by name"}
                  onChange={this.handleFollowerName}
                  maxLength={50}
                />
              </div>
            </div>

            <div className="row mt-4 mb-4">
              {getFollowerLoading && (
                <div className="col-md-12 p-2">
                  <Spinner />
                </div>
              )}

              {/* {fetching && users.length === 0 && (
                <div className="col-md-12 p-2">No followers available</div>
              )} */}

              {!getFollowerLoading &&
                followers.map((user) => {
                  return (
                    <div key={user.id} className="col-md-3 p-2">
                      <div className="user_card mt-2">
                        <img className="user_image" alt={"av"} src={user.avatar_url} />
                        <div className="user_name">{user.login}</div>
                      </div>
                    </div>
                  );
                })}
              {getFollowerError && (
                <div className="text-danger mt-2 mb-2 text-center">{getFollowerError}</div>
              )}
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    follower: store.githubReducer,
  };
};

const mapDispatchToProps = {
  getFollowers,
  resetFollowers,
  searchFollowers,
  resetSearchFollowers,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
