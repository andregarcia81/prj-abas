fetch('./js/dsm202501.json')
  .then(response => response.json())
  .then(dados => {
    if (typeof window.montarEstrutura === 'function') {
      window.montarEstrutura(dados);
    }
    if (typeof window.montarGraficos === 'function') {
      window.montarGraficos(dados);
    }
  })
  .catch(error => {
    console.error('Erro ao carregar dsm202501.json:', error);
  });
