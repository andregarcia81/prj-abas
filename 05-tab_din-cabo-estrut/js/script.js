let cabos = [];
let ordemAtual = { coluna: null, crescente: true };

document.addEventListener("DOMContentLoaded", () => {
  fetch("data/data.json")
    .then(response => response.json())
    .then(data => {
      cabos = data;
      renderizarTabela(cabos);
    })
    .catch(error => console.error("Erro ao carregar os dados:", error));

  document.getElementById("pesquisa").addEventListener("input", filtrarTabela);
  document.getElementById("filtro").addEventListener("change", filtrarTabela);
});

function renderizarTabela(lista) {
  const tabela = document.getElementById("tabela-cabos");
  tabela.innerHTML = "";

  lista.forEach(item => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${item.id}</td>
      <td>${item.local}</td>
      <td>${item.tipoCabo}</td>
      <td>${item.equipamentoOrigem}</td>
      <td>${item.portaOrigem}</td>
      <td>${item.equipamentoDestino}</td>
      <td>${item.portaDestino}</td>
      <td>${item.status}</td>
      <td>${item.responsavel}</td>
      <td>${item.observacao}</td>
    `;
    tabela.appendChild(linha);
  });
}

function ordenarPor(coluna) {
  if (ordemAtual.coluna === coluna) {
    ordemAtual.crescente = !ordemAtual.crescente;
  } else {
    ordemAtual.coluna = coluna;
    ordemAtual.crescente = true;
  }

  cabos.sort((a, b) => {
    let valorA = a[coluna].toString().toLowerCase();
    let valorB = b[coluna].toString().toLowerCase();

    if (!isNaN(valorA) && !isNaN(valorB)) {
      valorA = Number(valorA);
      valorB = Number(valorB);
    }

    if (valorA < valorB) return ordemAtual.crescente ? -1 : 1;
    if (valorA > valorB) return ordemAtual.crescente ? 1 : -1;
    return 0;
  });

  filtrarTabela();
}

function filtrarTabela() {
  const termo = document.getElementById("pesquisa").value.toLowerCase();
  const campo = document.getElementById("filtro").value;

  const filtrados = cabos.filter(item => {
    const valor = item[campo].toString().toLowerCase();
    return valor.includes(termo);
  });

  renderizarTabela(filtrados);
}
