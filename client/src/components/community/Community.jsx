import React, { useState } from 'react';
import { useEffect , useContext } from 'react';
import { Link  } from "react-router-dom";
import { CommunityContext } from '../Context/CommunityContext';
import PostForm from './PostForm';
import UserSideBar from './UserSideBar';


const Community = () =>{
    const {communityState, allPostsList , setAllPostsList, isClick , setIsClick} = useContext(CommunityContext);

    useEffect(()=>{
        fetch("/api/community/posts")
        .then(res=>res.json())
        .then(resData=>setAllPostsList(resData.data))
    },[communityState.status])

    return (
        <>
        <UserSideBar/>
        {allPostsList && allPostsList.map((post)=>{
            return(
                <Link to={`/community/${post.id}`} key={post.id}>
                <div>{post.strDrink}</div>
                <img src={post.img}/>
                </Link>
            )
        })}
        {isClick &&<PostForm/>}
        </>
    )
    
}
export default Community;