    class LivroApi {
        constructor(titulo, autor, capa, isbn) {
            this.titulo = titulo;
            this.autor = autor;
            this.capa = capa;
            this.isbn = isbn;
        }
    

    mostraDetalhes() {
        console.log(`Título: ${this.titulo}`);
        console.log(`Autor: ${this.autor}`);
        console.log(`Capa: ${this.capa}`);
        console.log(`ISBN: ${this.isbn}`);
    }

    mostrarCapa() {
        console.log(`Capa: ${this.capa}`);
    }

    buscarNasLojas() {
        const termo = encodeURIComponent(this.titulo);
        console.log(`Amazon: https://www.amazon.com/s?k=${termo}`);
        console.log(`Livraria Cultura: https://www.livrariacultura.com.br/busca?q=${termo}`);
        console.log(`Submarino: https://www.submarino.com.br/busca?q=${termo}`);
    }
}

const livro1 = new LivroApi(
    "O Senhor dos Anéis",
    "J.R.R. Tolkien",
    "https://upload.wikimedia.org/wikipedia/en/8/8e/The_Lord_of_the_Rings_cover.gif",
    "978-0544003415"
);

console.log(livro1);
livro1.mostraDetalhes();
livro1.mostrarCapa();
livro1.buscarNasLojas();

class buscadorDeLivros {
    constructor(termoDeBusca) {
        this.termoDeBusca = termoDeBusca;
    }

    async buscar() {
        const termo = encodeURIComponent(this.termoDeBusca);
        const url = `https://www.googleapis.com/books/v1/volumes?q=${termo}`;

        const resposta = await fetch(url);
        const dados = await resposta.json();

        console.log(dados); // debug temporário
if (!dados.items || dados.items.length === 0) {
    console.log("Nenhum livro encontrado.");
    return null;
}
const info = dados.items[0].volumeInfo;
        const titulo = info.title || "Título não disponível";
        const autor = info.authors ? info.authors.join(", ") : "Autor não disponível";
        const capa = info.imageLinks ? info.imageLinks.thumbnail : "Capa não disponível";
        const isbnInfo = info.industryIdentifiers ? info.industryIdentifiers.find(id => id.type === "ISBN_13") : null;
        const isbn = isbnInfo ? isbnInfo.identifier : "ISBN não disponível";
    
        return new LivroApi(titulo, autor, capa, isbn);
    }
}

const buscador = new buscadorDeLivros("O Senhor dos Anéis");
buscador.buscar().then(livro => {
    console.log(livro);
    livro.mostraDetalhes();
    livro.mostrarCapa();
    livro.buscarNasLojas();
});
