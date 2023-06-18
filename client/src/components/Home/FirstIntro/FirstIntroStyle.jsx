import styled, { keyframes } from "styled-components";
import { device } from "../../DeviceSize/device";
import { Link } from "react-router-dom";

const scrollingOne = keyframes`
0% {
transform: translateX(-100%)
}
100% {
transform: translateX(100%)
}
`
const scrollingTwo = keyframes`
0% {
left: -100%;
}
100% {
left: 100%;
}
`
const scrollingThree = keyframes`
0% {
opacity: 1;
left: -100%;
}
100% {
opacity: 1;
left: 100%;
}
`

export const TextOne = styled.span`
display: inline-block;
font-size: 30px;
-webkit-text-stroke: #2e3e34;
-webkit-text-stroke-width: 1px;
font-family: 'Segoe UI', sans-serif;
animation: ${scrollingOne} 3s linear infinite ;

`

export const TextTwo = styled(Link)`

display: inline-block;
color: #e9edc9;
font-size: 20px;
font-family: 'Segoe UI', sans-serif;


&:hover{
    cursor: pointer;
    color: white;
}
`

export const Inner = styled.div`
width: 100%;
position: absolute;
display: flex;
justify-content: space-around;
animation: ${scrollingTwo} 20s linear infinite ;
animation-play-state: ${props=>props.ishover && "paused"};
`
export const InnerTwo = styled.div`
opacity: 0;
width: 100%;
position: absolute;
display: flex;
justify-content: space-around;
animation-delay: 10s;
animation: ${scrollingThree} 20s linear 10s infinite ;
animation-play-state: ${props=>props.ishover && "paused"};
`

export const CrossOne = styled.div`
box-sizing: border-box;
white-space: nowrap;
overflow: hidden;
position: absolute;
bottom: 3px;
width: 100%;
height: 40px;
background-color: #ffffff;
transform: skewY(5deg);
display: flex;
align-items: center;
color: transparent;
justify-content: space-around;
@media ${device.tablet}{
    height: 70px;
    transform: skewY(3deg);
}
@media ${device.laptop}{
    height: 70px;
    transform: skewY(3deg);
}
@media ${device.desktop}{
    height: 70px;
    transform: skewY(3deg);
}
`

export const CrossTwo = styled.div`
box-sizing: border-box;
white-space: nowrap;
overflow: hidden;
position: absolute;
bottom: 2px;
width: 100%;
height: 40px;
background-color: #262726;
transform: skewY(-3deg);
display: flex;
align-items: center;
justify-content: space-around;
cursor: pointer;
@media ${device.tablet}{
    height: 70px;
}
@media ${device.laptop}{
    height: 70px;
}
@media ${device.desktop}{
    height: 70px;
}
&:hover{
    color: white;
}
`

export const Wrapper = styled.div`
width: 100%;
display: grid;
position: relative;
grid-template-columns: 3fr 4fr 3fr;
align-items: center;
justify-content: center;
height: 45vh;
@media ${device.tablet}{
    height: 75vh;
}
@media ${device.laptop}{
    height: 75vh;
}
@media ${device.desktop}{
    height: 75vh;
}
`

export const TextSection = styled.div`
align-self: center;
justify-content: center;
display: flex;
flex-direction: column;
position: relative;
height: 100%;
`

export const Title = styled.div`
font-size: 30px;
padding: 10%;
font-family: 'Bruno Ace', cursive;
color: white;
text-align:right;
@media ${device.tablet}{
    font-size: 100px;
}
@media ${device.laptop}{
    font-size: 100px;
}
@media ${device.desktop}{
    font-size: 100px;
}
`
export const SecondTitle = styled.div`
font-size: 30px;
padding: 10%;
font-family: 'Bruno Ace', cursive;
color: Black;
transform: rotate(180deg);
text-align: right;
position: absolute;
bottom: 20%;
left: -20%;
@media ${device.tablet}{
    font-size: 100px;
}
@media ${device.laptop}{
    font-size: 100px;
}
@media ${device.desktop}{
    font-size: 100px;
}
`

export const PictureContainer = styled.div`

`

export const DrinkPicture = styled.img`
width: 200px;

@media ${device.tablet}{
    width: 700px;
}
@media ${device.laptop}{
    width: 700px;
}
@media ${device.desktop}{
    width: 700px;
}



`
