import React from 'react';
import styled from "styled-components";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import Contact from './contactus';

export default function Footer() {
    return (
        <FooterContainer>
            <div>
                <div>
                    <h4>About us</h4>
                    <h5>Head Office</h5>
                    <p>Holidays Pvt LTD,</p>
                    <p> No.1, Gemini Parsn,</p>
                    <p> Kodambakkam High Road,</p>
                    <p>   Nungambakkam, Chennai – 600006</p>
                    <p>  Tamilnadu, India.</p> <br /><br />
                    <h5>Corporate office</h5>
                    <p> Holidays Pvt LTD,</p>
                    <p>Novel Tech Park,</p>
                    <p>Opposite to 1 MG Mall,</p>
                    <p>MG Road, Bangalore – 560042</p>
                    <p>Karnataka, India.</p>
                </div>
                {/* <span>Copyright &copy; 2021 Kanini. All rights reserved</span> */}
            </div>
            <div className="links">
                <h1>Contact Us</h1>
                <div>
                    <Contact />
                </div>
            </div>
            <div > 
                <h4>Follow Us :</h4>  <br/>        
             <ul className="social__links">
                <li>
                    <FacebookIcon fontSize="large" />
                </li>
                <li>
                    <InstagramIcon fontSize="large" />
                </li>
                <li>
                    <YouTubeIcon fontSize="large" />
                </li>
                <li>
                    <TwitterIcon fontSize="large" />
                </li>
            </ul>

<br /> <br/>

            <h4>Call Us : </h4><br/>
            <p>6369247198</p><br/><br/>
            <h4>Mail Us : </h4><br/>
            <p>sathyan.kanini@gmail.com</p>
            </div>

        </FooterContainer>
    );
}

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-evenly;
  background-color: lightblue; /* Reduced background color */
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
        font-size: 2rem; /* Increased icon size */
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
  }`;
