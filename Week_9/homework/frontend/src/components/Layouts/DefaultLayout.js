import React, { useEffect, useContext, useState } from "react";
import { Avatar } from '@mantine/core';

import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  createStyles,
  useMantineTheme,
  Group,
  Title,
  Button
} from "@mantine/core";
import { NavLink, Outlet, Navigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

const headerHeight = 80;


const useStyles = createStyles((theme, _params, getRef) => {
  return {
    appShellMain: {
      minHeight: `calc(100vh - ${headerHeight}px)`,
      display: "flex",
      flexDirection: "column",
      marginTop: `${headerHeight}px`
    },
    header: {
      backgroundColor: theme.primaryColor
    },
    headerGroup: {
      height: "100%",
      display: "flex",
      alignItems: "center",
      margin: 0,
      color: theme.primaryColor
    }
  };
});



export default function DefaultLayout() {


const [pic, setPic] = useState("");


useEffect(() => {

  const user = window.localStorage.getItem("username");
  fetch("http://localhost:4000/profilepic/" + user, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token")
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    })
    .then(resp => resp.json())
    .then(json => setPic(json[0].profile_pic[0]))
    .catch((err) => {
        console.log(err);
      });
}, []);


  const { classes } = useStyles();
  const auth = useContext(AuthContext);
  const [name, setName] = useState(window.localStorage.getItem("username"));

  const HeaderContent = (
    <Group className={classes.headerGroup} position="apart">
      <Avatar src={pic} alt="it's me" />
      <Title>{name}'s Todo App</Title>
      <Group>
        <Button variant="light" color="red" onClick={() => auth.logout()}>
          Logout
        </Button>
      </Group>
    </Group>
  );

  return (
    <AppShell
      header={
        <Header className={classes.header} height={headerHeight} p="md" fixed>
          {HeaderContent}
        </Header>
      }
      classNames={{
        main: classes.appShellMain
      }}
    >
      {
        // sends user to login screen whenever the user is logged out
        // based off the tutorial here: https://blog.utsavkumar.tech/private-routes-in-react-router-v6
        auth.loggedIn ? <Outlet></Outlet> : <Navigate to="/login" replace />
      }
    </AppShell>
  );
}
