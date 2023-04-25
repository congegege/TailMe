import styled from "styled-components";

const RateStringHandler = ({ averageRate }) => {
    
  if (1 <= averageRate) {
    if(averageRate<2){
        return (
            <RateComment>Horrible Taste</RateComment>
          );
    }
    else if(averageRate<3){
        return (
            <RateComment>Not that bad</RateComment>
          );
    }
    else if(averageRate<4){
        return (
            <RateComment>Taste pretty good</RateComment>
          );
    }
    else if(averageRate<5){
        return (
            <RateComment>Taste great!</RateComment>
          );
    }
    else if(averageRate=5){
        return (
           <RateComment>Taste like heaven!</RateComment>
          );
    }
    
  }
  
};

const RateComment = styled.p`
font-size: 25px;
font-family: "Architects Daughter";
`;

export default RateStringHandler;
