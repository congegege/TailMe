import { useContext } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CommunityContext } from '../Context/CommunityContext';

const TextEditor = () =>{
    const {formData , setFormData , currentPage , setCurrentPage} = useContext(CommunityContext)

    // if(formData.post.length > 0){
    //     document.getElementById("hi").innerHTML = formData.post;
    // }
    
    
    
    return (
        <>
        <div id='hi'></div>
        <ReactQuill theme="snow"
        modules = {{
            toolbar:[
                ['bold',{ 'header': [1, 2,false]}],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'color': [] },],
                ['video']
            ],
        }}
        value={formData.post}
        onChange={(ev)=>{setFormData({...formData,"post":ev})}}
        />
        <button onClick={()=>setCurrentPage(currentPage - 1)}>Pre</button>
        <button onClick={()=>setCurrentPage(currentPage + 1)}>Next</button>
        
        </>
    ) 
    
}
export default TextEditor;