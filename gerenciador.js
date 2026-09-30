document.getElementById("cadastrar").addEventListener("click", function(){
    const descricao = document.getElementById("descricao").value;
    const prioridadeElement = document.getElementById("prioridade");
    const categoriaElement = document.getElementById("categoria");
    const sitTarefa = document.getElementById("sitTarefa");
    const dataTarefa = document.getElementById("dataTarefa").value;
    const prioridade = prioridadeElement.selectedIndex !== 0 ? prioridadeElement.options[prioridadeElement.selectedIndex].text : "Não informada";
    const categoria = categoriaElement.selectedIndex !== 0 ? categoriaElement.options[categoriaElement.selectedIndex].text : "Não informada";
    const situacao = sitTarefaElement.selectedIndex !== 0 ? sitTarefaElement.options[sitTarefaElement.selectedIndex].text : "Não informada";
    const mensagem = `Resumo da Tarefa:\n\n` +
                     `• Descrição: ${descricao || "Vazia"}\n` +
                     `• Prioridade: ${prioridade}\n` +
                     `• Categoria: ${categoria}\n` +
                     `• Situação: ${situacao}\n` +
                     `• Data: ${dataTarefa || "Não informada"}`;

    alert(mensagem);
})