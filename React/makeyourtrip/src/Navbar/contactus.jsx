import React, { useRef } from 'react';
import styled from 'styled-components';
import { Button, Box } from '@mui/material';
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
      <div>
        <form ref={form} onSubmit={sendEmail}>
          <Box
            component="form"
            sx={{
              display: 'grid',
              gap: '10px', // Adjust the gap as needed
              gridTemplateColumns: '1fr', // Change to '1fr 1fr' for two columns, etc.
              '& > :not(style)': { width: '100%' },
            }}
            autoComplete="off"
            id="form"
            className="flex flex-col"
          >
            <TextField label='Name' name='user_name' variant='standard' />
            <TextField label='Email' name='user_email' type='email' variant='standard' />
            <TextField
              label='Phone'
              name='phone'
              required
              type='tel'
              pattern='[0-9]{10}'
              variant='standard'
              title='Please enter a 10-digit phone number'
            />
            <TextField label='Message' name='message' multiline rows={3} variant='standard' />
            <Button type='submit'>Send</Button>
          </Box>
        </form>
      </div>
    </>
  );
}

// Add your CSS styling as needed
