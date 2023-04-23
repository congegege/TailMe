import { useContext } from "react";
import styled from "styled-components";
import { CommunityContext } from "../Context/CommunityContext";

const StepBar = () =>{
    const {currentPage} = useContext(CommunityContext)
    return (
        <Wrapper>
            <Progress>
                <Step isCurrent={currentPage+1 ==1 ? true : false} precentage={0}><Picture src="https://res.cloudinary.com/dgy6nwt6m/image/upload/v1682224066/signature_cve6qy.png"/></Step>
                <Step isCurrent={currentPage+1 ==2 ? true : false} precentage={50}><Picture src="https://res.cloudinary.com/dgy6nwt6m/image/upload/v1682225129/shaker_1_wtptym.png"/></Step>
                <Step isCurrent={currentPage+1 ==3 ? true : false} precentage={100}><Picture src="https://res.cloudinary.com/dgy6nwt6m/image/upload/v1682225135/photo_dr2ngf.png"/></Step>
            </Progress>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    cursor: auto;
    width: 15%;
    height: 100%;
    background-color: rgb(179, 188, 178,0.9);
    clip-path: polygon(30px 0,
            calc(100% - 30px) 0,
            100% 0px,
            100% calc(100% ),
            calc(100% - 30px) 100%,
            30px 100%,
            0 calc(100% - 30px),
            0 30px);
            display:flex ;
            align-items: center;
            justify-content: center;
`

const Progress = styled.div`
    height: 60% ;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: relative;
    background-color: #727d71;
    width: 5px;
`

const Step = styled.div`
width: 40px;
height: 40px;
background-color: #fdfdfdf3;
border-radius: 50%;
display: flex;
border: ${props => props.isCurrent ? "3px solid #656e54" : "3px solid white"}  ;
box-shadow: ${props => props.isCurrent && "0px 0px 8px #e9edc9"};
`

const Picture = styled.img`
    width: 30px;
    margin:auto;
    opacity: 0.5;
`

export default StepBar;