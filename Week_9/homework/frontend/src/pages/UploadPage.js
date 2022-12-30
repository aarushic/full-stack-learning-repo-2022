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

export default function UploadPage() {
  const auth = useContext(AuthContext);
  const { classes } = useStyles();
  const [file, setFile] = useState();

  const form = useForm({
    initialValues: {
      email: "",
      password: ""
    },
    validate: {
      // checks to see if the value is in the form of a an email
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email")
    }
  });

  function handleSubmit(values) {
    console.log("egethwtjh");
    console.log(form, values);
    auth.profilePic(values, form);
  }



  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    console.log(file);
    auth.uploadFile(file);
  };

  return (
    // <form onSubmit={form.onSubmit(handleSubmit())}>
    //   <Stack align="center" justify="center" p="xl">
    //     <Title order={1}>Upload File</Title>
    //      <FileInput
    //       classNames={{ wrapper: classes.inputWrapper }}
    //       required
    //       label="Profile Picture"
    //       placeholder="Upload profile picture"
    //       {...form.getInputProps("pic")}
    //     /> 


           

    //     <Group position="center">
    //       <Button type="submit">Submit</Button>
    //     </Group>
    //   </Stack>
    // </form>

    <div>
    <input type="file" onChange={handleFileChange} />

    <div>{file && `${file.name} - ${file.type}`}</div>

    <button onClick={handleUploadClick}>Upload</button>
  </div>

  );
}
