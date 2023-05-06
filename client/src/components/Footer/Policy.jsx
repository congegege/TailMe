import Header from "../Header/Header";
import styled from "styled-components";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import {ArrowLeft} from "@phosphor-icons/react"

const Policy = () =>{
    const navigate = useNavigate();


    return (
        <Wrapper>
            <Header/>
            <GoBackButton onClick={()=>navigate(-1)}><ArrowLeft size={40} /></GoBackButton>
            <PolicyContent>
                <Title>Privacy Policy</Title>
                <Content>
                    <SmallTitle>Information we collect</SmallTitle>
                    <Text>When you visit the "Tail Me" website, we may collect certain personally identifiable information, including but not limited to your name, email address, and any other information you voluntarily provide when interacting with our website.</Text>
                    <Text>We also collect non-personally identifiable information about your usage of our website. This may include the pages you visit, the time and date of your visits, and other statistics.</Text>
                    <SmallTitle>Use of the information</SmallTitle>
                    <Text>We use the collected information to provide you with the requested services, including displaying drink recipes, personalizing your experience, recording the preferences you have shared with us, provide you with information or advertising relating to our services. and improving our website's functionality and content.</Text>
                    <Text>We take appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. We will not sell, distribute, or lease your personal information to third parties. Any personal information we request from you will be safeguarded under current legislation.</Text>
                    <SmallTitle>Update</SmallTitle>
                    <Text>We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.</Text>
                </Content>
                <Title>Term of Service</Title>
                <Content>
                    <SmallTitle>User Eligibility</SmallTitle>
                    <Text>By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.</Text>
                    <SmallTitle>User generated content</SmallTitle>
                    <Text> "Tail Me" allow users to contribute content such as comments or recipe submissions. By submitting content, you grant "Tail Me" a non-exclusive, royalty-free license to use, modify, reproduce, distribute, and display the content for the purpose of providing and promoting our services.</Text>
                    <SmallTitle>Prohibited Actitvities</SmallTitle>
                    <Text>In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Service or of any related website, other websites, or the Internet; (h) to collect or track the personal information of others; (i) to spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or immoral purpose; or (k) to interfere with or circumvent the security features of the Service or any related website, other websites, or the Internet. We reserve the right to terminate your use of the Service or any related website for violating any of the prohibited uses.</Text>
                    <SmallTitle>Modification and Termination</SmallTitle>
                    <Text>We reserve the right to modify, suspend, or terminate our website or services at any time, with or without notice. We may also modify these Terms from time to time, and the updated Terms will be effective upon posting on our website. Your continued use of our services after the modifications indicate your acceptance of the updated Terms.</Text>
                </Content>
            </PolicyContent>
            <Footer/>
    </Wrapper>
    )
}

const Wrapper = styled.div`
    background-color: #e6e8e6;
    min-height: 100vh;
`

const GoBackButton = styled.div`
    position: absolute;
    left: 3%;
    margin-top: 2%;
    color: #08361b;
    padding: 5px;
    display: flex;
    align-items: center;

    &:hover{
        cursor: pointer;
        color: #f1faf5;
        background-color: #08361b9e;
        border-radius: 50%;
        
    }
`

const PolicyContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    margin: auto;
`


const Title = styled.h1`
    font-family: 'Bruno Ace', cursive;
    color: #113a31;
    text-align:right;
`

const Content = styled.div`
    font-family: 'Bruno Ace', cursive;
    color: #113a31;
    text-align:right;
    align-self: flex-end;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const SmallTitle = styled.div`
    font-size: 20px;
    margin-top: 10%;
`

const Text = styled.p`
    font-size: 20px;
    font-family:"Space Grotesk" ;
    word-wrap: break-word;
    text-align: left;
    line-height: 40px;
`

export default Policy;