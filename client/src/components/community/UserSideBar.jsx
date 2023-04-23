import React from 'react';
import { useContext } from 'react';
import { CommunityContext } from '../Context/CommunityContext';


const UserSideBar = () =>{
    const {setIsClick} = useContext(CommunityContext);
    return <button onClick={()=>{setIsClick(true)}}>Post</button>
}

export default UserSideBar;