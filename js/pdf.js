function gerarPDF() {
    const elemento = document.getElementById('app');
    elemento.classList.add('gerando-pdf');

    const opcoes = {
        margin:       10,
        filename:     'Estatisticas_da_Pelada.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, scrollY: 0 },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
    };

    html2pdf().set(opcoes).from(elemento).save().then(() => {
        elemento.classList.remove('gerando-pdf');
    });
}