import React, { useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";



function Excluir(){
    const [posts, setPosts] = useState('');


function handleDelete(id){
    axios.delete("http://localhost:8000/questions/" + id);
  
      setPosts(posts.filter(post => post._id !==id))
      const newPosts = posts.filter((post) => post._id !== id);
      setPosts(newPosts);
 }
  
return(
    <div>
        <FaTrash onClick={() => handleDelete(posts._id)}>Excluir /</FaTrash>
         
    </div>
)

}
export default Excluir