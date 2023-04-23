import { useEffect,useState } from "react";
import { Link  } from "react-router-dom";

const Collection = ({sub}) =>{
    const[collectionList,setCollectionList] = useState(null);
    const[communityCollectionList,setCommunityCollectionList] = useState(null);

    useEffect(()=>{
        fetch(`/api/users/collections/${sub}`)
        .then(res=>res.json())
        .then(resData=>setCollectionList(resData.data))
    },[])

    useEffect(()=>{
        fetch(`/api/users/communityCollections/${sub}`)
        .then(res=>res.json())
        .then(resData=>setCommunityCollectionList(resData.data))
    },[])

    if(!collectionList || !communityCollectionList){
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
        {communityCollectionList.map((communityCollection)=>{
            const {id,strDrink,img} = communityCollection
            return (
                <Link key={id} to={`/community/${id}`}>
                <div>{strDrink}</div>
                <img src={img}/>
                </Link>
            ) 
        })}
        </>
    )
}
export default Collection;