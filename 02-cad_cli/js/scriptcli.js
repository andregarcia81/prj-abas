document.addEventListener('DOMContentLoaded', function() {
    // ------------------- Referências dos Elementos -------------------
    const form = document.getElementById('cadastroForm');
    const dataCadastroField = document.getElementById('dataCadastro');
    
    // Campos com Máscara e Validação
    const cpfField = document.getElementById('cpf');
    const celularField = document.getElementById('celular');
    const telefoneField = document.getElementById('telefone');
    const cepField = document.getElementById('cep');
    const emailField = document.getElementById('email');

    // Campos de Endereço (para preenchimento automático)
    const logradouroField = document.getElementById('logradouro');
    const bairroField = document.getElementById('bairro');
    const cidadeField = document.getElementById('cidade');
    const estadoField = document.getElementById('estado');

    // ------------------- 1. Inicialização (Data Corrente no Formato DD/MM/YYYY) -------------------

    /**
     * Preenche o campo 'Data Cadastro' com a data atual no formato DD/MM/YYYY.
     */
    function preencherDataCadastro() {
        const today = new Date();
        
        // Pega os componentes da data e garante dois dígitos (ex: 09)
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Mês é 0-based
        const yyyy = today.getFullYear();
        
        // Define o valor no formato DD/MM/YYYY
        dataCadastroField.value = `${dd}/${mm}/${yyyy}`;
    }
    preencherDataCadastro();

    // ------------------- 2. Máscaras -------------------

    /**
     * Aplica uma máscara de formatação (pattern) ao valor de entrada.
     */
    function mask(value, pattern) {
        let i = 0;
        const v = value.toString().replace(/\D/g, ''); // Remove todos os não-dígitos
        return pattern.replace(/#/g, () => v[i++] || '');
    }

    // Event Listeners para aplicar as máscaras em tempo real
    
    // MÁSCARA DE DATA (DD/MM/YYYY) ADICIONADA:
    dataCadastroField.addEventListener('input', (e) => {
        // Como o campo é readonly e preenchido automaticamente, essa máscara serve
        // apenas como uma garantia de formato. Caso o campo não fosse readonly:
        // e.target.value = mask(e.target.value, '##/##/####');
    });

    cepField.addEventListener('input', (e) => {
        e.target.value = mask(e.target.value, '#####-###');
    });

    cpfField.addEventListener('input', (e) => {
        e.target.value = mask(e.target.value, '###.###.###-##');
    });

    telefoneField.addEventListener('input', (e) => {
        e.target.value = mask(e.target.value, '(##) ####-####');
    });

    celularField.addEventListener('input', (e) => {
        e.target.value = mask(e.target.value, '(##) #####-####');
    });

    // ------------------- 3. Funções de Validação Customizada -------------------

    /**
     * Validação complexa de CPF.
     */
    function validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]/g, '');
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
        
        // Validação do primeiro dígito
        let soma = 0;
        for (let i = 1; i <= 9; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }
        let resto = (soma * 10) % 11;
        if ((resto === 10) || (resto === 11)) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;

        // Validação do segundo dígito
        soma = 0;
        for (let i = 1; i <= 10; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }
        resto = (soma * 10) % 11;
        if ((resto === 10) || (resto === 11)) resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11))) return false;
        
        return true;
    }

    /**
     * Validação simples de formato de Email.
     */
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // ------------------- 4. Busca de Endereço por CEP (ViaCEP) -------------------

    async function buscaCEP() {
        // Limpa campos de endereço
        logradouroField.value = '';
        bairroField.value = '';
        cidadeField.value = '';
        estadoField.value = '';
        
        const cep = cepField.value.replace(/\D/g, '');

        if (cep.length !== 8) return; 

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (data.erro) {
                cepField.classList.add('is-invalid');
                return;
            }
            
            // Preenche os campos
            logradouroField.value = data.logradouro;
            bairroField.value = data.bairro;
            cidadeField.value = data.localidade;
            estadoField.value = data.uf;

            cepField.classList.remove('is-invalid');
            
        } catch (error) {
            console.error('Erro ao buscar CEP:', error);
            cepField.classList.add('is-invalid');
        }
    }

    // Ação acionada quando o campo CEP perde o foco (o usuário termina de digitar)
    cepField.addEventListener('blur', buscaCEP);

    // ------------------- 5. Validação do Formulário no Submit -------------------

    form.addEventListener('submit', function (event) {
        let isValid = true; 

        // 5.1. Validação do CPF
        if (cpfField.value.trim() === '') {
            cpfField.classList.add('is-invalid');
            document.getElementById('cpfFeedback').textContent = 'CPF obrigatório.';
            isValid = false;
        } else if (!validarCPF(cpfField.value)) {
            cpfField.classList.add('is-invalid');
            document.getElementById('cpfFeedback').textContent = 'CPF inválido.';
            isValid = false;
        } else {
            cpfField.classList.remove('is-invalid');
        }
        
        // 5.2. Validação do Email
        if (emailField.value.trim() === '') {
            emailField.classList.add('is-invalid');
            document.getElementById('emailFeedback').textContent = 'Email obrigatório.';
            isValid = false;
        } else if (!validarEmail(emailField.value)) {
            emailField.classList.add('is-invalid');
            document.getElementById('emailFeedback').textContent = 'O formato do email é inválido.';
            isValid = false;
        } else {
             emailField.classList.remove('is-invalid');
        }

        // 5.3. Finalização da Validação
        if (!form.checkValidity() || !isValid) {
            event.preventDefault();
            event.stopPropagation();
        }

        form.classList.add('was-validated');

        if (form.checkValidity() && isValid) {
            event.preventDefault(); 
            alert('Formulário Validado e Pronto para Envio! (Demonstração)');
        }
    }, false);
});