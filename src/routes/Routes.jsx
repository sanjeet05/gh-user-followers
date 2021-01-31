import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// redux imports start
import { Provider } from "react-redux";
import store from "../store";

// 404
import Page404 from "./Page404";

// home
import Home from "../containers/Home/Home";

// empty component
const EmptyComp = () => {
  return <div className="text-center mt-5">WIP</div>;
};

const Root = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/profile" component={EmptyComp} />

          {/* 404 */}
          <Route path="*" component={Page404} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default Root;
