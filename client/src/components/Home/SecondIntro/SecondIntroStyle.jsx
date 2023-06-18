import styled ,{css, keyframes} from "styled-components";
import { Link } from "react-router-dom";
import { device } from "../../DeviceSize/device";

export const TitleContainer = styled.div`
    width: 39%;
    height: 52.6%;
    position: absolute;
    background-color: #bec4ab;
    left: 31%;
    z-index:0;
    
`

const typing = keyframes`
    from{
        width:0%;
    }
    to{
        width:90%;
    }
`

const blinkingCursor = keyframes`
    0%{
        border-color: transparent;
    }
    50%{
        border-color: #425047;
    }
    100%{
        border-color:transparent;
    }
`

export const Title = styled.div`
    border-right: 5px solid #425047;
    white-space: nowrap;
    font-size: 20px;
    position: absolute;
    top: -25%;
    padding-left: 1%;
    overflow: hidden;
    animation: ${typing} 2s steps(30) ,${blinkingCursor} 0.8s step-end infinite;
    @media ${device.tablet}{
        font-size: 80px;
    }
    @media ${device.laptop}{
        font-size: 80px;
    }
    @media ${device.desktop}{
        font-size: 80px;
    }
`

export const SecondTitle = styled.div`
    font-size: 20px;
    display: flex;
    padding: 3%;
    font-family: "Lexend Deca";
`
export const ThirdTitle = styled.div`
    font-size: 30px;
    display: flex;
    padding: 3%;
    font-family: "Titillium Web";
`

export const Content = styled.div`
    padding: 0 3%;
    line-height: 50px;
    font-family: "Titillium Web";
    font-size: 20px;
`

export const Explore = styled(Link)`
    margin: 3%;
    display: flex;
    height: 30px;
    font-size:40px ;
    align-items: flex-end;
    justify-content: center;
    gap: 1%;
    font-family: "Patrick Hand";
    color: #49571b;
    &:hover{
        cursor: pointer;
        color: white;
    }
`

export const Num = styled.span`
    display: flex;
    align-items: center;
    color: #bfecdf;
    -webkit-text-stroke: #08361b;
	-webkit-text-stroke-width: 3px;
`

const sideUp = keyframes`
    from {
        opacity: 0.3;
        transform: translateY(20%);
    }

    to {
        opacity: 1;
    transform: translate(0);
    }
`

export const PictureTwo = styled.img`
    position: absolute;
    width: 20%;
    height: 70%;
    object-fit: cover;
    left: 70%;
    padding-left: 1%;
    padding-bottom: 1%;
    border-left: 1px solid green ;
    border-bottom: 1px solid green ;
    z-index:1;
    animation: ${props=>props.isPlayed && css`${sideUp} 0.8s ease-in 1 forwards`};
`


export const Wrapper = styled.div`
    height: 85vh;
    color: black;
    display: flex;
    justify-content: center;
    position: relative;
    margin-top: 18%;
`

const sideIn = keyframes`
    from {
        opacity: 0.3;
        transform: translateY(-20%);
    }

    to {
        opacity: 1;
    transform: translate(0);
    }
`

export const Picture = styled.img`
    width: 20%;
    height: 70%;
    object-fit: cover;
    position: absolute;
    top: -20%;
    left: 10%;
    padding-right: 1%;
    padding-bottom: 1%;
    border-right: 1px solid green ;
    border-bottom: 1px solid green ;
    z-index:1;
    animation: ${props=>props.isPlayed && css`${sideIn} 0.5s ease-in 1 forwards`};
`