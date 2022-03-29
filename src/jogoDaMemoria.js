class JogoDaMemoria {
    // se mandar um obj ={ tela:1, idade: 2, etc:3}
    // vai ignorar o resto das propriedades  e pegar somente a propriedade tela
    constructor({tela, util}){
        this.tela = tela
        this.util = util
// caminho sempre relativo ao index.html
        this.heroisIniciais = [
            {img: './arquivos/batman.png', nome: 'Batman'},
            {img: './arquivos/deadpool.png', nome: 'Deadpool'},
            {img: './arquivos/greenlanter.png', nome: 'Lanterna Verde'},
            {img: './arquivos/ironman.png', nome: 'Iron Man'},
            {img: './arquivos/wonderwoman.png', nome: 'Mulher Maravilha'},
            {img: './arquivos/loki.png', nome: 'Loki'},
        
            ]
            this.iconePadrao = './arquivos/question.png'
            this.heroisEscondido = []
            this.heroisSelecionados = []
    }

    // para usar o this, não podemos usar static!
    inicializar(){
        this.tela.atualizarImagens(this.heroisIniciais)
        // forca tela a usar o THIs de jogo da memoria 
        this.tela.configurarBotaoJogar(this.jogar.bind(this))
        this.tela.configurarBotaoVerificarSelecao(this.verificarSelecao.bind(this))
        this.tela.configurarBotaoMostrarTudo(this.mostrarHeroisEscondidos.bind(this))
        }

    async embaralhar(){
        const copias = this.heroisIniciais
        //duplicar os itens 
        .concat(this.heroisIniciais)
        // entrar em cada item e criar im id aleatorio
        .map(item => {
            return Object.assign({}, item, {id: Math.random() / 0.5})
        })
        // ordenar aleatoriamente
        .sort(() => Math.random() - 0.5)
        this.tela.atualizarImagens(copias)
        this.tela.exibirCarregando()

        const idDoIntervalo = this.tela.iniciarContador()

        // vamos esperar 3 segundo para atualizar a tela
        await this.util.timeout(3000)
        this.tela.limparContador(idDoIntervalo)
        this.esconderHerois(copias)
        this.tela.exibirCarregando(false)
        }
    
    esconderHerois(herois){
        // vamos trocar a imagem de todos os herois existentes pelo incone padrao
        // como fizemos no construtor, vamos extrair somente o necesario 
        // usando a sintaxe ({ chave: 1}) estampos falando que vamos retornar oque tiver dentro 
        // dos parenteses
        // quando nao usamos : ( exemplo do id). o JS entende que o  nome
        // é o mesmo do valor. Ex. id: id, vira id,
        const heroisOcultos = herois.map(({nome , id}) =>({
            id,
            nome,
            img: this.iconePadrao
        }))
        // atualizamos a tela com os herois ocultos 
        this.tela.atualizarImagens(heroisOcultos)
        // guardamos os herois para trabalhar com eles depois
        this.heroisEscondido = heroisOcultos
    }
    exibirHerois(nomeDoHeroi){
        // vamos procurar esse heroi pelo nome em heroisIniciais 
        //vamos obter somente a imagem dele
        const {img} = this.heroisIniciais.find(({nome })=> nomeDoHeroi === nome)
        // vamos criar a funcao na tela, para exiibr somnte o heroi selecionado
        this.tela.exibirHerois(nomeDoHeroi, img)

    }

    verificarSelecao(id, nome){
        const item = {id, nome}
        //vamos verificar a quantidade de herois selecionados
        // e tomar açao se escolhy certo ou errado
        const heroisSelecionados = this.heroisSelecionados.length

        switch(heroisSelecionados){
           case 0:
               //adiciona a escolha na lista, esperando pela proxima clicada
               this.heroisSelecionados.push(item) 
               break;
            case 1:
                // se a quantidade for um significa que 
                // o usuario so pode escolher mais um 
                //vamos obter o primeiro itemd a lista 
                const [opcao1] = this.heroisSelecionados
                // zeramos lista anterior para nao selecionar mais de dois

                this.heroisSelecionados = []
                //conferir se os nomes e ids batem conforme 
                // o esperado 
                if(opcao1.nome === item.nome &&
                    // aqui verificamos se os ids sao diferentes 
                    // para que naose clique duas vezes no mesmo heroi
                    opcao1.id !== item.id)
                    {
                        this.exibirHerois(item.nome)
                        //com o padrao e true, nao precisas passar nada
                        this.tela.exibirMensagem()
                        // para a execuçao
                       return;
                       
                        

                    }
                    this.tela.exibirMensagem(false)
                    // fim do case!
                    break;
        }
    }
    mostrarHeroisEscondidos(){
        // vamos pegar todos os herois da tela e colocar 
        // seu respectivo valor correto
        const heroisEscondido = this.heroisEscondido
        for(const heroi of heroisEscondido){
            const {img} = this.heroisIniciais.find(item=> item.nome === heroi.nome)
            heroi.img = img
        }
        this.tela.atualizarImagens(heroisEscondido)
    }

    jogar(){
        this.embaralhar()
    }
}