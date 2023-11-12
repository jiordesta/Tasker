import React from "react";
import { useSelector } from "react-redux";
import Dashboard from "../subpages/Dashboard";
import Authentication from "../subpages/Authentication";
import Loading from "../components/Loading";

export default function Home() {
  const user = useSelector((state) => state.auth.user);
  const loadingUser = useSelector((state) => state.auth.loadingUser);

  return (
    <>
      {loadingUser ? (
        <Loading />
      ) : (
        <>{user ? <Dashboard /> : <Authentication />}</>
      )}
    </>
  );
}
