import styled from "styled-components";
import Head from "next/head";

// Assets
import Logo from "../assets/logo.svg";
import Instagram from "../assets/instagram.svg";
import BlueRec from "../assets/blue-rect.svg";
import BlueCirc from "../assets/blue-circle.svg";

const Home = () => (
  <>
    <Head>
      <title>URGLOWIN - Hey, you're glowing!</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta
        name="description"
        content={
          "We're getting ready to help you navigate the wide world of skincare and what works for you."
        }
      ></meta>

      <meta property="og:url" content="https://urglow.in" />
      <meta property="og:title" content={"URGLOWIN - Hey, you're glowing!"} />
      <meta
        property="og:description"
        content={
          "We're getting ready to help you navigate the wide world of skincare and what works for you."
        }
      />

      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-125571056-4"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-125571056-4');
        `
        }}
      />

      <link rel="icon" type="image/png" href="/favicon.png" />
    </Head>

    <Overflow>
      <Header>
        <WideContainer>
          <HeaderLogo src={Logo} />
        </WideContainer>
      </Header>

      <Main>
        <MainContainer>
          <MainColumn>
            <h1>Hey, you're glowing! ✨</h1>

            <p>We're getting ready to help you navigate the wide world of skincare and what works for <b>you.</b></p>

            <p>We're not quite there yet, but you can sign up for any updates or even contribute to the growing list of products!</p>

            <Subscribe>
              <SubscribeEmailInput type="email" placeholder="Email"></SubscribeEmailInput>
              <SubscribeButton>Subscribe!</SubscribeButton>
            </Subscribe>

            <NewProductLink href="#">Request New Product →</NewProductLink>
          </MainColumn> 

          <DetailsColumn>
            <BlueRecImg src={BlueRec} />
            <BlueCirImg src={BlueCirc} />
            <GorlImg src="/gorl.jpg" /> 
            <ProductCardA src="/prod_card_1.png" />
            <ProductCardB src="/prod_card_2.png" />
          </DetailsColumn>
        </MainContainer>
      </Main>
    </Overflow>

    <Footer>
      <FooterContainer>
        <FooterLogo src={Logo} />

        <FooterContent>&copy; 2020 URGLOWIN. All rights reserved.</FooterContent>

        <FooterSocialLink href="https://www.instagram.com/urglow.in/" target="_blank">
          <FooterSocial src={Instagram} />
        </FooterSocialLink>
      </FooterContainer>
    </Footer>
  </>
);

const Overflow = styled.div`
  overflow: hidden;
`;

const Header = styled.div`
  padding: 32px 0;
`;

const Main = styled.div`
  z-index: -1;
`;

const Footer = styled.div`
  padding: 32px 0;
  background: #F7F7F7;
  z-index: 1; 
`;

// Utility
const WideContainer = styled.div`
  width: 96%;
  margin: 0 auto;
`;

const Container = styled.div`
  width: 93.75%;
  max-width: 960px;
  margin: 0 auto;
`;

// Header
const HeaderLogo = styled.img`
  width: 215px;
`;

// Main
const MainContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  padding: 80px 0px 350px; 
  z-index: -1;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const MainColumn = styled.div`
  flex-basis: 48%;

  h1 {
    margin-bottom: 28px;
  }

  p {
    margin-bottom: 18px;
  }
`;

const Subscribe = styled.div`
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

const NewProductLink = styled.a`
  color: #FFAE73;
  text-decoration: none;
  border-bottom: 1px solid #FFAE73;
  margin-top: 32px;
  padding: 0px 4px 4px;
  display: inline-block;
`;

const DetailsColumn = styled(MainColumn)`
  position: relative;
  z-index: -1;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const BlueRecImg = styled.img`
  position: absolute;
  top: -150%;
  width: 250%;
  z-index; -1; 
`;

const BlueCirImg = styled.img`
  position: absolute;
  top: -35%;
  width: 70%;
  z-index; -1;
`;

const GorlImg = styled.img`
  z-index: 1;
  position: absolute;
  width: 75%;
  left: 25%;
  border-radius: 4px;
  overflow: hidden;
`;

const ProductCardA = styled.img`
  position: absolute;
  z-index: 15;
  top: 300px;
  max-width: 320px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const ProductCardB = styled.img`
  position: absolute;
  z-index: 15;
  top: 450px;
  left: 200px;
  max-width: 200px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

// Footer
const FooterContainer = styled(WideContainer)`
  display: flex;
  flex-direction: row;
`;

const FooterLogo = styled.img`
  flex-shrink: 1;
`;

const FooterContent = styled.p`
  flex-grow: 1;
  padding: 0px 15px;
`;

const FooterSocialLink = styled.a`
`;

const FooterSocial = styled.img`
  flex-shrink: 1;
`;

export default Home;
