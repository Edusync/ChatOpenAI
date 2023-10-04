const GetOpenAIResponse = async (message) => {
    const apiKey = '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'; // Substitua com sua chave de API do OpenAI

    const data = {
    model: 'ft:gpt-3.5-turbo-0613:zeros-e-um::82R5xd5e',
    messages: [
        { role: 'system', content: 'Marv é um chatbot factual que também é sarcástico.' },
        { role: 'user', content: message },
    ],
    };

    let retorno = '';

    await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        // console.log(data.choices[0].message.content);
        retorno = data.choices[0].message.content;
    })
    .catch(error => {
        // console.error('Ocorreu um erro:', error);
        retorno = 'Ocorreu um erro ao se comunicar com o OpenAI.';
    });

    return retorno;
}

const AddMessageUser = (e) => {

    e.preventDefault();

    var msg = document.getElementById("mensagem").value;

    // Passo 1: Selecionar o elemento do chat
    const chatElement = document.querySelector('.chat__content');

    // Passo 2: Criar um novo elemento div para a mensagem do usuário
    const userMessageElement = document.createElement('div');

    // Passo 3: Definir classes e conteúdo HTML para a mensagem do usuário
    userMessageElement.classList.add('chat__message', 'chat__message--user');
    userMessageElement.innerHTML = `
        <i class="fa fa-user"></i>
        <p>${msg}</p>
    `;

    // Passo 4: Adicionar o elemento da mensagem do usuário ao chat
    chatElement.appendChild(userMessageElement);

    // Passo 5: Limpar o campo de texto
    document.getElementById("mensagem").value = "";

    // Passo 6: Adicionar a mensagem do bot
    AddMessageBot(msg);
}

const AddMessageBot = async (mensagem) => {

    var msg = await GetOpenAIResponse(mensagem);
    console.log(msg);

    // Passo 1: Selecionar o elemento do chat
    const chatElement = document.querySelector('.chat__content');

    // Passo 2: Criar um novo elemento div para a mensagem do bot
    const robotMessageElement = document.createElement('div');

    // Passo 3: Definir classes e conteúdo HTML para a mensagem do bot
    robotMessageElement.classList.add('chat__message', 'chat__message--robot');
    robotMessageElement.innerHTML = `
        <i class="fa fa-robot"></i>
        <p>${msg}</p>
    `;

    // Passo 4: Adicionar o elemento da mensagem do bot ao chat
    chatElement.appendChild(robotMessageElement);
}


// Atribua a função AddMessageUser ao evento onsubmit do formulário
const formulario = document.getElementById('form_chat');
formulario.addEventListener('submit', AddMessageUser);