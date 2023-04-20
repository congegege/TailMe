import React, { useContext } from 'react';
import { CommunityContext } from '../Context/CommunityContext';

const PictureUpload = () =>{
    const {formData , setFormData , currentPage , setCurrentPage } = useContext(CommunityContext)
    

    const uploadPicture = (selectedPic) =>{
        const reader = new FileReader();
        reader.readAsDataURL(selectedPic[0]);
        reader.onloadend = () =>{
            setFormData({...formData,"img":reader.result})
        }
            // setPicUrl([...selectedPic])
    }

    return (
        <>
        <input type="file" name="myImage" onChange={(ev)=>{uploadPicture(ev.target.files) }}/>
        <button onClick={()=>setCurrentPage(currentPage - 1)}>Pre</button>
        </>
    )
    
}
export default PictureUpload;