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



   // On file select (from the pop up)
   const onFileChange = e => {
     
    if (e.target.files) {
        setFile(e.target.files[0]);
      }
   
  };

   
  // On file upload (click the upload button)
  const onFileUpload = () => {
   
    // Create an object of formData
   // const formData = new FormData();
   
    // Update the formData object
    const formData = new FormData(file);

   
    // Details of the uploaded file
    console.log(formData);
   
    // Request made to the backend api
    // Send formData object
    auth.profilePic(formData);
  };

  return (
    <div>
    <input type="file" onChange={onFileChange} />
    <button onClick={onFileUpload}>
      Upload!
    </button>
</div>

  );
}
