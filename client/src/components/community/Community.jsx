import React, { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { CommunityContext } from '../Context/CommunityContext';
import PostForm from './PostForm';


const Community = () =>{
    const {state, allPostsList , setAllPostsList, isClick , setIsClick} = useContext(CommunityContext);
    console.log(state)

    useEffect(()=>{
        fetch("/api/community/posts")
        .then(res=>res.json())
        .then(resData=>setAllPostsList(resData.data))
    },[state.status])

    return (
        <>
        <button onClick={()=>{setIsClick(true)}}>Post</button>
        {allPostsList && allPostsList.map((post)=>{
            return(
                <div key={post.id}>
                <img src={post.img}/>
                </div>
            )
        })}
        {isClick &&<PostForm/>}
        </>
    )
    
}
export default Community;