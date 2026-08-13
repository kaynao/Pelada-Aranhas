function adicionarJogo() {
    let a = 0, b = 1;
    if (jogos.length) {
        const ultimo = jogos[jogos.length - 1];
        a = ultimo.b;
        b = (ultimo.b + 1) % times.length;
        if (a === b) b = (b + 1) % times.length;
    }

    jogos.push({ a, ga: 0, gb: 0, b });
    salvar();
    renderJogos();
}

function salvarJogo(i) {
    salvar();

    const botao = document.getElementById(`save-${i}`);
    if (botao) {
        botao.textContent = '✓ Salvo';
        botao.classList.add('saved');

        setTimeout(() => {
            if (botao) {
                botao.textContent = 'Salvar';
                botao.classList.remove('saved');
            }
        }, 1200);
    }

    atualizarResumo();
}

function removerJogo(i) {
    jogos.splice(i, 1);
    salvar();
    renderJogos();
}

function limparJogos() {
    if (!confirm('Tem certeza que deseja apagar todos os jogos?')) return;
    jogos = [];
    salvar();
    renderJogos();
}

function alterarJogo(i, campo, valor) {
    jogos[i][campo] = ['a', 'b'].includes(campo) ? Number(valor) : Math.max(0, Number(valor) || 0);
    salvar();
    atualizarResumo();
}

function alterarNomeTime(i, valor) {
    times[i].nome = valor.trim() || `Time ${i + 1}`;
    salvar();
    renderTimes();
    renderJogos();
}

function alterarJogador(ti, pi, valor) {
    times[ti].jogadores[pi] = valor;
    salvar();
}

function adicionarJogador(ti) {
    if (times[ti].jogadores.length >= 5) {
        alert('Cada time pode ter até 5 jogadores neste modelo.');
        return;
    }
    times[ti].jogadores.push('');
    salvar();
    renderTimes();
}

function removerJogador(ti, pi) {
    times[ti].jogadores.splice(pi, 1);
    salvar();
    renderTimes();
}

// --- CONTROLE DA TELA DE ENTRADA (SPLASH SCREEN) ---
function ocultarSplashScreen() {
    const splash = document.getElementById('splash-screen');
    if (splash) {
        splash.classList.add('hidden');
    }
}

// Oculta a Splash Screen 2 segundos após o carregamento da página
window.addEventListener('load', () => {
    setTimeout(ocultarSplashScreen, 2000);
});

// Trava de segurança: garante que vai esconder em até 3 segundos se o load demorar
setTimeout(ocultarSplashScreen, 3000);

// --- INICIALIZAÇÃO DA APLICAÇÃO ---
renderTimes();
renderJogos();

// --- ATUALIZAÇÃO DO SERVICE WORKER NO CELULAR ---
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then((registration) => {
        registration.update();
    });
}
