import { useEffect,useState } from "react";
import { Link  } from "react-router-dom";

const Collection = ({sub}) =>{
    const[collectionList,setCollectionList] = useState(null);

    useEffect(()=>{
        fetch(`/api/users/collections/${sub}`)
        .then(res=>res.json())
        .then(resData=>setCollectionList(resData.data))
    },[])

    if(!collectionList){
        return <>Loading</>
    }

    return(
        <>
        {collectionList.map((collection)=>{
            return (
                <Link key={collection.id} to={`/recipes/${collection.id}`}>
                <div>{collection.strDrink}</div>
                <img src={collection.strDrinkThumb}/>
                </Link>
            ) 
        })}
        </>
    )
}
export default Collection;