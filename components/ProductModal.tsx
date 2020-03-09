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
    const price = formRef.current.price.value;

    // Do something with email
    const serializedBody = encode({
      "form-name": "product-request",
      "bot-field": "",
      brand,
      productName,
      category,
      url,
      price,
    });

    await fetch(e.target.action, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: serializedBody
    });

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
            <input type="text" name="category" placeholder="Category"></input>
          </InputGroup>

          <InputGroup>
            <label>Ingredients URL*</label>
            <input type="text" name="url" placeholder="https://www.brand.com/product"></input>
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
        <input type="text" name="category" placeholder="Category"></input>
      </InputGroup>

      <InputGroup>
        <label>Ingredients URL*</label>
        <input type="text" name="url" placeholder="https://www.brand.com/product"></input>
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
  width: 600px;
  margin: 64px auto;
  padding: 48px;
  box-sizing: border-box;
  max-height: 90vh;
  overflow-y: scroll;

  h2 {
    text-transform: uppercase;
    font-family: 'GintoNord';
    font-size: 18px;
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

  input {
    background: #FFFFFF;
    border: 1px solid #B1D9FF;
    box-sizing: border-box;
    border-radius: 8px;
    font-size: 18px;
    padding: 12px;
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