import React, { useRef } from 'react';
import styled from "styled-components";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import emailjs from '@emailjs/browser';
import Contact from './contactus'
export default function Footer() {
//   const form = useRef();
//   const userNameRef = useRef();
//   const userEmailRef = useRef();
//   const messageRef = useRef();

//   const sendEmail = (e) => {
//     e.preventDefault();

//     const formData = new FormData(form.current);

//     emailjs
//       .sendForm('service_3sqh4w5', 'template_gs6csis', formData, 'spmn0t94BKcD0jGoq')
//       .then((result) => {
//         console.log(result.text);
//         alert("Message sent successfully!");
//         form.current.reset();
//       })
//       .catch((error) => {
//         console.log(error.text);
//       });
//   };

  return (
    <FooterContainer>
      <span>Copyright &copy; 2021 Kanini. All rights reserved</span>
      <div className="links">
        <h1>Contact Us</h1>
        
          <div>
           <Contact/>
          </div>
       
      </div>
      <ul className="social__links">
        <li>
          <FacebookIcon />
        </li>
        <li>
          <InstagramIcon />
        </li>
        <li>
          <YouTubeIcon />
        </li>
        <li>
          <TwitterIcon />
        </li>
      </ul>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-evenly;
  background-color: #d0d8ff;
  border-radius: 0.5rem;
  padding: 2.5rem;

  ul {
    display: flex;
    list-style-type: none;
    gap: 2rem;
    li {
      a {
        text-decoration: none;
        color: black;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #302ce9;
        }
      }
      svg {
        font-size: 1.3rem;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #302ce9;
        }
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1024px) {
    flex-direction: column;
    gap: 2rem;
    ul {
      flex-direction: column;
    }
    .social__links {
      flex-direction: row;
    }
  }
`;
