import { useContext } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import { CommunityContext } from '../Context/CommunityContext';
import {ArrowRight , ArrowLeft} from "@phosphor-icons/react";

const TextEditor = () =>{
    const {formData , setFormData , currentPage , setCurrentPage} = useContext(CommunityContext)

    return (
        <Wrapper>
        <Title>Instruction of {formData.strDrink}</Title>
        <Editor theme="snow"
        placeholder='Ingredients, steps, tools...'
        modules = {{
            toolbar:[
                [{ 'header': [1, 2,false]}],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'color': [] },],
                ['video']
            ],
        }}
        value={formData.post}
        onChange={(ev)=>{setFormData({...formData,"post":ev})}}
        />
        <ButtonSection>
            <Button type='button'>
                <ArrowLeft  onClick={()=>setCurrentPage(currentPage - 1)}>Pre</ArrowLeft>
            </Button>
            <Button type='button'>
                <ArrowRight  onClick={()=>setCurrentPage(currentPage + 1)}/>
            </Button>
        </ButtonSection>
        </Wrapper>
    ) 
    
}
export default TextEditor;

const Title = styled.h3`
margin-bottom: 10%;
font-family: "Comic Neue";
font-size: 30px;
`

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 38px;
    align-items: center;
`

const Editor = styled(ReactQuill)`
    height: 55%;
    width: 100%;
    padding: 5px;
    display: flex;
    flex-direction: column-reverse;
`

const ButtonSection = styled.div`
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 10px;
`

const Button = styled.button`
    background-color: transparent;
    font-size: 25px;
    &:hover{
        cursor: pointer;
    }
`