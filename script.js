// abaixo há a aplicação da biblioteca disponibilizada (seguindo seu passo a passo)
// https://maykbrito.github.io/libs/NLWSetup/documentation/NLWSetup.html
const form = document.querySelector('#form-habits')
const nlwSetup = new NLWSetup(form) // criação do objeto NLWSetup e abrigando-o na variável nlwSetup
const button = document.querySelector('.header button')

button.addEventListener('click', add)
form.addEventListener('change', save) // o evento 'change' é quando ocorre qualquer alteração dentro do formulário (nesse caso, o check do input)

function add(){
  const today = new Date().toLocaleDateString('pt-br').slice(0, -5) // O JS possui suas próprias bibliotecas e objetos. O new Date(), por exemplo, é um objeto que fornece a data do dia. Sendo um objeto, ele possui propriedades, como localizar a data para o pt-br (colocando-a no formarto DD-MM), que é uma função. Além disso, todo o conteúdo retornado pela função e seu argumento também é um objeto, permitindo o uso da propriedade slice, que retorna um intervalo definido da string gerada (a partir da posição 0 até a posição -5, neste caso).

  const dayExists = nlwSetup.dayExists(today) // Trata-se de uma propriedade do próprio objeto criado a partir da biblioteca que retorna um valor booleano (true or false) caso o dia já exista (true) ou não (false). 

  if (dayExists){ // Caso o dia já exista, o if executa o return e interrompe a função, não acrescentando o dia.
    alert('Dia já incluso!')
    return
  }

  alert('Dia adicionado com sucesso!')
  nlwSetup.addDay(today)
}

// O localStorage (sendo um objeto), ele guarda na memória do browser determinadas informações. Para que isso aconteça, utiliza-se a funcionalidade setItem, em que se define uma CHAVE e um VALOR (nessa ordem). O valor a ser guardardo será todos os dados armazenados na aplicação. Quando ocorre um click no botão, o data armazena a informação do dia adicionado (e os checks marcados) como um ARRAY DENTRO DE UM OBJETO (como efetuado no comentário no rodapé deste arquivo).
function save(){ 
  localStorage.setItem('NLWSetup@habits', JSON.stringify(nlwSetup.data)) // Para armazenamento dos dados, portanto, eles dever ser guardados como uma STRING. Para isso, utiliza-se uma estrutura (objeto, biblioteca, extensão da linguagem JS) JSON.stringify, que transforma o objeto em uma string. Para verificar a string armazenada como dado, abra o devtools e escreva no console localStorage. Vale lembrar que como os dados são salvos no navegador, eles serão perdidos quando a aplicação for aberta em navegadores distintos.
}

const data = JSON.parse(localStorage.getItem("NLWSetup@habits")) || {} // Aqui ocorre o processo contrário, em que há a captura dos dados como string e a transformação deles para objeto novamente por meio do método JSON.parse. Para garantir o salvamento dos dados caso a aplicação seja aberta em um ambiente distinto (como na internet), acrescenta-se a inserção de um objeto vazio caso a chave NLWSetup@habits não seja encontrada (ou seja, tenha um valor null).

nlwSetup.setData(data)
nlwSetup.load()
// Aqui, de acordo com os métodos de execução fornecidos pela própria biblioteca, há a execução dos dados previamente salvos e o carregamento deles, para que apareçam para o usuário quando ele abrir a aplicação novamente!

/*
const data = {  // a variável data recebe um objeto de arrays
  run: ["01-01", "01-02", "01-06", "01-07", "01-08"], // o array compreende os dias na notação americana MM-DD
  takePills: ["01-03"],
  journal: ["01-02"],
}

nlwSetup.setData(data)
nlwSetup.load()
*/