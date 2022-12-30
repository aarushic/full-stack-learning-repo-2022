import { useEffect, useState, Fragment, useContext } from "react";
import { useForm } from "@mantine/form";
import AuthContext from "../contexts/AuthContext";

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
  Center,
  Stack,
  Input,
  Button,
  Checkbox,
  TextInput,
  PasswordInput,
  FileInput,
  Title
} from "@mantine/core";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme, _params, getRef) => {
  return {
    inputWrapper: {
      width: 250
    }
  };
});

export default function ExportPage() {
  const auth = useContext(AuthContext);
  const { classes } = useStyles();


  useEffect(() => {
    auth.exportFile();
  }, []);

  

  //not going into
  return (
   <h1>export</h1>


  );
}
