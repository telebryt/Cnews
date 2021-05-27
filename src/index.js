import React, {  Fragment ,useEffect} from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import Post from "./components/Container/pages/Post";
import Login from "./components/Container/Accounts/Login";
import Register from "./components/Container/Accounts/Register";
import DetailPage from "./components/Container/pages/detailPage";
import CreatePost from "./components/Container/pages/CreatePost";
import PageNotFound from "./components/Container/PageNotFound";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Update from "./components/Container/pages/Update";
import Searchbar from "../src/components/Container/pages/searchbar";
import Category from "./components/Container/pages/category";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Alert from '../src/components/layouts/alert';
import Profile from '../src/components/Container/pages/Profile';
import NewProfile from "../src/components/Container/pages/NewProfile";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "jquery/dist/jquery.js"
import Dashboard from "./components/Container/Admin/Dashboard";
import Event from "./components/Container/userspost/Event";
import Rumour from "./components/Container/userspost/Rumour";
import Letmknoiz from "./components/Container/userspost/letsmknoiz";
const App = (props) => {

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Fragment>
              <Header />
              <Alert />
              <Switch>
                <Route exact path="/" component={Post} />
                <Route exact path="/createPost" component={CreatePost} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/detailPage/:id" component={DetailPage} />
                <Route exa1t path="/update/:id" component={Update} />
                <Route exact path="/category/:id" component={Category} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exa1t path="/search" component={Searchbar} />
                <Route exact path="/prof" component={NewProfile} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/event" component={Event} />
                <Route exact path="/rumour" component={Rumour} />
                <Route exact path="/letmknoiz" component={Letmknoiz} />
                <Route component={PageNotFound} />
              </Switch>
              <ToastContainer autoClose={3000} hideProgressBar />
              <Footer />
            </Fragment>
          </Router>
        </PersistGate>
      </Provider>
    );
  
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
ReactDOM.render(<App />, document.getElementById("root"));
reportWebVitals();
