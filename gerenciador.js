document.getElementById("cadastrar").addEventListener("click", function(){
    const selects = document.querySelectorAll('.tarefaSelect');
    let msgErro = "";
    console.log(selects.length);
    for(let i = 0; i < selects.length; i++){
        if(selects[i].value === ""){
            msgErro += `- Campo ${selects[i].id} não preenchido\n`;
        }
    }
    if (msgErro === "") {
        alert("Sucesso! Todos os campos foram preenchidos.");
        // seguir adicionar o form para a listagem dos cadastros na nav
    } else {
        alert(msgErro);
    }
    // const descricao = document.getElementById("descricao");
    // const prioridadeElement = document.getElementById("prioridade");
    // const categoriaElement = document.getElementById("categoria");
    // const sitTarefaElement = document.getElementById("sitTarefa");
    // const dataTarefa = document.getElementById("dataTarefa");
    // if(descricao.value === ""){
    //     msgErro += "- Descrição vazia."
    // }
    // if(prioridadeElement.value === ""){
    //     msgErro += "- Prioridade não preenchida."
    // }
    // if(categoriaElement.value === ""){
    //     msgErro += "- Prioridade não preenchida."
    // }
    // if(sitTarefaElement.value === ""){
    //     msgErro += "- Prioridade não preenchida."
    // }
    // if(dataTarefa.value === ""){
    //     msgErro += "- Prioridade não preenchida."
    // }
});
const CaixaTarefa = document.getElementById("CaixaTarefa");
const botaoTarefa = document.getElementById("botaoTarefa");
const modal = document.getElementById('meuModal');
const btnFechar = document.getElementById('btnFechar');
botaoTarefa.addEventListener("click", function(){
    CaixaTarefa.style.display = 'block';
    botaoTarefa.style.display = 'none';
    modal.showModal();
})
btnFechar.addEventListener('click', () => {
  modal.close();
  botaoTarefa.style.display = 'block';
});