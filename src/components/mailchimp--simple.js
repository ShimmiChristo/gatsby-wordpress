import React from 'react';
import styled from 'styled-components';
import addToMailchimp from 'gatsby-plugin-mailchimp';

function MailChimpSimpleForm() {
  // Since `addToMailchimp` returns a promise, you
  // can handle the response in two different ways:

  // Note that you need to send an email & optionally, listFields
  // these values can be pulled from React state, form fields,
  // or wherever.  (Personally, I recommend storing in state).

  // 1. via `.then`
  // const _handleSubmit = (e) => {
  //   e.preventDefault();
  //   addToMailchimp(email, listFields) // listFields are optional if you are only capturing the email address.
  //     .then((data) => {
  //       // I recommend setting data to React state
  //       // but you can do whatever you want (including ignoring this `then()` altogether)
  //       console.log(data);
  //     })
  //     .catch(() => {
  //       // unnecessary because Mailchimp only ever
  //       // returns a 200 status code
  //       // see below for how to handle errors
  //     });
  // };

  // 2. via `async/await`
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await addToMailchimp(email, listFields);
    // I recommend setting `result` to React state
    // but you can do whatever you want
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value="" type="email" />
      <input label="Submit" type="submit" value="Subscribe" />
    </form>
  );
}

export default MailChimpSimpleForm;
