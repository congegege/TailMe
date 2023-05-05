import styled, { keyframes } from "styled-components"

const Loading = () =>{
    return (
        <Wrapper>
            <IconContainer>
            <Icon index={1} src="https://res.cloudinary.com/dgy6nwt6m/image/upload/v1683260400/cocktail_2_fge0dx.png"/>
            <Icon index={2} src="https://res.cloudinary.com/dgy6nwt6m/image/upload/v1683260407/drink_1_ffhczk.png"/>
            <Icon index={3} src="https://res.cloudinary.com/dgy6nwt6m/image/upload/v1683260441/beer_1_mezl6m.png"/>
            </IconContainer>
            <Progress>
                <ProgressBar></ProgressBar>
            </Progress>
        </Wrapper>
    )
        
}

const Wrapper = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #588157;
    gap: 10%;
`

const IconContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2%;
`

const bounce = keyframes`
    to{
        transform:translateY(0)
    }
`

const Icon = styled.img`
    width:5%;
    transform: translateY(50px);
    animation: ${bounce} 0.5s  infinite alternate-reverse;
    animation-delay: calc(${props=>props.index }* 0.06s);
`

const progressing = keyframes`
    0%{
        width: 0%;
    }
    10%{
        width:20%;
    }
    25%{
        width: 50%;
    }
    50%{
        width: 75%;
    }
    75%{
        width: 85%;
    }
    100%{
        width: 100%;
    }
`;

const Progress = styled.div`
    width: 20%;
    height: 40px;
    border: #0b562d 5px solid;
    border-radius: 50px;
    position: relative;
`

const ProgressBar = styled.div`
    position: absolute;
    background-color: #adebd5;
    width: 0%;
    height: 40px;
    border-radius: 50px;
    animation: ${progressing} 5s  linear;
    animation-fill-mode: forwards;
`

export default Loading