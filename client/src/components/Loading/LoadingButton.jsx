import styled, { keyframes } from "styled-components";


const LoadingButton = () =>{
    return  <DotLoading></DotLoading>
}


const dotLoading = keyframes`
    0% {
        background-color: #54827b;
    }
    50%, 100% {
        background-color: rgba(6, 78, 39, 0.2);
    }
`

const DotLoading = styled.div`
    position: absolute;
    bottom: 7%;
    right: 8%;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #54827b;
    color: rgba(6, 78, 39, 0.2);
    animation: ${dotLoading} 1s infinite linear alternate;
    animation-delay: 0.5s;
  ::before {
    content: "";
display: inline-block;
position: absolute;
top: 0;
  left: -15px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #54827b;
  color: rgba(6, 78, 39, 0.2);
  animation: ${dotLoading} 1s infinite alternate;
  animation-delay: 0s;
}
::after {
    content: "";
display: inline-block;
position: absolute;
top: 0;
  left: 15px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #54827b;
  color: rgba(6, 78, 39, 0.2);
  animation: ${dotLoading} 1s infinite alternate;
  animation-delay: 1s;
}
`

export default LoadingButton