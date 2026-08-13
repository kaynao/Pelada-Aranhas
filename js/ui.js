function renderTimes() {
    const area = document.getElementById('times');
    area.innerHTML = '';

    times.forEach((time, ti) => {
        const card = document.createElement('div');
        card.className = 'time ' + cores[ti];

        card.innerHTML = `
            <div class="time-header">
                <input class="team-name" value="${escapeHtml(time.nome)}"
                    onchange="alterarNomeTime(${ti}, this.value)">
                <span class="badge">${time.jogadores.length}/5</span>
            </div>
            <div class="players">
                ${time.jogadores.map((p, pi) => `
                    <div class="player">
                        <input value="${escapeHtml(p)}"
                            onchange="alterarJogador(${ti}, ${pi}, this.value)"
                            placeholder="Nome do jogador">
                        <button class="remove-player" onclick="removerJogador(${ti}, ${pi})">×</button>
                    </div>
                `).join('')}
                <button class="add-player" onclick="adicionarJogador(${ti})">＋ Adicionar jogador</button>
            </div>
        `;
        area.appendChild(card);
    });
}

function renderJogos() {
    const area = document.getElementById('jogos');

    if (!jogos.length) {
        area.innerHTML = '<div class="vazio">Nenhum jogo anotado. Clique em “Adicionar jogo”.</div>';
        atualizarResumo();
        return;
    }

    area.innerHTML = jogos.map((jogo, i) => `
        <div class="jogo">
            <select onchange="alterarJogo(${i}, 'a', this.value)">
                ${opcoesTimes(jogo.a)}
            </select>

            <input class="placar" type="number" min="0" value="${jogo.ga}"
                onchange="alterarJogo(${i}, 'ga', this.value)">

            <span class="x">×</span>

            <input class="placar" type="number" min="0" value="${jogo.gb}"
                onchange="alterarJogo(${i}, 'gb', this.value)">

            <select onchange="alterarJogo(${i}, 'b', this.value)">
                ${opcoesTimes(jogo.b)}
            </select>

            <div class="acoes-jogo">
                <button class="save-game" id="save-${i}" onclick="salvarJogo(${i})">Salvar</button>
                <button class="remove-game" onclick="removerJogo(${i})">×</button>
            </div>
        </div>
    `).join('');

    atualizarResumo();
}

function opcoesTimes(selecionado) {
    return times.map((t, i) =>
        `<option value="${i}" ${Number(selecionado) === i ? 'selected' : ''}>
            ${emojisBolinha[i] || '⚪'} ${escapeHtml(t.nome)}
        </option>`
    ).join('');
}

function atualizarResumo() {
    const stats = times.map((t, i) => ({
        indexOriginal: i,
        nome: t.nome,
        jogos: 0,
        v: 0,
        e: 0,
        d: 0,
        gp: 0,
        gc: 0,
        pts: 0
    }));

    jogos.forEach(j => {
        const a = Number(j.a), b = Number(j.b);
        const ga = Number(j.ga) || 0, gb = Number(j.gb) || 0;

        if (!stats[a] || !stats[b] || a === b) return;

        stats[a].jogos++;
        stats[b].jogos++;
        stats[a].gp += ga;
        stats[a].gc += gb;
        stats[b].gp += gb;
        stats[b].gc += ga;

        if (ga > gb) {
            stats[a].v++;
            stats[b].d++;
            stats[a].pts += 3;
        } else if (gb > ga) {
            stats[b].v++;
            stats[a].d++;
            stats[b].pts += 3;
        } else {
            stats[a].e++;
            stats[b].e++;
            stats[a].pts++;
            stats[b].pts++;
        }
    });

    stats.sort((a, b) => {
        const saldoA = a.gp - a.gc;
        const saldoB = b.gp - b.gc;
        return b.pts - a.pts || saldoB - saldoA || b.gp - a.gp;
    });

    document.getElementById('resumo').innerHTML = stats.map((s, index) => {
        const saldo = s.gp - s.gc;
        const saldoTexto = saldo > 0 ? `+${saldo}` : saldo;

        return `
            <tr class="${index === 0 && s.jogos > 0 ? 'lider' : ''}">
                <td><span class="posicao">${index + 1}</span></td>
                <td>
                    <span class="bolinha-time ${cores[s.indexOriginal]}"></span>
                    ${escapeHtml(s.nome)}
                </td>
                <td class="pontos">${s.pts}</td>
                <td>${s.jogos}</td>
                <td>${s.v}</td>
                <td>${s.e}</td>
                <td>${s.d}</td>
                <td>${s.gp}</td>
                <td>${s.gc}</td>
                <td class="${saldo > 0 ? 'saldo-positivo' : saldo < 0 ? 'saldo-negativo' : ''}">
                    ${saldoTexto}
                </td>
            </tr>
        `;
    }).join('');
}