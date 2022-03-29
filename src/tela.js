// metodos static nao podem trabalhar com variaveis `this`
// por isso, nao vamos coloar o util no construtor
const util = Util

const ID_BTN_JOGAR = "jogar"
const ID_CONTEUD0 ="conteudo"
const ID_MENSAGEM = "mensagem"
const CLASSE_INVISIVEL ="invisible"
const ID_CARREGANDO = "carregando"
const ID_CONTADOR = "contador"
const ID_BTN_MOSTRAR_TUDO = "mostrarTudo"
const MENSAGENS = {
    sucesso:{
        texto: 'Combinação correta',
        classe :'alert-success'
    },
    erro:{
        texto:'Combinação incorreta',
        classe: 'alert-danger'
    }
}

class Tela{
    static obterCodigoHtml(item){
        return `   
         <div class="col-md-3">
             <div class="card" style="width: 50%;" onclick="window.verificarSelecao('${item.id}', '${item.nome}')">
                <img src="${item.img}" name="${item.nome}" class="card-img-top" alt="...">
            </div>
            <br />

         </div>
        `
    }
    static configurarBotaoVerificarSelecao(funcaoOnClick){
       window.verificarSelecao = funcaoOnClick
    }
    
    static alteraConteudoHTML(codigoHtml){
        const conteudo = document.getElementById(ID_CONTEUD0)
        conteudo.innerHTML = codigoHtml
    }
    static gerarStringHTMLPelaImagem(itens){
        //par cada item da lista, vai executar a funçao obterCodioHtml
        // ao final, vai concatenar tudo em uma String
        // muda de array para string
        return itens.map(Tela.obterCodigoHtml).join('')
    }
    static atualizarImagens(itens){
        const codigoHtml = Tela.gerarStringHTMLPelaImagem(itens)
        Tela.alteraConteudoHTML(codigoHtml)
    }
    static configurarBotaoJogar(funcaoclick){
        const btnJogar = document.getElementById(ID_BTN_JOGAR)
        btnJogar.onclick = funcaoclick
    }
    static exibirHerois(nomeDoHeroi, img){
        const elementosHtml = document.getElementsByName(nomeDoHeroi)
        // para cada elemento encontrado na tela, vamos alterar a imagem
        // para a imagem inicial
        // com o forEach, para cada item, dentro dos () setamos o valor de img
        
        elementosHtml.forEach(item =>(item.src = img))
    }
    static async exibirMensagem(sucesso = true){
        const elemento = document.getElementById(ID_MENSAGEM)
        if(sucesso){
            elemento.classList.remove(MENSAGENS.erro.classe)
            elemento.classList.add(MENSAGENS.sucesso.classe)
            elemento.innerText = MENSAGENS.sucesso.texto
        }
        else{
            elemento.classList.remove(MENSAGENS.sucesso.classe)
            elemento.classList.add(MENSAGENS.erro.classe)
            elemento.innerText =MENSAGENS.erro.texto
        }
        elemento.classList.remove(CLASSE_INVISIVEL)
        await util.timeout(1000)
            elemento.classList.add(CLASSE_INVISIVEL)
    }
    static exibirCarregando(mostrar =  true){
        const carregando = document.getElementById(ID_CARREGANDO)
        if(mostrar){
            carregando.classList.remove(CLASSE_INVISIVEL)
            return;
        }
        carregando.classList.add(CLASSE_INVISIVEL)
    }
    static iniciarContador(){
        let contarAte = 3
        const elementoContador = document.getElementById(ID_CONTADOR)
        // substituir o texto Começando $$contador segundos
        //onde esta p $$contador adicionaremos o valor
        const identificadorNoTexto = "$$contador"
        const textoPadrao = `Começando em ${identificadorNoTexto} segundos...`
        // criando uma funçao para alterar o texto
        // a cada segundo

        const atualizarTexto = () =>(elementoContador.innerHTML = textoPadrao.replace(identificadorNoTexto, contarAte--))

        atualizarTexto()
        // a cada segundo vai chamar essa funcao e atulaizar texto
        //essa funçao substitui o $$contador pelo`contarAte` diminuindo o valor
        // retornadno o idDoIntervalo para parar ele mais tarde
        const idDoIntervalo = setInterval(atualizarTexto, 1000)
        return idDoIntervalo
    }
    static limparContador(idDoIntervalo){
        clearInterval(idDoIntervalo)
        // deixar sem texto
        document.getElementById(ID_CONTADOR).innerHTML = ""
    }
    static configurarBotaoMostrarTudo(funcaoOnClick){
        const btnMostrarTudo = document.getElementById(ID_BTN_MOSTRAR_TUDO)
        btnMostrarTudo.onclick = funcaoOnClick
    }
}