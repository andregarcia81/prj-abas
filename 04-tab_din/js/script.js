let livros = [];
let ordemAtual = { coluna: null, crescente: true };

document.addEventListener("DOMContentLoaded", () => {
  fetch("data/data.json")
    .then(response => response.json())
    .then(data => {
      livros = data;
      renderizarTabela(livros);
    })
    .catch(error => console.error("Erro ao carregar os livros:", error));

  document.getElementById("pesquisa").addEventListener("input", filtrarTabela);
  document.getElementById("filtro").addEventListener("change", filtrarTabela);
});

function renderizarTabela(lista) {
  const tabela = document.getElementById("tabela-livros");
  tabela.innerHTML = "";

  lista.forEach(livro => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${livro.id}</td>
      <td>${livro.titulo}</td>
      <td>${livro.autor}</td>
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

  livros.sort((a, b) => {
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

  filtrarTabela(); // Reaplica filtro após ordenação
}

function filtrarTabela() {
  const termo = document.getElementById("pesquisa").value.toLowerCase();
  const campo = document.getElementById("filtro").value;

  const filtrados = livros.filter(livro => {
    const valor = livro[campo].toString().toLowerCase();
    return valor.includes(termo);
  });

  renderizarTabela(filtrados);
}
