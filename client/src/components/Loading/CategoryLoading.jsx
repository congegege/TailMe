import styled, { keyframes } from "styled-components"

const CategoryLoading = () =>{
    return (
        <Wrapper>
            
            <Icon index={1} src="https://res.cloudinary.com/dgy6nwt6m/image/upload/v1683260400/cocktail_2_fge0dx.png"/>
            <Icon index={2} src="https://res.cloudinary.com/dgy6nwt6m/image/upload/v1683260407/drink_1_ffhczk.png"/>
            <Icon index={3} src="https://res.cloudinary.com/dgy6nwt6m/image/upload/v1683260441/beer_1_mezl6m.png"/>
            
            
        </Wrapper>
    )
        
}

const Wrapper = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    gap: 3%;
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



export default CategoryLoading;