import { useState } from 'react';
import './App.css';

function App() {
  const [termoBusca, setTermoBusca] = useState('');
  const [livros, setLivros] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  async function buscarLivros() {
    setCarregando(true);
    setErro(null);
    const termo = encodeURIComponent(termoBusca);
    const url = `https://www.googleapis.com/books/v1/volumes?q=${termo}&key=${import.meta.env.VITE_BOOKS_API_KEY}`;

    const resposta = await fetch(url);
    const dados = await resposta.json();

    if(!dados.items) {
      setCarregando(false);
      setErro("Nenhum livro encontrado.");
      return;
    }

    const info = dados.items[0].volumeInfo
    setLivros({
      titulo: info.title || "Título não disponível",
      autor: info.authors ? info.authors.join(", ") : "Autor não disponível",
      capa: info.imageLinks ? info.imageLinks.thumbnail : "Capa não disponível",
      isbn: info.industryIdentifiers ? info.industryIdentifiers[0].identifier : "ISBN não disponível"
    })
    setCarregando(false);
  }
   
return (
  <div className="container">
    <h1>Buscador de Livros</h1>

    <div className="busca">
      <input
        type="text"
        placeholder="Digite o título do livro"
        value={termoBusca}
        onChange={(e) => setTermoBusca(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && buscarLivros()}
      />
      <button onClick={buscarLivros}>Buscar</button>
    </div>

    {carregando && <div className="spinner"></div>}
    {erro && <p className="erro">{erro}</p>}

    {livros && (
      <>
      <div className="livro">
        <h2>{livros.titulo}</h2>
        <p>Autor: {livros.autor}</p>
        <img src={livros.capa} alt={livros.titulo} />
        <p>ISBN: {livros.isbn}</p>
      </div>

      <div className="lojas">
        <h3>Lojas onde comprar:</h3>
        <ul>
          <li><a href={`https://www.amazon.com.br/s?k=${encodeURIComponent(livros.titulo)}`} target="_blank">Amazon</a></li>
          <li><a href={`https://www3.livrariacultura.com.br/busca/?q=${encodeURIComponent(livros.titulo)}`} target="_blank">Livraria Cultura</a></li>
          <li><a href={`https://www.submarino.com.br/busca?q=${encodeURIComponent(livros.titulo)}`} target="_blank">Submarino</a></li>

        </ul>
      </div>
      </>
    )}
  </div>
)
}

export default App;