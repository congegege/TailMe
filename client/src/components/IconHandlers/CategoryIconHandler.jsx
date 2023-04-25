import styled from "styled-components";

const CategoryPictureHandler = ({ category }) => {
  if (category === "Beer") {
    return (
      <Icon src="https://res.cloudinary.com/dgy6nwt6m/image/upload/v1682274475/beer_klnpdb.png" />
    );
  }
  if (category === "Cocktail") {
    return (
      <Icon src="https://res.cloudinary.com/dgy6nwt6m/image/upload/v1682274475/cocktail_zb6kbm.png" />
    );
  }
  if (category === "Cocoa") {
    return (
      <Icon src="https://res.cloudinary.com/dgy6nwt6m/image/upload/v1682274587/cocoa_znrqoy.png" />
    );
  }
  if (category === "Coffee and Tea") {
    return <Icon src="https://res.cloudinary.com/dgy6nwt6m/image/upload/v1682277786/coffee-cup_mripiw.png" />;
  }
  if (category === "Homemade Liqueur") {
    return <Icon src="https://res.cloudinary.com/dgy6nwt6m/image/upload/v1682274475/homemade_dlzxvg.png" />;
  }
  if (category === "Ordinary Drink") {
    return (
      <Icon src="https://res.cloudinary.com/dgy6nwt6m/image/upload/v1682274475/blue-lagoon_tlwjns.png" />
    );
  }
  if (category === "Other") {
    return (
      <Icon src="https://res.cloudinary.com/dgy6nwt6m/image/upload/v1682274475/wine_cyqpnp.png" />
    );
  }
  if (category === "Party Drink") {
    return (
      <Icon src="https://res.cloudinary.com/dgy6nwt6m/image/upload/v1682274790/champagne-glass_tdukl3.png" />
    );
  }
  if (category === "Shake") {
    return (
      <Icon src="https://res.cloudinary.com/dgy6nwt6m/image/upload/v1682274475/cocktail-shaker_sqxuor.png" />
    );
  }
  if (category === "Shot") {
    return (
      <Icon src="https://res.cloudinary.com/dgy6nwt6m/image/upload/v1682274475/shot_nwgdmr.png" />
    );
  }
  if (category === "Soft Drink") {
    return (
      <Icon src="https://res.cloudinary.com/dgy6nwt6m/image/upload/v1682274664/soft-drink_dy6zav.png" />
    );
  }
};

const Icon = styled.img`
  width: 50px;
`;

export default CategoryPictureHandler;
