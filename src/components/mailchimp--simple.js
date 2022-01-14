/*
  `addToMailchimp` returns a promise
  https://javascript.info/async-await 
  npm - react-hook-form
  npm - gatsby-plugin-mailchimp (no longer being supported)
*/

import React, { useState } from 'react';
// import styled from 'styled-components';
import addToMailchimp from 'gatsby-plugin-mailchimp';
import { useForm } from 'react-hook-form';

function MailChimpSimpleForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmit = async (data, e) => {
    console.log(data);
    // await sleep(2000);
    // await addToMailchimp(formData.email);
    if (data.email === 'bill') {
      alert(JSON.stringify(data));
      // setSubmitValue(data);
      e.target.reset(); // reset after form submit
    } else {
      alert('There is an error');
    }
  };

  // const [formData, setFormData] = useState({
  //   email: '',
  // });

  // const handleSubmitOld = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await addToMailchimp(formData.email);
  //     // result();
  //   } catch (err) {
  //     console.log('error message returned: ' + err);
  //   }
  // };

  // const handleFormInput = (e) => {
  //   setFormData({
  //     email: e.target.value,
  //   });
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <input onChange={handleFormInput} value={formData.email} type="email" placeholder="Email" /> */}
      <label>Email</label>
      <input
        type="text"
        {...register('email', {
          required: true,
          pattern:
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        })}
      />
      {errors.email && <p>This is required</p>}
      <input label="Submit" type="submit" value="Subscribe" />
    </form>
  );
}

export default MailChimpSimpleForm;
