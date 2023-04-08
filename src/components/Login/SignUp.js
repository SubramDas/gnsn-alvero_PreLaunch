import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import loginpic from "../../images/loginpic.jpg";
import gnsnimg from "../../images/GnsnAlvero.png";

// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../firebase-config";
import { useAuth } from "../../contexts/AuthContext";
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from "react-router-dom";
import {FcGoogle} from 'react-icons/fc'
import {BsApple} from 'react-icons/bs'
import facebook from '../../images/facebook.png'


//Styles
const Container = styled.div`
  width: 1728px;
  height: 1117px;
  display: grid;
  grid-template-areas: "left right";
  grid-template-columns: 0.83fr 1fr;
`;

const Section = styled.section`
  grid-area: "left";
  ${(props) =>
    props.left &&
    css`
      border: 2px solid black;
      text-align: center;
      font-size: 50px;
      padding: 25rem 0px;
    `}

  ${(props) =>
    props.right &&
    css`
      grid-area: "right";
      /* border: 2px solid blue; */
      padding: 2em;
      font-size: 30px;
      padding-right: 0px;
      margin-top: 5em;
      margin-left: 1em;
    `}
`;

const Img = styled.img`
  position: absolute;
  width: 864px;
  height: 1117px;
  left: 0px;
  top: 0px;
`;

const Input = styled.input`
  padding: 1rem;
  width: 645px;
  font-size: 30px;
  display: flex;
  flex-direction: column;
  margin: 1em;
  border: 0px;
  border-top: 2px solid black;
`;

const Button = styled.button`
  font-size: 30px;
  line-height: 36px;
  text-align: center;
  width: 363px;
  margin-left: 2rem;
  padding: 1rem;
`;

function SignUp() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const { signup } = useAuth();
  
  const { googleSignIn, currentUser, fbSignIn } =useAuth()
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate =useNavigate()

// handleSubmit if done through usual email, id
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate('/login')
    } catch (error) {
      setError("Failed To Create Account");
    }
    setLoading(false);
  };
 //end 

  //google sign in
  const handleGoogleSignIn =async ()=>{
    try{
      setError("");
      setLoading(true);
      await googleSignIn()
      // navigate('/login/loggedin')
    }catch(error){
      setError("Failed To Create Account");
      
    }
    setLoading(false);
  }
// end

//fb sign in
const handlefbSignIn =async ()=>{
  try{
    setError("");
    setLoading(true);
    await fbSignIn()
    // navigate('/login/loggedin')
  }catch(error){
    setError("Failed To Create Account");
    
  }
  setLoading(false);
}

//end


  useEffect(()=>{
    if(currentUser!=null){
        navigate('/login/loggedin')
    }

  },[currentUser])

  return (
    <Container>
      <Logo>
        <GnsnWrapper src={gnsnimg}></GnsnWrapper>
      </Logo>
      <Section left>
        <Img src={loginpic}></Img>
      </Section>

      <Section right>
        <span style={{ marginLeft: "1em", marginBottom: "5em" }}>
          Already have an account?{" "}
          <Link style={{ textDecoration: "none" }} to={"/login"}>
            Login
          </Link>
        </span>
        <div>
        {error && <Alert variant="danger">{error}</Alert>}
          <Input type={"text"} placeholder={"Email"} ref={emailRef}></Input>
          <Input
            type={"password"}
            placeholder={"Password"}
            ref={passwordRef}
          ></Input>
          <Link to={"/login"}>
            <Button type="submit" onClick={handleSubmit} disabled={loading}>
              Submit
            </Button>
          </Link>
        </div>

         <FcGoogle style={{ position: 'absolute', top: '730px', left: '1300px',  width: '6vw',     height: '8vh'}} onClick={handleGoogleSignIn} disabled={loading}/>
         <Facebook src={facebook} style={{ position: 'absolute', top: '734px', left: '1421px',  width: '5vw',     height: '8vh'}} onClick={handlefbSignIn} disabled={loading}></Facebook>    
         <BsApple style={{ position: 'absolute', top: '718px', left: '1530px',  width: '5vw',     height: '8vh'}}/>
        


      </Section>
    </Container>
  );
}

const IconContainer =styled.div`
    position:absolute;
    width: 50vw;
    height: 30px;
    
`
const Googles =styled.div`
position:absolute;
    width: 50vw;
    height: 30px;
    top: 833px;
    left: 1295px;
`

const Facebook =styled.img`
position:absolute;
    width: 50vw;
    height: 30px;
    top: 833px;
    left: 1295px;

`
// const IconContainer =styled.div`
// `


const Logo = styled.div`
  z-index: 2;
  position: absolute;
  width: 568px;
  height: 100px;
  left: 580px;
  top: 35px;
`;

const GnsnWrapper = styled.img`
  filter: brightness(0);
  z-index: 2;
  /* position: absolute; */
  width: 568px;
  height: 100px;
  /* left: 580px; */
  /* top: 15px; */
  font-family: "Otto Attac Type";
  font-style: normal;
  font-weight: 400;
  font-size: 100px;
  line-height: 100px;
  /* identical to box height */

  text-align: center;

  color: #f0f5f9;
`;
export default SignUp;
