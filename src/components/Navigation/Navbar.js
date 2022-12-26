import React from "react";
import { useSelector } from "react-redux";
import AdminNavbar from "./Admin/AdminNavbar";
import AccountVerificationAlertWarning from "./Alerts/AccountVerificationAlertWarning";
import PrivateNavbar from "./Private/PrivateNavbar";
import PublicNavbar from "./Public/PublicNavbar";

const Navbar = () => {
  const state = useSelector((state) => state?.users);
  const { userAuth, profile } = state;
  const isAdmin = userAuth?.isAdmin;

  return (
    <>
      {isAdmin ? (
        <AdminNavbar isLogin={userAuth} />
      ) : userAuth ? (
        <PrivateNavbar isLogin={userAuth} />
      ) : (
        <PublicNavbar />
      )}
      {!profile?.isAccountVerified ? <AccountVerificationAlertWarning /> : null}
    </>
  );
};

export default Navbar;
