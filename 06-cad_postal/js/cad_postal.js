document.addEventListener('DOMContentLoaded', () => {
  console.log("Script de preenchimento postal carregado!");

  const dadosPostal = {
    id: "1023",
    dataCadastro: "2025-11-03",
    situacao: "Ativo",
    nome: "Andre Garcia",
    cpf: "123.456.789-00",
    cep: "14400-000",
    logradouro: "Rua das Flores",
    numero: "123",
    complemento: "Apto 45",
    bairro: "Centro",
    cidade: "Franca",
    estado: "SP"
  };

  const preencher = (id, valor) => {
    const campo = document.getElementById(id);
    if (campo) {
      campo.value = valor;
    } else {
      console.warn(`Campo com ID '${id}' não encontrado.`);
    }
  };

  Object.entries(dadosPostal).forEach(([id, valor]) => preencher(id, valor));
});
