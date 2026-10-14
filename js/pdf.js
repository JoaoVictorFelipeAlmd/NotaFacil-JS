async function generatePDF(previewElement, docInfo) {
  if (!previewElement) {
    throw new Error('Elemento de visualização não encontrado.');
  }

  const tipoSanitizado = sanitizeFilename(docInfo.tipo || 'documento');
  const clienteSanitizado = sanitizeFilename(docInfo.cliente || 'cliente');
  const numeroSanitizado = sanitizeFilename(docInfo.numero || '0001');
  const fileName = `${tipoSanitizado}_${clienteSanitizado}_${numeroSanitizado}.pdf`;

  const opt = {
    margin: [10, 10, 10, 10],
    filename: fileName,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
      logging: false,
      scrollY: 0
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait'
    },
    pagebreak: {
      mode: ['avoid-all', 'css', 'legacy']
    }
  };

  if (typeof html2pdf === 'undefined') {
    console.warn('html2pdf não carregado. Usando impressão nativa do navegador.');
    window.print();
    return;
  }

  try {
    await html2pdf().set(opt).from(previewElement).save();
    incrementDocumentNumber();
  } catch (err) {
    console.error('Erro ao gerar PDF:', err);
    throw err;
  }
}

function printDocument() {
  window.print();
}

function shareViaWhatsApp(data) {
  const { clienteNome, clienteTelefone, tipo, docNumero, valorTotal, prestadorNome } = data;
  
  const tipoLabel = tipo === 'orcamento' ? 'Orçamento' : 'Recibo de Pagamento';
  const saudacao = 'Olá!';
  
  let texto = `${saudacao} ${clienteNome ? clienteNome + ', ' : ''}aqui está o seu *${tipoLabel}* (Nº ${docNumero}).\n\n`;
  texto += `📌 *Valor Total:* ${formatCurrency(valorTotal)}\n`;
  texto += `Emitido por: *${prestadorNome || 'Prestador de Serviço'}*\n\n`;
  
  if (tipo === 'orcamento') {
    texto += `Aguardamos sua aprovação. Qualquer dúvida estamos à disposição!`;
  } else {
    texto += `Agradecemos pela preferência e confiança!`;
  }

  const encodedText = encodeURIComponent(texto);
  
  const cleanPhone = (clienteTelefone || '').replace(/\D/g, '');
  let url = '';
  
  if (cleanPhone.length >= 10) {
    const ddiPhone = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`;
    url = `https://wa.me/${ddiPhone}?text=${encodedText}`;
  } else {
    url = `https://wa.me/?text=${encodedText}`;
  }

  window.open(url, '_blank');
}
