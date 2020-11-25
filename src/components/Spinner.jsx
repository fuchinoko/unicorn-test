import React from 'react';
import styled, { keyframes } from 'styled-components';

const load3 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const SpinnerStyle = styled.div`
  font-size: 10px;
  margin: 100px auto;
  text-indent: -9999em;
  width: 11em;
  height: 11em;
  border-radius: 50%;
  background: #d1d1d1;
  background: linear-gradient(to right, #d1d1d1 10%, rgba(255, 255, 255, 0) 42%);
  position: relative;
  -webkit-animation:  ${load3} 1.4s infinite linear;
  animation: ${load3} 1.4s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);

&:before {
  width: 50%;
  height: 50%;
  background: #d1d1d1;
  border-radius: 100% 0 0 0;
  position: absolute;
  top: 0;
  left: 0;
  content: '';
}

&:after {
  background: #fff;
  width: 75%;
  height: 75%;
  border-radius: 50%;
  content: '';
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

`;

const Spinner = () => (
  <SpinnerStyle />
);

export default Spinner;
