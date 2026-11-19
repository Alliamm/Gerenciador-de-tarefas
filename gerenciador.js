const botaoTarefa = document.getElementById("botaoTarefa");
const modal = document.getElementById("meuModal");
const btnFechar = document.getElementById("btnFechar");
const formulario = document.getElementById("tarefa");
const containerTarefas = document.getElementById("containerTarefas");
const mensagemVazia = document.getElementById("mensagemVazia");
const pesquisaTarefa = document.getElementById("pesquisaTarefa");
const filtroCategoria = document.getElementById("filtroCategoria");
const filtroSituacao = document.getElementById("filtroSituacao");
const totalTarefas = document.getElementById("totalTarefas");
const tarefasConcluidas = document.getElementById("tarefasConcluidas");
const tarefasAndamento = document.getElementById("tarefasAndamento");
const tarefasPendentes = document.getElementById("tarefasPendentes");

let tarefas = [];

// Recuperar dados salvos no navegador

try {
    const dadosSalvos = JSON.parse(
        localStorage.getItem("minhasTarefas") || "[]"
    );
    tarefas = Array.isArray(dadosSalvos) ? dadosSalvos : [];
} catch (erro) {
    console.error("Erro ao recuperar tarefas:", erro);
}

function abrirModal() {
    formulario.reset();
    modal.showModal();
}

botaoTarefa.addEventListener("click", abrirModal);

function fecharModal() {
    modal.close();
}

btnFechar.addEventListener("click", fecharModal);

function nomePrioridade(valor) {

    const prioridades = {
        "1": "Alta",
        "2": "Média",
        "3": "Baixa"
    };

    return prioridades[valor] || "Não definida";

}


function nomeCategoria(valor) {

    const categorias = {
        "1": "Estudos",
        "2": "Lazer",
        "3": "Trabalho",
        "4": "Rotina"
    };

    return categorias[valor] || "Não definida";

}


function nomeSituacao(valor) {

    const situacoes = {
        "1": "Começando",
        "2": "Em andamento",
        "3": "Concluído"
    };

    return situacoes[valor] || "Não definida";

}

function salvarTarefas() {

    try {

        localStorage.setItem(
            "minhasTarefas",
            JSON.stringify(tarefas)
        );

    } catch (erro) {

        console.error("Não foi possível salvar as tarefas:", erro);

        alert("Não foi possível salvar os dados no navegador.");

    }

}

formulario.addEventListener("submit", function(event) {
    event.preventDefault();
    if (!formulario.checkValidity()) {
        formulario.reportValidity();
        return;
    }

    const descricao = document.getElementById("descricao").value.trim();
    if (descricao === "") {
        alert("A descrição da tarefa não pode ficar vazia.");
        return;
    }

    const novaTarefa = {
        id: crypto.randomUUID(),
        descricao: descricao,
        prioridade: document.getElementById("prioridade").value,
        categoria: document.getElementById("categoria").value,
        situacao: document.getElementById("sitTarefa").value,
        data: document.getElementById("dataTarefa").value
    };

    tarefas.push(novaTarefa);

    salvarTarefas();

    renderizarTarefas();

    atualizarIndicadores();

    formulario.reset();

    modal.close();

    alert("Tarefa cadastrada com sucesso!");

});


// =====================================
// 8. EXIBIR TAREFAS
// =====================================

function renderizarTarefas() {

    containerTarefas.innerHTML = "";

    const pesquisa = pesquisaTarefa.value.toLowerCase().trim();

    const categoriaSelecionada = filtroCategoria.value;

    const situacaoSelecionada = filtroSituacao.value;


    const tarefasFiltradas = tarefas.filter(tarefa => {

        const correspondePesquisa = tarefa.descricao
            .toLowerCase()
            .includes(pesquisa);

        const correspondeCategoria =
            categoriaSelecionada === "" ||
            tarefa.categoria === categoriaSelecionada;

        const correspondeSituacao =
            situacaoSelecionada === "" ||
            tarefa.situacao === situacaoSelecionada;

        return (
            correspondePesquisa &&
            correspondeCategoria &&
            correspondeSituacao
        );
    

    });

    mensagemVazia.style.display =
        tarefasFiltradas.length === 0 ? "block" : "none";

    tarefasFiltradas.forEach(tarefa => {

        const cartao = document.createElement("article");

        cartao.className = "cartaoTarefa";

        const descricao = document.createElement("h3");
        descricao.textContent = tarefa.descricao;

        const prioridade = document.createElement("span");
        prioridade.className = `prioridade prioridade-${tarefa.prioridade}`;
        prioridade.textContent = `Prioridade: ${nomePrioridade(tarefa.prioridade)}`;

        const categoria = document.createElement("p");
        categoria.textContent = `Categoria: ${nomeCategoria(tarefa.categoria)}`;

        const situacao = document.createElement("span");
        situacao.className = `situacao situacao-${tarefa.situacao}`;
        situacao.textContent = nomeSituacao(tarefa.situacao);

        const data = document.createElement("p");

        const dataFormatada = new Date(
            tarefa.data + "T12:00:00"
        ).toLocaleDateString("pt-BR");

        data.textContent = `Data: ${dataFormatada}`;

        const botaoConcluir = document.createElement("button");

        botaoConcluir.type = "button";
        botaoConcluir.textContent = "Concluir";
        botaoConcluir.className = "botaoConcluir";
        botaoConcluir.textContent =
        tarefa.situacao === "3" ? "Concluída ✓" : "Concluir";
        botaoConcluir.disabled = tarefa.situacao === "3";

        botaoConcluir.addEventListener("click", function() {
            tarefa.situacao = "3";
            salvarTarefas();
            renderizarTarefas();
        });
        

        const botaoExcluir = document.createElement("button");
        botaoExcluir.type = "button";
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "botaoExcluir";
        botaoExcluir.addEventListener("click", function() {

            excluirTarefa(tarefa.id);

        });
        cartao.appendChild(descricao);
        cartao.appendChild(prioridade);
        cartao.appendChild(categoria);
        cartao.appendChild(situacao);
        cartao.appendChild(data);
        cartao.appendChild(botaoExcluir);
        cartao.appendChild(botaoConcluir);
        containerTarefas.appendChild(cartao);
        
    });
}

function excluirTarefa(id) {
    const confirmar = confirm(
        "Deseja realmente excluir esta tarefa?"
    );
    if (!confirmar) {
        return;
    }
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);
    salvarTarefas();
    renderizarTarefas();
    atualizarIndicadores();
}
function atualizarIndicadores() {
    totalTarefas.textContent = tarefas.length;
    const concluidas = tarefas.filter(
        tarefa => tarefa.situacao === "3"
    ).length;
    const andamento = tarefas.filter(
        tarefa => tarefa.situacao === "2"
    ).length;
    const pendentes = tarefas.filter(
        tarefa => tarefa.situacao === "1"
    ).length;

    tarefasConcluidas.textContent = concluidas;
    tarefasAndamento.textContent = andamento;
    tarefasPendentes.textContent = pendentes;
}

pesquisaTarefa.addEventListener("input", renderizarTarefas);
filtroCategoria.addEventListener("change", renderizarTarefas);
filtroSituacao.addEventListener("change", renderizarTarefas);



renderizarTarefas();
atualizarIndicadores();

const temaCheckbox = document.getElementById("temaCheckbox");
const temaSalvo = localStorage.getItem("tema") || "claro";

temaCheckbox.checked = temaSalvo === "escuro";
document.body.classList.toggle("tema-escuro", temaCheckbox.checked);
temaCheckbox.addEventListener("change", function () {
    if (temaCheckbox.checked) {
        document.body.classList.add("tema-escuro");
        localStorage.setItem("tema", "escuro");
    } else {
        document.body.classList.remove("tema-escuro");
        localStorage.setItem("tema", "claro");
    }
});
