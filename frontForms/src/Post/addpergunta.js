import React, { useState } from "react";
import axios from "axios";
import Post from "./post"
import  "./post.css"
import '../App.css'
function AddQuestion (){
    
  const [perguntas, setPerguntas] = useState('');
  const [posts, setPosts] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); 

  function btnFunction() {
    axios.post('http://localhost:8000/questions', { perguntas })
    .then(response => {
        if (!perguntas ) {
          // **Improved error message:**
          alert("Nenhum pergunta adicionada.");
          return;
        }
        setPosts(response.data);
      
        console.log("Deu erro" + response.data);
      })
      .catch(error => {
        console.log("Deu erro" + error);
      });
      console.log(posts)
  }

  const handleQuestionChange = (event) => {
    setPerguntas(event.target.value);
    setIsButtonDisabled(!event.target.value);
   // Enable button if question is filled
  };

  return (
 
    <div>
      <div className="container">
        <div className="elemento">
         <h3 className="letra">Adicionar á pergunta</h3>
        <form  > 
          <center>
            <input className="space"
              type="text"
              placeholder="Perguntas"
              value={ perguntas}
              onChange={handleQuestionChange} 
            />
          </center>
          <button className="ad" onClick={btnFunction} disabled={isButtonDisabled}> 
              Cadastrar
          </button>
        </form>
        </div>
        </div>
        <Post/>
    </div>

  );
};

export default AddQuestion;