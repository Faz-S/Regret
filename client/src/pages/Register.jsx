import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background: #000;
`;

const SubContainer = styled.div`
  background: #000;
  backdrop-filter: blur(10px);
  border: 1px solid #fff;
  min-height: 50vh;
  width: 30rem;
  border-radius: 2rem;
`;

const Input = styled.input`
  width: 70%;
  padding: 7px;
  margin: 1rem 0;
  background: #000;
  outline: none;
  border: 1px solid #009999;
  color: #fff;
`;

const InputHolder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Button = styled.button`
  width: 70%;
  height: 60px;
  margin: 1rem 0;
  border-radius: 29px;
  background: #fff;
  color: #000;
  font-weight: bold;
  font-size: 20px;
  transition: all 0.4s ease;
  &:active {
    transform: scale(0.9);
  }
`;

const Span = styled.span`
  padding: 0 0 4px 7px;
  text-decoration: underline;
  text-underline-offset: 4px;
  cursor: pointer;
`;

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/user/register', {
        username,
        email,
        password,
      });

      setMessage(response.data.message || 'Registration successful');
      navigate('/');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Container style={{ fontFamily: 'Neue' }}>
      <SubContainer>
        <p
          style={{
            fontSize: '40px',
            fontWeight: 'bolder',
            textAlign: 'center',
            padding: '1rem 0',
          }}
        >
          Register
        </p>
        <div className="bg-black flex flex-col items-center p-[1rem] gap-2 rounded-full">
          <input
            className="w-full text-xl text-center bg-black py-3 px-5 outline-none border-t-[1px]"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="w-full text-xl text-center bg-black py-3 px-5 outline-none border-t-[1px]"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full text-xl text-center bg-black py-3 px-5 outline-none border-b-[1px]"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleRegister}>Register</Button>
          {message && (
            <p style={{ margin: '1rem 0', color: 'green' }}>{message}</p>
          )}
          {errorMessage && (
            <p style={{ margin: '1rem 0', color: 'red' }}>{errorMessage}</p>
          )}
          <p style={{ padding: '1.5rem' }} className="text-xl">
            Already have an account?{' '}
            <Span onClick={() => navigate('/')}>Login</Span>
          </p>
        </div>
      </SubContainer>
    </Container>
  );
};

export default Register;
