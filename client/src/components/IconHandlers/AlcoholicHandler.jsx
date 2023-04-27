import styled from "styled-components";

const AlcoholicPictureHandler = ({ Alcoholic }) => {
  if (Alcoholic === "Alcoholic") {
    return (
      <Icon src="https://res.cloudinary.com/dgy6nwt6m/image/upload/v1682203211/margarita_nkd0fh.png" />
    );
  }
  if (Alcoholic === "Non alcoholic" || "Non Alcoholic") {
    return (
      <Icon src="https://res.cloudinary.com/dgy6nwt6m/image/upload/v1682203199/non-alcoholic_vymeuh.png" />
    );
  }
  
};

const Icon = styled.img`
  width: 50px;
`;

export default AlcoholicPictureHandler;
