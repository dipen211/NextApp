import React, { useContext, useState } from "react";
import TextField from '@material-ui/core/TextField';
import { Paper, Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import axios from "axios";
import router from "next/router";
const Home = () => {
  const [values, setValues] = useState({
    email: "",
    password: ""
  });
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const userData = {
      email: values.email,
      password: values.password,
    };
    console.log(userData.email);
    axios.get('http://localhost:5000/employees')
      .then((res) => {
        const employees = res.data;
        employees.map((key: any) => (key.email === userData.email && key.password === userData.password ?
          router.replace('/employee') : router.replace('/'))
        );
      })
  }
  const handleChange = (e: any) => {
    e.persist();
    setValues((values: any) => ({
      ...values,
      [e.target.name]: e.target.value
    }));
  };
  return (
    <>
      <Paper>
        <Box>
          <TextField
            variant="outlined"
            margin="none"
            value={values.email}
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            value={values.password}
            fullWidth
            name="password"
            label="password"
            type="password"
            onChange={handleChange}
          />
          <Button
            type="submit"
            onClick={handleSubmit}
            variant="contained"
            color="primary">
            Login
          </Button>
        </Box>
      </Paper >
    </>
  )
}

export default Home;