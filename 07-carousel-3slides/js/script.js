let indiceHorizontal = 0;
let indiceVertical = 0;
const totalPaginas = 3;
const larguraSlide = 210;
const alturaSlide = 180;
const espacamento = 30;

function atualizarIndicadores(id, ativo, onClickHandler) {
  const container = document.getElementById(id);
  container.innerHTML = '';
  for (let i = 0; i < totalPaginas; i++) {
    const dot = document.createElement('span');
    if (i === ativo) dot.classList.add('ativo');
    dot.addEventListener('click', () => onClickHandler(i));
    container.appendChild(dot);
  }
}

function moverCarrossel(id, novoIndice, indicadorId) {
  const carrossel = document.getElementById(id);
  let deslocamento = 0;

  if (id === 'carrosselHorizontal') {
    deslocamento = novoIndice * (larguraSlide * 3 + espacamento * 2);
    carrossel.style.transform = `translateX(-${deslocamento}px)`;
    indiceHorizontal = novoIndice;
    atualizarIndicadores(indicadorId, indiceHorizontal, i =>
      moverCarrossel(id, i, indicadorId)
    );
  } else {
    deslocamento = novoIndice * (alturaSlide * 3 + espacamento * 2);
    carrossel.style.transform = `translateY(-${deslocamento}px)`;
    indiceVertical = novoIndice;
    atualizarIndicadores(indicadorId, indiceVertical, i =>
      moverCarrossel(id, i, indicadorId)
    );
  }
}

window.onload = () => {
  atualizarIndicadores('indicadoresHorizontal', 0, i =>
    moverCarrossel('carrosselHorizontal', i, 'indicadoresHorizontal')
  );
  atualizarIndicadores('indicadoresVertical', 0, i =>
    moverCarrossel('carrosselVertical', i, 'indicadoresVertical')
  );
};

setInterval(() => {
  moverCarrossel('carrosselHorizontal', (indiceHorizontal + 1) % totalPaginas, 'indicadoresHorizontal');
  moverCarrossel('carrosselVertical', (indiceVertical + 1) % totalPaginas, 'indicadoresVertical');
}, 3000);
