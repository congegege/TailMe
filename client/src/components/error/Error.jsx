import { Link } from "react-router-dom"
import styled from "styled-components"

const Error = () =>{
    return (
    <Wrapper>
        <Picture src="https://res.cloudinary.com/dgy6nwt6m/image/upload/v1683429694/broken-glass_kx7zql.png"/>
        <Text>Oh no...Something went off</Text>
        <Text>Please refresh the page to gice a try again</Text>
        <Text>or <Contact to="/contact">CONTACT US</Contact></Text>
    </Wrapper>
    )
}

const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    background-color: #dce0d9;
`

const Picture = styled.img`
    width: 70px;
`

const Text = styled.div`
    font-family: "Patrick Hand";
    font-size: 30px;
`

const Contact = styled(Link)`
    color: #588157;
    &:hover{
        color: black;
    }
`
export default Error