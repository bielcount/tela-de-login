// Alternar modo escuro
const toggleButton = document.querySelector('.dark-mode-toggle');

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
    toggleButton.textContent = isDarkMode ? '☀️' : '🌙';
}

// Verificar preferência salva
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    toggleButton.textContent = '☀️';
}

toggleButton.addEventListener('click', toggleDarkMode);

// Função para limpar o conteúdo dinâmico
function clearDynamicContent() {
    const dynamicContent = document.getElementById('dynamic-content');
    dynamicContent.innerHTML = ''; // Limpa o conteúdo
}

// Função para carregar módulos
async function carregarConteudo(modulo) {
    clearDynamicContent(); // Limpa o conteúdo antes de carregar o novo módulo
    const dynamicContent = document.getElementById('dynamic-content');
    try {
        const response = await fetch(`/plugins/${modulo}.html`);
        if (!response.ok) throw new Error('Módulo não encontrado');
        const html = await response.text();
        dynamicContent.innerHTML = html;

        // Executa scripts dentro do conteúdo carregado
        const scripts = dynamicContent.querySelectorAll('script');
        scripts.forEach(script => {
            const newScript = document.createElement('script');
            newScript.textContent = script.textContent;
            document.body.appendChild(newScript).remove();
        });
    } catch (error) {
        console.error('Erro ao carregar o módulo:', error);
        dynamicContent.innerHTML = `<p>Módulo "${modulo}" não encontrado.</p>`;
    }
}

// Evento de clique nos itens do menu
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
        const modulo = item.getAttribute('data-modulo');
        carregarConteudo(modulo);
    });
});

// Carregar conteúdo inicial
carregarConteudo('home');