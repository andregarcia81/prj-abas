const competencias = ['Algoritmo', 'Modelagem', 'Engenharia', 'Sistemas', 'WEB', 'Design'];
const graficos = {};

// Calcula médias por competência com filtro de semestre
function calcularMedias() {
  const filtro = document.getElementById('filtroSemestre').value;
  const soma = {}, contagem = {};
  competencias.forEach(c => { soma[c] = 0; contagem[c] = 0; });

  estruturaSemestres.forEach((sem, i) => {
    if (filtro !== 'todos' && filtro != i + 1) return;
    sem.bimestres.forEach(bim => {
      competencias.forEach(c => {
        const v = bim.valores[c];
        if (!isNaN(v)) { soma[c] += v; contagem[c]++; }
      });
    });
  });

  return competencias.map(c => contagem[c] ? soma[c] / contagem[c] : 0);
}

// Cria gráfico com Chart.js
function criarGrafico(tipo, id, dados, options = {}) {
  const ctx = document.getElementById(id).getContext('2d');
  if (graficos[id]) graficos[id].destroy();
  graficos[id] = new Chart(ctx, {
    type: tipo,
    data: dados,
    options: { responsive: true, maintainAspectRatio: false, ...options }
  });
}

// Atualiza todos os gráficos
function atualizarTodosOsGraficos() {
  const medias = calcularMedias();
  const base = {
    labels: competencias,
    datasets: [{
      label: 'Média das Competências',
      data: medias,
      backgroundColor: [
        'rgba(13,110,253,0.6)', 'rgba(25,135,84,0.6)', 'rgba(255,193,7,0.6)',
        'rgba(220,53,69,0.6)', 'rgba(102,16,242,0.6)', 'rgba(32,201,151,0.6)'
      ],
      borderColor: 'rgba(0,0,0,0.2)',
      borderWidth: 1
    }]
  };

  const circular = { labels: competencias, datasets: [base.datasets[0]] };
  const dispersao = {
    datasets: competencias.map((c, i) => ({
      label: c,
      data: [{ x: i + 1, y: medias[i] }],
      backgroundColor: base.datasets[0].backgroundColor[i]
    }))
  };
  const bolha = {
    datasets: competencias.map((c, i) => ({
      label: c,
      data: [{ x: i + 1, y: medias[i], r: medias[i] }],
      backgroundColor: base.datasets[0].backgroundColor[i]
    }))
  };

  criarGrafico('polarArea', 'graficoPolar', circular);
  criarGrafico('bar', 'graficoBarra', base, { scales: { y: { beginAtZero: true, max: 10 } } });
  criarGrafico('bar', 'graficoBarraHorizontal', base, { indexAxis: 'y', scales: { x: { beginAtZero: true, max: 10 } } });
  criarGrafico('bubble', 'graficoBolha', bolha, { scales: { x: { type: 'linear', min: 0, max: 7 }, y: { min: 0, max: 10 } } });
  criarGrafico('scatter', 'graficoDispersao', dispersao, { scales: { x: { type: 'linear', min: 0, max: 7 }, y: { min: 0, max: 10 } } });
  criarGrafico('line', 'graficoLinha', base, { scales: { y: { beginAtZero: true, max: 10 } } });
  criarGrafico('pie', 'graficoPizza', circular);
  criarGrafico('radar', 'graficoRadar', base);
  criarGrafico('doughnut', 'graficoRosquinha', circular);
}

// Salva dados no backend
function salvarDados() {
  fetch('/salvar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(estruturaSemestres)
  })
    .then(res => res.text())
    .then(msg => alert(msg))
    .catch(err => alert('Erro ao salvar: ' + err));
}

// Carrega dados do backend
function carregarDados() {
  fetch('./dsm202501.json')
    .then(res => {
      if (!res.ok) throw new Error('Arquivo não encontrado');
      return res.json();
    })
    .then(dados => {
      window.estruturaSemestres = dados;
    })
    .catch(() => {
      console.warn('Nenhum arquivo salvo encontrado.');
    });
}

// Exporta dados como CSV
function exportarCSV() {
  const medias = calcularMedias();
  let csv = 'Competência,Média\n';
  competencias.forEach((comp, i) => {
    csv += `${comp},${medias[i].toFixed(2)}\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'medias.csv';
  link.click();
}

// Exporta gráfico como PDF
async function exportarPDF() {
  const canvas = document.getElementById('graficoBarra');
  const image = await html2canvas(canvas);
  const imgData = image.toDataURL('image/png');

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();
  pdf.addImage(imgData, 'PNG', 10, 10, 180, 100);
  pdf.save('grafico.pdf');
}

// Inicializa eventos
window.addEventListener('DOMContentLoaded', () => {
  carregarDados();
  document.getElementById('atualizarGraficos').addEventListener('click', atualizarTodosOsGraficos);
  document.getElementById('salvarDados').addEventListener('click', salvarDados);
  document.getElementById('exportarCSV').addEventListener('click', exportarCSV);
  document.getElementById('exportarPDF').addEventListener('click', exportarPDF);
});
