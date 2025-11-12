window.onload = function () {
  const totalSemestres = 6;
  const estruturaSemestres = [];

  for (let semestre = 1; semestre <= totalSemestres; semestre++) {
    const bimestres = [
      { nome: '1º Bimestre', valores: {} },
      { nome: '2º Bimestre', valores: {} }
    ];
    estruturaSemestres.push({ semestre: `Semestre ${semestre}`, bimestres });
  }

  window.estruturaSemestres = estruturaSemestres;

  const container = document.getElementById('estrutura');

  estruturaSemestres.forEach((sem, sIndex) => {
    const semDiv = document.createElement('div');
    semDiv.classList.add('mb-4');

    const titulo = document.createElement('h5');
    titulo.textContent = sem.semestre;
    semDiv.appendChild(titulo);

    const tabela = document.createElement('table');
    tabela.classList.add('table', 'table-bordered', 'table-sm');

    const thead = document.createElement('thead');
    thead.innerHTML = `
      <tr>
        <th>Bimestre</th>
        <th>Algoritmo</th>
        <th>Modelagem</th>
        <th>Engenharia</th>
        <th>Sistemas</th>
        <th>WEB</th>
        <th>Design</th>
      </tr>
    `;
    tabela.appendChild(thead);

    const tbody = document.createElement('tbody');

    sem.bimestres.forEach((bim, bIndex) => {
      const linha = document.createElement('tr');
      const celulaBim = document.createElement('td');
      celulaBim.textContent = bim.nome;
      linha.appendChild(celulaBim);

      ['Algoritmo', 'Modelagem', 'Engenharia', 'Sistemas', 'WEB', 'Design'].forEach((item) => {
        const celula = document.createElement('td');
        const input = document.createElement('input');
        input.type = 'number';
        input.step = '0.1';
        input.min = '0';
        input.max = '10';
        input.classList.add('form-control', 'form-control-sm');
        input.placeholder = item;
        input.oninput = () => {
          estruturaSemestres[sIndex].bimestres[bIndex].valores[item] = parseFloat(input.value);
        };
        celula.appendChild(input);
        linha.appendChild(celula);
      });

      tbody.appendChild(linha);
    });

    tabela.appendChild(tbody);
    semDiv.appendChild(tabela);
    container.appendChild(semDiv);
  });
};
