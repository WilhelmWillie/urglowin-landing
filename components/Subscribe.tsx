import { useRef } from "react";
import styled from "styled-components";
import { useToasts } from 'react-toast-notifications'

import encode from "../utils/Encode";

const Subscribe = () => {
  const { addToast } = useToasts();
  const emailInputRef = useRef(null);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (emailInputRef && emailInputRef.current) {
      const email = emailInputRef.current.value;

      // Do something with email
      const serializedBody = encode({
        "form-name": "email-subscribe",
        "bot-field": "",
        email
      });
  
      await fetch(e.target.action, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: serializedBody
      });

      addToast('You have successfully subscribed to URGLOWIN ✨', { appearance: 'success' })
    }
  }

  return (
    <SubscribeContainer 
      onSubmit={handleSubscribe}
      name="email-subscribe"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <SubscribeEmailInput name="email" type="email" placeholder="Email" ref={emailInputRef}></SubscribeEmailInput>
      <SubscribeButton type="submit">Subscribe!</SubscribeButton>

      <input type="hidden" name="bot-field" />
      <input type="hidden" name="form-name" value="email-subscribe" />
    </SubscribeContainer>
  )
}

const SubscribeContainer = styled.form`
  display: flex;
  flex-direction: row;
  border: 1px solid #FFAE73;
  border-radius: 6px;
  margin-top: 32px;
  overflow: hidden;
`;

const SubscribeEmailInput = styled.input`
  flex-grow: 1;
  padding: 14px;
  border: none;
  font-size: 18px;
  font-family: "MabroPro", sans-serif;

  &::placeholder {
    font-size: 18px;
    font-family: "MabroPro", sans-serif;
    color: #BBBBBB;
  }
`;

const SubscribeButton = styled.button`
  background-color: #FFAE73;
  border: none;
  color: #FFFFFF;
  padding: 14px 16px;
  font-size: 18px;
`;

export default Subscribe;