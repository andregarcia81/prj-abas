document.addEventListener('DOMContentLoaded', () => {
  console.log("Script carregado com sucesso!");

  const dadosEstudante = {
    nome: "Andre Garcia",
    cpf: "123.456.789-00",
    dataNascimento: "2000-05-15",
    sexo: "Masculino",
    rg: "12.345.678-9",
    email: "andre.garcia@email.com",
    telefone: "(11) 91234-5678",
    endereco: "Rua das Flores, 123 - Centro, Franca - SP",
    nomeResponsavel: "Maria Silva",
    parentescoResponsavel: "Mãe",
    emailResponsavel: "maria.silva@email.com",
    celularResponsavel: "(11) 99876-5432",
    telefoneResponsavel: "(11) 3344-5566",
    instituicaoInfantil: "Escola Mundo Feliz",
    matriculaInfantil: "INF123456",
    turnoInfantil: "M",
    ingressoInfantil: "2005-02-01",
    conclusaoInfantil: "2007-12-15"
  };

  // Preencher campos principais
  const preencherCampo = (id, valor) => {
    const campo = document.getElementById(id);
    if (campo) campo.value = valor;
    else console.warn(`Campo com ID '${id}' não encontrado.`);
  };

  preencherCampo('nome', dadosEstudante.nome);
  preencherCampo('cpf', dadosEstudante.cpf);
  preencherCampo('dataNascimento', dadosEstudante.dataNascimento);
  preencherCampo('sexo', dadosEstudante.sexo);
  preencherCampo('rg', dadosEstudante.rg);
  preencherCampo('email', dadosEstudante.email);
  preencherCampo('telefone', dadosEstudante.telefone);
  preencherCampo('endereco', dadosEstudante.endereco);
  preencherCampo('nomeResponsavel', dadosEstudante.nomeResponsavel);
  preencherCampo('parentescoResponsavel', dadosEstudante.parentescoResponsavel);
  preencherCampo('emailResponsavel', dadosEstudante.emailResponsavel);
  preencherCampo('celularResponsavel', dadosEstudante.celularResponsavel);
  preencherCampo('telefoneResponsavel', dadosEstudante.telefoneResponsavel);

  // Preencher bloco de Educação Infantil
  const blocoInfantil = document.querySelector('.historico-bloco');
  if (blocoInfantil) {
    const campos = blocoInfantil.querySelectorAll('input, select');
    if (campos.length >= 5) {
      campos[0].value = dadosEstudante.instituicaoInfantil;
      campos[1].value = dadosEstudante.matriculaInfantil;
      campos[2].value = dadosEstudante.turnoInfantil;
      campos[3].value = dadosEstudante.ingressoInfantil;
      campos[4].value = dadosEstudante.conclusaoInfantil;
    } else {
      console.warn("Campos insuficientes no bloco de Educação Infantil.");
    }
  } else {
    console.warn("Bloco de Educação Infantil não encontrado.");
  }
});
