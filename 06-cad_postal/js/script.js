let ultimoID = 1000;

window.addEventListener("DOMContentLoaded", () => {
  // Gera ID numérico sequencial
  const idInput = document.getElementById("id");
  idInput.value = ++ultimoID;

  // Preenche data atual no campo dataCadastro
  const dataInput = document.getElementById("dataCadastro");
  const hoje = new Date().toISOString().split("T")[0];
  dataInput.value = hoje;
});

// Consulta automática do CEP ao sair do campo
document.getElementById("cep").addEventListener("blur", () => {
  const cep = document.getElementById("cep").value.replace(/\D/g, "");
  const cepError = document.getElementById("cepError");

  if (cep.length !== 8) {
    cepError.textContent = "CEP inválido. Deve conter 8 dígitos.";
    return;
  }

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Erro na resposta da API");
      }
      return response.json();
    })
    .then(data => {
      if (data.erro) {
        cepError.textContent = "CEP não encontrado.";
        return;
      }

      cepError.textContent = "";
      document.getElementById("logradouro").value = data.logradouro || "";
      document.getElementById("bairro").value = data.bairro || "";
      document.getElementById("cidade").value = data.localidade || "";
      document.getElementById("estado").value = data.uf || "";
    })
    .catch(() => {
      cepError.textContent = "Erro ao consultar o CEP.";
    });
});

// Validação final do CEP no envio do formulário
document.getElementById("cadastroForm").addEventListener("submit", event => {
  const cepInput = document.getElementById("cep");
  const cepError = document.getElementById("cepError");
  const cepValue = cepInput.value.trim();
  const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;

  if (!cepRegex.test(cepValue)) {
    event.preventDefault();
    cepError.textContent = "CEP inválido. Use o formato 00000-000.";
    cepInput.classList.add("is-invalid");
  } else {
    cepError.textContent = "";
    cepInput.classList.remove("is-invalid");
  }
});
