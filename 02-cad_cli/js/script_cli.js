document.addEventListener('DOMContentLoaded', () => {
  console.log("Script de preenchimento de cliente carregado!");

  const dadosCliente = {
    id: "001",
    dataCadastro: "03/11/2025",
    situacao: "ativo",
    nome: "Andre Garcia",
    cpf: "123.456.789-00",
    rg: "12.345.678-9",
    orgaoEmissor: "SSP/SP",
    dataEmissao: "2015-06-20",
    dataNascimento: "2000-05-15",
    naturalidade: "Franca",
    nacionalidade: "Brasileira",
    sexo: "Masculino",
    estadoCivil: "Solteiro",
    nomeMae: "Maria Silva",
    nomePai: "João Silva",
    cep: "14400-000",
    logradouro: "Rua das Flores",
    numero: "123",
    complemento: "Apto 45",
    bairro: "Centro",
    cidade: "Franca",
    estado: "SP",
    telefone: "(16) 3400-1234",
    celular: "(16) 99999-8888",
    email: "andre.garcia@email.com"
  };

  const preencherCampo = (id, valor) => {
    const campo = document.getElementById(id);
    if (campo) {
      campo.value = valor;
    } else {
      console.warn(`Campo com ID '${id}' não encontrado.`);
    }
  };

  Object.entries(dadosCliente).forEach(([id, valor]) => preencherCampo(id, valor));
});
