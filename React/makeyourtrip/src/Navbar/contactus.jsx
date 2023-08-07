import React, { useRef } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import emailjs from 'emailjs-com'; // Use emailjs-com instead of emailjs/browser

export default function Footer() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_3sqh4w5', 'template_gs6csis', form.current, 'spmn0t94BKcD0jGoq')
      .then((result) => {
        console.log(result.text);
        alert('Message sent successfully!');
        form.current.reset();
      })
      .catch((error) => {
        console.log(error.text);
      });
  };

  return (
    <>
      <div className='Feedback_Form'>
        <h1>Give Your Valuable Feedback :</h1>
        <br></br>
        <br></br>
        <form ref={form} onSubmit={sendEmail}>
          <TextField label='Name' name='user_name' />
          <TextField label='Email' name='user_email' type='email' />
          <TextField
            label='Phone'
            name='phone'
            required
            type='tel'
            pattern='[0-9]{10}'
            title='Please enter a 10-digit phone number'
          />
          <TextField label='Message' name='message' multiline rows={4} />
          <Button type='submit'>Send</Button>
        </form>
      </div>
    </>
  );
}

// Add your CSS styling as needed
