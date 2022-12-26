import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UsersListHeader from "./UsersListHeader";
import UsersListItem from "./UsersListItem";

const UsersList = () => {
  return (
    <>
      <section class="py-8 bg-gray-900 min-h-screen">
        <UsersListHeader />
        <div class="container px-4 mx-auto">
          <UsersListItem />
        </div>
      </section>
    </>
  );
};

export default UsersList;
