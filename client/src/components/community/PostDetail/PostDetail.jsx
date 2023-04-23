import { useParams } from "react-router-dom";
import { useEffect ,  useState } from "react";
import CommunityCollectButton from "./CommunityCollectButton";

const PostDetail = () =>{
    const {id} = useParams();
    const [singlePostInfo , setSinglePostInfo] = useState(null)
    
    useEffect(()=>{
        fetch(`/api/community/posts/${id}`)
        .then(res=>res.json())
        .then(resData=>setSinglePostInfo(resData.data))
    },[singlePostInfo])

    if(!singlePostInfo){
        return <>Loading</>
    }

    if( singlePostInfo.post.length > 0 && document.getElementById("post")){
            document.getElementById("post").innerHTML = singlePostInfo.post;
    }
    

    return (
        <>
        <img src={singlePostInfo.userPicture}/>
        <img src={singlePostInfo.img}/>
        <div>{singlePostInfo.strDrink}</div>
        <div>Instruction</div>
        <div id="post"></div>
        <CommunityCollectButton id={id} recipeInfo = {singlePostInfo}/>
        </>

    )
}

export default PostDetail;