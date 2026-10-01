document.getElementById("cadastrar").addEventListener("click", function(){
    const selects = document.querySelectorAll('.tarefaSelect');
    let msgErro = "";
    console.log(selects.length);
    for(let i = 0; i < selects.length; i++){
        if(selects[i].value === ""){
            msgErro += `- Campo ${selects[i].id} não preenchido\n`;
        }
    }
    alert(msgErro);
    const descricao = document.getElementById("descricao");
    const prioridadeElement = document.getElementById("prioridade");
    const categoriaElement = document.getElementById("categoria");
    const sitTarefaElement = document.getElementById("sitTarefa");
    const dataTarefa = document.getElementById("dataTarefa");
    if(descricao.value === ""){
        msgErro += "- Descrição vazia."
    }
    if(prioridadeElement.value === ""){
        msgErro += "- Prioridade não preenchida."
    }
});