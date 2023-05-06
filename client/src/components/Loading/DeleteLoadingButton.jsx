import {CircleDashed} from "@phosphor-icons/react";
import styled, { keyframes } from "styled-components";

const DeleteLoadingButton = () =>{
    return <Loading><CircleDashed size={40} /></Loading>
}

const rotate = keyframes`
    0%{
        transform: rotate(0deg);
    }
    50%{
        transform: rotate(180deg);
    }
    100%{
        transform: rotate(360deg);
    }
`

const Loading = styled.div`
    animation: ${rotate} infinite 1s linear;
`

export default DeleteLoadingButton;