import styled from "styled-components";

const RateIconHandler = ({ averageRate }) => {
    
  if (1 <= averageRate) {
    if(averageRate<2){
        return (
            <Icon src="https://res.cloudinary.com/dgy6nwt6m/image/upload/v1682279790/dead_acvbc2.png" />
          );
    }
    else if(averageRate<3){
        return (
            <Icon src="https://res.cloudinary.com/dgy6nwt6m/image/upload/v1682279831/bored_hzhjey.png" />
          );
    }
    else if(averageRate<4){
        return (
            <Icon src="https://res.cloudinary.com/dgy6nwt6m/image/upload/v1682279790/happiness_aevdwe.png" />
          );
    }
    else if(averageRate<5){
        return (
            <Icon src="https://res.cloudinary.com/dgy6nwt6m/image/upload/v1682279790/happy_scnvl6.png" />
          );
    }
    else if(averageRate=5){
        return (
            <Icon src="https://res.cloudinary.com/dgy6nwt6m/image/upload/v1682279790/love_x1gvfd.png" />
          );
    }
    
  }
  
};

const Icon = styled.img`
    width: 100%;
`;

export default RateIconHandler;
