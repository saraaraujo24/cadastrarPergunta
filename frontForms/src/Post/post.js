import React, { useEffect, useState } from "react";
import axios from "axios";


const Post = () => {

      const url = "http://localhost:8000/questions";
      const [posts, setPosts] = useState('');
      const [editandoId, setEditandoId] = useState(null);
      const [perguntas, setPerguntas] = useState('');


  function getUser(){
      axios.get(url)
      .then(response=>{
        const data = response.data 
        setPosts(data)
        console.log(data)
      })
      .catch(error=>console.log(error))
  }

  useEffect(()=>{
    getUser()
  },[])

  function handleDelete(id){
    window.location.reload();
    axios.delete("http://localhost:8000/questions/" + id);
      setPosts(posts.filter(post => post._id !==id))
      const newPosts = posts.filter((post) => post._id !== id);
     setPosts(newPosts);
  }

  const handleUpdate = async (id, novasPerguntas) => {
    try {
    await axios.put(`http://localhost:8000/questions/${id}`, { perguntas: novasPerguntas });
     const updatedPosts = Array.isArray(posts)
      ? posts.map((post) => post._id === id ? { ...post, perguntas: novasPerguntas } : post)
      : [];
      setPosts(updatedPosts);
      setEditandoId(null);
      } catch (error) {
        console.error(error);
      }
    };

  return (
     
    <div >
        {posts.length ===0?(
        <p>Carregando...</p>
        ):(  
        posts.map((post)=>(
          <div  key={post._id}>
            <p className="cen">{post.perguntas}</p>
            
            {editandoId === post._id ?(
              <ul>
                <input className="space"
                    type="text"
                    value={perguntas}
                    onChange={(e) =>setPerguntas(e.target.value)}
                />
                
                <button onClick={() => handleUpdate(post._id, perguntas)}>Salvar</button>
                <button onClick={() => setEditandoId(null)}>Cancelar</button>
              </ul> 
             ):(
              
              <button onClick={() => setEditandoId(post._id)}>Editar</button>
             )}
             <button onClick={() => handleDelete(post._id)}>Excluir</button>
          </div>
        ))
      )}
    </div>  
    
  )
}
export default Post