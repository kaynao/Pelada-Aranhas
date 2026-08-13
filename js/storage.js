const cores = ['amarelo', 'azul', 'verde', 'vermelho'];
const emojisBolinha = ['🟡', '🔵', '🟢', '🔴'];

let times = JSON.parse(localStorage.getItem('pelada_times')) || [
    { nome: 'Amarelo', jogadores: ['Ronaldo','Rivaldo','Ronaldinho','Kaká','Neymar'] },
    { nome: 'Azul', jogadores: ['Messi','Di María','Agüero','Tevez','Maradona'] },
    { nome: 'Verde', jogadores: ['Cristiano','Figo','Eusébio','Rui Costa','Pepe'] },
    { nome: 'Vermelho', jogadores: ['Zidane','Mbappé','Griezmann','Benzema','Henry'] }
];

let jogos = JSON.parse(localStorage.getItem('pelada_jogos')) || [
    {a:0, ga:3, gb:2, b:1},
    {a:2, ga:1, gb:4, b:3},
    {a:0, ga:0, gb:0, b:2},
    {a:1, ga:2, gb:2, b:3}
];

function salvar() {
    localStorage.setItem('pelada_times', JSON.stringify(times));
    localStorage.setItem('pelada_jogos', JSON.stringify(jogos));
}

function escapeHtml(text) {
    return String(text)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}