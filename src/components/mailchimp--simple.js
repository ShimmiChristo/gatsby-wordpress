/*
  `addToMailchimp` returns a promise
  https://javascript.info/async-await 
  npm - react-hook-form
  npm - gatsby-plugin-mailchimp (no longer being supported)
*/

import React, { useState } from 'react';
import addToMailchimp from 'gatsby-plugin-mailchimp';
import { useForm } from 'react-hook-form';

function MailChimpSimpleForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [formResponse, setFormResponse] = useState({
    msg: null,
  });

  const onSubmit = async (data, e) => {
    e.target.reset(); // reset after form submit
    try {
      const result = await addToMailchimp(data.email);
      if (result.result === 'error') {
        setFormResponse({
          msg: (
            <div
              className="alert alert-danger"
              dangerouslySetInnerHTML={{ __html: result.msg }}
            />
          ),
        });
      } else {
        setFormResponse({
          msg: (
            <div
              className="alert alert-success"
              dangerouslySetInnerHTML={{ __html: result.msg }}
            />
          ),
        });
      }
    } catch (err) {
      console.log('error message returned: ' + err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row py-5">
        <div className="form-group mb-2 col-5">
          <h2 className='h3'>Subscribe to the Newsletter</h2>
        </div>
        <div className="form-group mb-2 col-5">
          <label className="sr-only" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="form-control"
            type="email"
            placeholder="Enter email"
            {...register('email', {
              required: true,
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Invalid email',
              },
              maxLength: {
                value: 100,
                message: 'Your email is too long.',
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="form-group mb-2 col-2">
          <input
            label="Submit"
            type="submit"
            value="Subscribe"
            className="btn btn-primary"
          />
          {formResponse.msg}
        </div>
      </div>
    </form>
  );
}

export default MailChimpSimpleForm;
