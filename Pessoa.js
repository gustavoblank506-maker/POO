//criando a classe Pessoa
class Pessoa {

    //método construtor - atributos da classe
    constructor(nome, idade, cpf, cidade) {
        this.nome = nome;
        this.idade = idade;
        this.cpf = cpf;
        this.cidade = cidade;
    }

    //método da classe - ação da classe
    mostrarDetalhes() {
        console.log(`Nome: ${this.nome}, Idade: ${this.idade}, CPF: ${this.cpf}, Cidade: ${this.cidade}`);
    }

    fazerAniversario(){
        this.idade++;
        console.log(`Parabéns ${this.nome}!, agora você tem ${this.idade} `);
    }
}

//instanciando objetos da classe Pessoa
const pessoa1 = new Pessoa("Marcos", 32, "30218625-78", "Alagoinhas");

//mostrando o objeto completo
console.log(pessoa1);

pessoa1.fazerAniversario();

//chamando o método do objeto
pessoa1.mostrarDetalhes();

console.log("-------------------");

const pessoa2 = new Pessoa("Maria", 30, "022018325-18", "Barreiras");

//mostrando o objeto completo
console.log(pessoa2);

//chamando o método do objeto
pessoa2.mostrarDetalhes();

pessoa2.fazerAniversario();

pessoa2.mostrarDetalhes();