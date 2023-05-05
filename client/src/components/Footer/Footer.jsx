import styled from "styled-components";
import { Link } from "react-router-dom";
import { GithubLogo , CaretUp } from "@phosphor-icons/react";


const Footer = () =>{
    return (
    <Wrapper>
        <SectionOne>
            <FooterLink>Policy</FooterLink>
            <FooterLink>Terms</FooterLink>
        </SectionOne>
        
        <LogoSection>
            <Logo to={"/"} src="https://cdn.discordapp.com/attachments/688213778206294154/1102081298312462356/Aegyoking_minimalist_cocktail_with_a_wizard_hat_and_a_magical_s_2eee772e-47e1-4886-9bc9-954a47860ca0-removebg-preview.png"/>
            <WebName to={"/"}>Tail.Me</WebName>
        </LogoSection>

        <SectionTwo>
            <FooterLink>Contact</FooterLink>
            <GithubLink to={"https://github.com/congegege/Final-Project"}><GithubLogo size={40} />Github</GithubLink>
        </SectionTwo>

        <GoUp onClick={()=>{window.scrollTo({ top: 0, behavior: "smooth" })}}><CaretUp size={40} /></GoUp>
    </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    height: 150px;
    background-color: #39403d;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
`

const SectionOne = styled.div`
    display: flex;
    gap: 5%;
    width: 10%;
    padding-left: 50px;
`

const LogoSection = styled.div`
    display: flex;
    align-items: center;
`

const Logo = styled.img`
    width: 120px;
    height: 120px;
    filter: brightness(200%) contrast(90%);
    
`

const SectionTwo = styled.div`
    display: flex;
    gap: 10%;
    width: 10%;
    padding-right: 50px;
    align-items: center;
`

const WebName = styled(Link)`
    font-family: "Patrick Hand";
    font-size: 43px;
    color: #ecfdba;
    &:hover{
        color: #c7ffce;
    }
`

const FooterLink = styled(Link)`
    font-family: "Patrick Hand";
    font-size: 25px;
    color: #ecfdba;
    &:hover{
        color: #c7ffce;
    }
`

const GithubLink = styled(Link)`
    color:#ecfdba;
    &:hover{
        color: #c7ffce;
    }
`

const GoUp = styled.div`
    position: absolute;
    right: 20px;
    top: 15px;
    color:#ecfdba;
    display: flex;
    align-items: center;
    &:hover{
        cursor: pointer;
        color: #c7ffce;
        background-color: #346d83;
        border-radius: 50%;
    }
`

export default Footer