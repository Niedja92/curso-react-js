// Função entrar

function entrar() {
    var area = document.getElementById('area')
    var texto = prompt('Digite seu nome')

    if(texto == '' || texto == null) {
        alert('Digite seu nome novamente')
        area.innerHTML = 'Bem-vindo...'
    } else {
        area.innerHTML = 'Bem-vindo ' + texto
    }
}

// Passando fução por parâmetro

function entrar2(nome, idade) {
    var area = document.getElementById('area2')
    var texto = prompt('Digite seu sobrenome')
    var idade = prompt('Digite sua idade')

    area.innerHTML = nome + " " + texto + ", " + "tenho " + idade + " anos de idade " 
}