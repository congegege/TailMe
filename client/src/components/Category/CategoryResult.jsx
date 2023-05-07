import { useContext, useEffect, useState} from "react";
import { useSearchParams } from "react-router-dom";
import { Link  } from "react-router-dom";
import styled from "styled-components";
import { RecipesContext } from "../Context/RecipesContext";
import Error from "../error/Error";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import CategoryLoading from "../Loading/CategoryLoading";
import SideBar from "./SideBar";



const CategoryResult = () => {
    //store the recipes that is underneath certain category
    const [categoryRecipes, setCategoryRecipes] = useState(null)
    //store the changement for the query
    const [searchParams,setSearchParams] = useSearchParams(window.location.search);
    const query = searchParams.toString();
    //the array that contain all the query value, ex:["cocktail"."Alcoholic"]
    const queryList = Array.from(searchParams.values());
    //judge whether the user click on the button filter when click the sidebar will be displayed
    const {setIsClicked, isClicked} = useContext(RecipesContext);
    // set the loading state when new query is added
    const [isLoading, setIsLoading] = useState(false);
    // set the state when it got the error
    const [isError ,  setIsError] = useState(false)
    
    //fetch the related recipes by query
    useEffect(()=>{
        setIsLoading(true)
        setSearchParams(searchParams.toString())
        fetch(`/api/categories/recipes?${searchParams.toString()}`)
        .then(res=>res.json())
        .then(resData=>{
            setIsLoading(false);
            setCategoryRecipes(resData.data)
        })
        .catch(err=>{
            setIsError(true)
            setIsLoading(false)
        })
    },[query])

    if(!categoryRecipes || isLoading){
        return <CategoryLoading/>
    }

    if(isError){
        return <Error/>
    }

    return (
        <>
        <Container>
            <SideBar />
            <TitleSection>
            <Header/>
                <QueryTitle>
                    {/* when no query is selected show "all" */}
                    {queryList.length == 0 ? 
                        <span>All</span> : 
                        queryList.map((query)=>{
                            return <span key={query}> {query}</span>
                        })}
                </QueryTitle>
                <FilterButton onClick={()=>setIsClicked(true)} >Filters</FilterButton>
            </TitleSection>

            {categoryRecipes && categoryRecipes.length > 0  &&  <Wrapper>
                {/* display the result */}
                {categoryRecipes.map((recipe,index)=>{
                    return(
                        <RecipeSection key={index}>
                            <Link to={`/recipes/${recipe.idDrink}`}><RecipePicture src={recipe.strDrinkThumb} /></Link>
                            <DrinkName>{recipe.strDrink}</DrinkName>
                        </RecipeSection>
                    )
                })}
                
            </Wrapper>}
            {categoryRecipes && categoryRecipes.length == 0 &&
            <NoResultContainer>
                <NoResult>No Result<Face src="https://res.cloudinary.com/dgy6nwt6m/image/upload/v1682666408/sad_tp3cwj.png"/> </NoResult>
                <Message to={"/community"}>Explore our <Part>community</Part> to discover more</Message>
            </NoResultContainer>}
            <Footer/>
        </Container>
        </>
        
    )
}

const NoResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 90vh;
`

const NoResult = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    width: 20%;
`

const Message = styled(Link)`
    margin-top: 1%;
    font-size: 20px;
    color: black;
    &:hover{
        color: black;
        cursor: pointer;
        text-decoration: underline wavy 1px #588157;
    }
`

const Part = styled.span`
    color:#588157;
`

const Face = styled.img`
    width: 40px;
    margin: 0 5% ;
`

const FilterButton = styled.button`
font-size: 32px;
font-family: var(--font-category-heading);
background-color: white;
color: #0c5233;
width: 200px;
margin: auto;
border-radius: 100px;

&:hover{
    background-color: #ccd5ae;
    cursor: pointer;
    color: black;
}
`

const TitleSection = styled.div`
    display: flex;
    flex-direction: column;
`

const QueryTitle = styled.span`
    font-family: var(--font-query-header);
    text-align: center;
    margin: 20px 5px;
    font-size: 70px;
`

const DrinkName = styled.div`
    text-align: center;
    font-family: "Comic Neue";
    font-size: 30px;
    color: #6b9080;
`

const Container = styled.div`
    width: 100%;
    background-color: #e6e8e6;

`

const Wrapper = styled.div`
    width: 80%;
    margin: 2% auto;
    display: grid ;
    grid-template-columns: repeat(2, 1fr);
`

const RecipeSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5%;
`

const RecipePicture = styled.img`
    border-radius: 50px;
    width: 600px;
    height: 600px;

`


export default CategoryResult;