function formatCurrency(value) {
  const num = Number(value) || 0;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
}

function parseCurrency(value) {
  if (typeof value === 'number') return isNaN(value) ? 0 : value;
  if (!value) return 0;
  const clean = value.toString().replace(/[^\d,-]/g, '').replace(',', '.');
  const parsed = parseFloat(clean);
  return isNaN(parsed) ? 0 : parsed;
}

function formatDateBR(isoDate) {
  if (!isoDate) return '';
  const parts = isoDate.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return isoDate;
}

function getTodayISO() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function maskCPFCNPJ(value) {
  if (!value) return '';
  const digits = value.replace(/\D/g, '');

  if (digits.length <= 11) {
    return digits
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .slice(0, 14);
  } else {
    return digits
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .slice(0, 18);
  }
}

function maskPhone(value) {
  if (!value) return '';
  const digits = value.replace(/\D/g, '').slice(0, 11);

  if (digits.length <= 10) {
    return digits
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  } else {
    return digits
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2');
  }
}

function numeroPorExtenso(valor) {
  const num = Number(valor) || 0;
  if (num === 0) return 'zero real';
  if (num < 0) return 'menos ' + numeroPorExtenso(Math.abs(num));

  const unidades = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'];
  const especiais = ['dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
  const dezenas = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
  const centenas = ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'];

  function converterCentena(n) {
    if (n === 0) return '';
    if (n === 100) return 'cem';

    const c = Math.floor(n / 100);
    const d = Math.floor((n % 100) / 10);
    const u = n % 10;
    const partes = [];

    if (c > 0) partes.push(centenas[c]);

    if (d === 1) {
      partes.push(especiais[u]);
    } else {
      if (d > 1) partes.push(dezenas[d]);
      if (u > 0) partes.push(unidades[u]);
    }

    return partes.join(' e ');
  }

  const inteiro = Math.floor(num);
  const centavos = Math.round((num - inteiro) * 100);

  const milhares = Math.floor(inteiro / 1000);
  const restoInteiro = inteiro % 1000;

  const partesTexto = [];

  if (milhares > 0) {
    if (milhares === 1) {
      partesTexto.push('um mil');
    } else {
      partesTexto.push(converterCentena(milhares) + ' mil');
    }
  }

  if (restoInteiro > 0) {
    partesTexto.push(converterCentena(restoInteiro));
  }

  let resultado = '';
  if (inteiro > 0) {
    const textoReais = partesTexto.join(' e ');
    resultado = `${textoReais} ${inteiro === 1 ? 'real' : 'reais'}`;
  }

  if (centavos > 0) {
    const textoCentavos = converterCentena(centavos);
    const labelCentavos = centavos === 1 ? 'centavo' : 'centavos';
    if (inteiro > 0) {
      resultado += ` e ${textoCentavos} ${labelCentavos}`;
    } else {
      resultado = `${textoCentavos} ${labelCentavos}`;
    }
  }

  return resultado || 'zero real';
}

function sanitizeFilename(text) {
  if (!text) return 'documento';
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9_\-]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
}

function getNextDocumentNumber() {
  const key = 'notafacil_doc_counter';
  let counter = parseInt(localStorage.getItem(key) || '1', 10);
  const year = new Date().getFullYear();
  const formatted = `${year}-${String(counter).padStart(4, '0')}`;
  return formatted;
}

function incrementDocumentNumber() {
  const key = 'notafacil_doc_counter';
  let counter = parseInt(localStorage.getItem(key) || '1', 10);
  localStorage.setItem(key, String(counter + 1));
}
