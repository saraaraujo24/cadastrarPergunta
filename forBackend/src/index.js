const express = require("express")
const morgan = require("morgan");
const app = express();
const mongoose = require('mongoose')
const cors = require("cors");

const bodyParser= require("body-parser");

app.use(morgan("dev"));
app.use(express.json())
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())



// Conexão com o banco de dados MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/questions', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Model do documento
const Post = mongoose.model('Perguntas', {
  perguntas: String,
 
});

// Rota para salvar os dados
app.post('/questions', async (req, res) => {
  try {
    const { perguntas} = req.body;

    const post = new Post({ perguntas});

    await post.save();

    res.json({ message: 'Dados salvos com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao salvar dados' });
  }
});

app.get('/questions', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao obter dados' });
  }
});

app.delete("/questions/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Post.findByIdAndDelete(id);
   
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao excluir pergunta' });
  }
});
/*app.put("/questions/:id", async (req, res) => {
  try {
    const { perguntas} = req.body;

    const put = new Post  ({ perguntas});

    await put.save();

    res.json({ message: 'Dados editados com sucesso!' });
   
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao editar pergunta' });
  }
});*/

app.put("/questions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { perguntas } = req.body;

    await Post.findByIdAndUpdate(id, { perguntas }, { new: true }); // Atualiza e retorna o documento atualizado

    res.json({ message: 'Dados editados com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao editar pergunta' });
  }
});

app.listen(8000, ()=> {
    console.log("Rodando");
})

