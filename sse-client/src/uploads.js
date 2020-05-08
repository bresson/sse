import React, { useState, useEffect } from "react";
import { Form, Button, TextInput, FormField } from "grommet";
import axios from "axios";

const Upload = (props) => {
  const [file, setFile] = useState();

  const handleFile = (file) => {
    console.log("hendle file ", file);
    setFile(file);
  };

  const handleSubmit = (vals) => {
    console.log("submit ", vals);
    // console.log("icon ", file, file[0])
    const fdata = new FormData();
    for (let key in vals) {
      console.log(key.toString());
      fdata.append(key.toString(), vals[key]);
    }
    // fdata.append("Icon", file)
    for (var value of fdata.values()) {
      console.log(value);
    }
    axios({
      method: "post",
      url: "http://localhost:5000/upload",
      data: fdata,
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    });
  };
  return (
    // encType="multipart/form-data"
    <Form
      onSubmit={({ value }) => {
        console.log(value);
        return handleSubmit(Object.assign({}, value, { Icon: file }));
        // return handleSubmit(value)
      }}
    >
      <FormField name="name" htmlfor="text-input-id" label="Name">
        <TextInput id="text-input-id" name="name" required />
      </FormField>
      <FormField
        name="Icon"
        label="file"
        onChange={(e) => handleFile(e.target.files[0])}
      >
        <TextInput type="file" name="Icon" required />
      </FormField>
      {/* <input type="file" name="Icon" onChange={(e) => handleFile(e.target.files[0])} /> */}

      <Button primary type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Upload;
