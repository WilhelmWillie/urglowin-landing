import { useEffect, useRef } from "react";
import styled from "styled-components";
import { useToasts } from 'react-toast-notifications'

import encode from "../utils/Encode";

type Props = {
  isOpen: boolean;
  closeModal: Function;
}

const ProductModal = ({ isOpen, closeModal } : Props) => {
  const { addToast } = useToasts();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }
  }, [isOpen]);

  const formRef = useRef(null);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    const brand = formRef.current.brand.value;
    const productName = formRef.current.productName.value;
    const category = formRef.current.category.value;
    const url = formRef.current.url.value;
    const usedFor = formRef.current.usedFor.value;
    const price = formRef.current.price.value;

    // Check that required stuff is filled out
    if ([
      brand.trim(),
      productName.trim(),
      category.trim(),
      url.trim()
    ].includes("")) {
      addToast('Please fill out all required fields', { appearance: 'error' })
      return;
    }

    // Do something with email
    const serializedBody = encode({
      "form-name": "product-request",
      "bot-field": "",
      brand,
      productName,
      category,
      url,
      usedFor,
      price,
    });

    await fetch(e.target.action, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: serializedBody
    });

    closeModal();
    addToast('Product request successfully submitted ✨', { appearance: 'success' })
  }

  return isOpen ? (
    <BlackOverlay>
      <ProductForm>
        <FormHeader>
          <h2>Request new product</h2>
          <CloseButton onClick={closeModal}>Close</CloseButton>
        </FormHeader>
        
        <form
          onSubmit={handleSubscribe}
          name="product-request"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          ref={formRef}
        >
          <InputGroup>
            <label>Brand*</label>
            <input type="text" name="brand" placeholder="Brand Name"></input>
          </InputGroup>
          
          <InputGroup>
            <label>Product Name*</label>
            <input type="text" name="productName" placeholder="Product Name"></input>
          </InputGroup>

          <InputGroup>
            <label>Category*</label>

            <select name="category">
              <option value=""></option>
              <option value="essence">Essence</option>
              <option value="toner">Toner</option>
              <option value="cleanser">Cleanser</option>
              <option value="moisturizer">Moisturizer</option>
              <option value="acid">Acid</option>
              <option value="serum">Serum</option>
              <option value="suncare">Suncare</option>
            </select>
          </InputGroup>

          <InputGroup>
            <label>Ingredients URL*</label>
            <input type="text" name="url" placeholder="https://www.brand.com/product"></input>
          </InputGroup>

          <InputGroup>
            <label>Used for</label>

            <select name="usedFor">
              <option value=""></option>
              <option value="dryness">Dryness</option>
              <option value="oiliness">Oiliness</option>
              <option value="acne">Acne</option>
              <option value="scarring">Scarring</option>
              <option value="anti-aging">Anti-Aging</option>
              <option value="uneven-skin">Uneven Skin Tone</option>
              <option value="toning">Toning</option>
              <option value="exfoliation">Exfoliation</option>
              <option value="cleansing">Cleansing</option>
              <option value="redness">Redness</option>
              <option value="dark-circles">Dark Circles</option>
              <option value="wrinkles">Wrinkles</option>
            </select>
          </InputGroup>

          <InputGroup>
            <label>Regular Price</label>
            <input type="text" name="price" placeholder="19.99"></input>
          </InputGroup>

          <SubmitButton type="submit">Submit Product for Review</SubmitButton>

          <input type="hidden" name="bot-field" />
          <input type="hidden" name="form-name" value="product-request" />
        </form>
      </ProductForm>
    </BlackOverlay>
  ) : (
    <HiddenForm
      onSubmit={handleSubscribe}
      name="product-request"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      ref={formRef}
    >
      <InputGroup>
        <label>Brand*</label>
        <input type="text" name="brand" placeholder="Brand Name"></input>
      </InputGroup>
      
      <InputGroup>
        <label>Product Name*</label>
        <input type="text" name="productName" placeholder="Product Name"></input>
      </InputGroup>

      <InputGroup>
        <label>Category*</label>

        <select name="category">
          <option value="essence">Essence</option>
          <option value="toner">Toner</option>
          <option value="cleanser">Cleanser</option>
          <option value="moisturizer">Moisturizer</option>
          <option value="acid">Acid</option>
          <option value="serum">Serum</option>
          <option value="suncare">Suncare</option>
        </select>
      </InputGroup>

      <InputGroup>
        <label>Ingredients URL*</label>
        <input type="text" name="url" placeholder="https://www.brand.com/product"></input>
      </InputGroup>

      <InputGroup>
        <label>Used for</label>

        <select name="usedFor">
          <option value="dryness">Dryness</option>
          <option value="oiliness">Oiliness</option>
          <option value="acne">Acne</option>
          <option value="scarring">Scarring</option>
          <option value="anti-aging">Anti-Aging</option>
          <option value="uneven-skin">Uneven Skin Tone</option>
          <option value="toning">Toning</option>
          <option value="exfoliation">Exfoliation</option>
          <option value="cleansing">Cleansing</option>
          <option value="redness">Redness</option>
          <option value="dark-circles">Dark Circles</option>
          <option value="wrinkles">Wrinkles</option>
        </select>
      </InputGroup>

      <InputGroup>
        <label>Regular Price</label>
        <input type="text" name="price" placeholder="19.99"></input>
      </InputGroup>

      <SubmitButton type="submit">Submit Product for Review</SubmitButton>

      <input type="hidden" name="bot-field" />
      <input type="hidden" name="form-name" value="product-request" />
    </HiddenForm>
  )
}

const BlackOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0,0,0,0.75);
  overflow: hidden;
`;

const ProductForm = styled.div`
  background: #FFFFFF;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  margin: 5vh auto;
  padding: 48px;
  box-sizing: border-box;
  max-height: 90vh;
  overflow-y: scroll;

  h2 {
    text-transform: uppercase;
    font-family: 'GintoNord';
    font-size: 18px;
  }

  @media screen and (max-width: 768px) {
    margin: 0;
    width: 100%;
    min-height: 100vh;
    border-radius: 0;
  }
`;

const HiddenForm = styled.form`
  display: none;
`;

const FormHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  paddding: 0;
  font-size: 18px;
  color: #3298F9;

  &:hover {
    cursor: pointer;
  }
`;

const InputGroup = styled.div`
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 8px;
    font-size: 18px;
  }

  input, select {
    background: #FFFFFF;
    border: 1px solid #B1D9FF;
    box-sizing: border-box;
    border-radius: 8px;
    font-size: 18px;
    padding: 12px;
  }

  select {
    height: 48px;
    -webkit-appearance: none;
  }
`;

const SubmitButton = styled.button`
  background: #3298F9;
  border: 1px solid #3298F9;
  box-sizing: border-box;
  border-radius: 8px;
  color: #FFFFFF;
  font-size: 18px;
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
`;

export default ProductModal;