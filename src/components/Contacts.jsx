import React from "react";
import Naviation from "./Navigation";
import { useSelector } from "react-redux";

const Contacts = () => {
  const allUsers = useSelector((state) => state.allUsers);
  const user = useSelector((state) => state.user);
  const results = allUsers.filter((potentialContact) => {
    //if already a friend and not blocked
    if (user.blocked && user.blocked.includes(potentialContact.id))
      return false;
    if (user.friends && user.friends.includes(potentialContact.id))
      return potentialContact;

    return false;
  });
  return (
    <>
      Contacts
      <Naviation />
      {results.map((contact) => {
        return <h1>{contact.userName}</h1>;
      })}
    </>
  );
};

export default Contacts;
