// Seleciona o formulário e a div de mensagem
const form = document.getElementById('cadastro-form');
const mensagemElement = document.getElementById('mensagem');

// Adiciona o event listener ao formulário
form.addEventListener('submit', async (event) => {
    // Previne o comportamento padrão de recarregar a página
    event.preventDefault();
    
    // Pega os valores dos inputs
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Limpa a mensagem anterior
    mensagemElement.textContent = '';
    mensagemElement.className = '';
    
    try {
        // Faz a requisição POST para a API
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });
        
        // Pega a resposta em JSON
        const data = await response.json();
        
        // Verifica se foi sucesso ou erro
        if (response.ok) {
            // Sucesso
            mensagemElement.textContent = data.message || 'Usuário cadastrado com sucesso!';
            mensagemElement.className = 'sucesso';
            
            // Limpa o formulário
            form.reset();
        } else {
            // Erro
            mensagemElement.textContent = data.error || 'Erro ao cadastrar usuário!';
            mensagemElement.className = 'erro';
        }
    } catch (error) {
        // Erro de rede ou outro erro
        console.error('Erro:', error);
        mensagemElement.textContent = 'Erro ao conectar com o servidor!';
        mensagemElement.className = 'erro';
    }
});
