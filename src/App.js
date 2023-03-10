import { BrowserRouter, Switch, Route } from "react-router-dom";
import AddNewCategory from "./components/Categories/AddNewCategory";
import CategoryList from "./components/Categories/CategoryList";
import UpdateCategory from "./components/Categories/UpdateCategory";
import UpdateComment from "./components/Comments/UpdateComment";
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navigation/Navbar";
import AdminRoute from "./components/Navigation/ProtectedRoutes/AdminRoute";
import PrivateProtectRoute from "./components/Navigation/ProtectedRoutes/PrivateProtectRoute";
import CreatePost from "./components/Posts/CreatePost";
import PostDetails from "./components/Posts/PostDetails";
import PostsList from "./components/Posts/PostsList";
import UpdatePost from "./components/Posts/UpdatePost";
import AccountVerified from "./components/Users/AccountVerification/AccountVerified";
import SendEmail from "./components/Users/Emailing/SendEmail";
import Login from "./components/Users/Login/Login";
import ResetPassword from "./components/Users/PasswordManagement/ResetPassword";
import ResetPasswordForm from "./components/Users/PasswordManagement/ResetPasswordForm";
import UpdatePassword from "./components/Users/PasswordManagement/UpdatePassword";
import Profile from "./components/Users/Profile/Profile";
import UpdateProfileForm from "./components/Users/Profile/UpdateProfileForm";
import UploadProfilePhoto from "./components/Users/Profile/UploadProfilePhoto";
import Register from "./components/Users/Register/Register";
import UsersList from "./components/Users/UsersList/UsersList";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <PrivateProtectRoute
          exact
          path="/update-post/:id"
          component={UpdatePost}
        />
        <Route
          exact
          path="/password-reset-token"
          component={ResetPasswordForm}
        />
        <Route exact path="/reset-password/:token" component={ResetPassword} />
        <PrivateProtectRoute
          exact
          path="/verify-account/:token"
          component={AccountVerified}
        />
        <PrivateProtectRoute
          exact
          path="/upload-profile-photo"
          component={UploadProfilePhoto}
        />
        <PrivateProtectRoute
          exact
          path="/update-password"
          component={UpdatePassword}
        />
        <PrivateProtectRoute exact path="/send-email" component={SendEmail} />
        <AdminRoute exact path="/users" component={UsersList} />
        <PrivateProtectRoute
          exact
          path="/update-profile/:id"
          component={UpdateProfileForm}
        />
        <PrivateProtectRoute exact path="/profile/:id" component={Profile} />
        <AdminRoute exact path="/add-category" component={AddNewCategory} />
        <PrivateProtectRoute exact path="/create-post" component={CreatePost} />
        <PrivateProtectRoute
          exact
          path="/update-comment/:id"
          component={UpdateComment}
        />
        <AdminRoute
          exact
          path="/update-category/:id"
          component={UpdateCategory}
        />
        <AdminRoute exact path="/category-list" component={CategoryList} />
        <Route exact path="/posts" component={PostsList} />
        <Route exact path="/posts/:id" component={PostDetails} />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
