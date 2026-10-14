const state = {
  docType: 'orcamento',
  docNumber: '',
  docDate: '',
  docDueDate: '',
  provider: {
    name: '',
    doc: '',
    phone: '',
    email: '',
    cityState: '',
    pixKey: '',
    pixType: 'Chave Pix',
    logo: ''
  },
  client: {
    name: '',
    doc: '',
    phone: '',
    address: ''
  },
  items: [
    { id: 1, desc: 'Instalação de quadro de distribuição elétrica', qty: 1, price: 350.00 },
    { id: 2, desc: 'Substituição de disjuntores e cabeamento', qty: 4, price: 45.00 },
    { id: 3, desc: 'Teste de carga e emissão de laudo técnico', qty: 1, price: 120.00 }
  ],
  discount: 0,
  paymentMethod: 'pix',
  notes: 'Garantia de 90 dias sobre a mão de obra realizada. Proposta válida por 15 dias.'
};

const SAMPLE_DATA = {
  docType: 'orcamento',
  docNumber: '',
  docDate: getTodayISO(),
  docDueDate: (() => {
    const d = new Date();
    d.setDate(d.getDate() + 15);
    return d.toISOString().split('T')[0];
  })(),
  provider: {
    name: 'Carlos Mendes - Eletricista & Instalações',
    doc: '12.345.678/0001-90',
    phone: '(11) 98765-4321',
    email: 'carlos.eletrica@exemplo.com',
    cityState: 'São Paulo - SP',
    pixKey: 'carlos.eletrica@exemplo.com',
    pixType: 'E-mail',
    logo: ''
  },
  client: {
    name: 'Mariana Duarte Souza',
    doc: '321.654.987-00',
    phone: '(11) 91234-5678',
    address: 'Av. Paulista, 1578, Apto 102 - Bela Vista'
  },
  items: [
    { id: 1, desc: 'Revisão completa de quadro elétrico residencial', qty: 1, price: 450.00 },
    { id: 2, desc: 'Instalação de 6 luminárias embutidas de LED', qty: 6, price: 35.00 },
    { id: 3, desc: 'Troca de fiação para circuito de chuveiro 220V', qty: 1, price: 180.00 }
  ],
  discount: 40.00,
  paymentMethod: 'pix',
  notes: 'Orçamento com materiais inclusos nos itens especificados. Garantia de 90 dias contra defeitos de instalação.'
};

document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

function initializeApp() {
  state.docNumber = getNextDocumentNumber();
  state.docDate = getTodayISO();
  
  const defaultDueDate = new Date();
  defaultDueDate.setDate(defaultDueDate.getDate() + 15);
  state.docDueDate = defaultDueDate.toISOString().split('T')[0];

  loadSavedProviderData();
  syncStateToForm();
  renderFormItems();
  updateLivePreview();
  setupEventListeners();

  if (window.lucide) {
    lucide.createIcons();
  }
}

function loadSavedProviderData() {
  try {
    const saved = localStorage.getItem('notafacil_provider_data');
    if (saved) {
      const parsed = JSON.parse(saved);
      state.provider = { ...state.provider, ...parsed };
    }
  } catch (err) {
    console.warn('Erro ao carregar dados salvos do prestador:', err);
  }
}

function saveProviderData() {
  try {
    const dataToSave = { ...state.provider };
    localStorage.setItem('notafacil_provider_data', JSON.stringify(dataToSave));
  } catch (err) {
    console.warn('Erro ao salvar dados no LocalStorage:', err);
  }
}

function syncStateToForm() {
  const typeRadios = document.querySelectorAll('input[name="docType"]');
  typeRadios.forEach(r => {
    r.checked = r.value === state.docType;
  });

  document.getElementById('docNumber').value = state.docNumber;
  document.getElementById('docDate').value = state.docDate;
  document.getElementById('docDueDate').value = state.docDueDate;

  document.getElementById('providerName').value = state.provider.name;
  document.getElementById('providerDoc').value = state.provider.doc;
  document.getElementById('providerPhone').value = state.provider.phone;
  document.getElementById('providerEmail').value = state.provider.email;
  document.getElementById('providerCityState').value = state.provider.cityState;
  document.getElementById('providerPixKey').value = state.provider.pixKey;
  document.getElementById('providerPixType').value = state.provider.pixType || 'Chave Pix';

  document.getElementById('clientName').value = state.client.name;
  document.getElementById('clientDoc').value = state.client.doc;
  document.getElementById('clientPhone').value = state.client.phone;
  document.getElementById('clientAddress').value = state.client.address;

  document.getElementById('discountInput').value = state.discount > 0 ? state.discount : '';
  document.getElementById('paymentMethod').value = state.paymentMethod;
  document.getElementById('notesInput').value = state.notes;

  toggleDocTypeFields();
}

function readFormToState() {
  const selectedType = document.querySelector('input[name="docType"]:checked');
  if (selectedType) state.docType = selectedType.value;

  state.docNumber = document.getElementById('docNumber').value;
  state.docDate = document.getElementById('docDate').value;
  state.docDueDate = document.getElementById('docDueDate').value;

  state.provider.name = document.getElementById('providerName').value;
  state.provider.doc = document.getElementById('providerDoc').value;
  state.provider.phone = document.getElementById('providerPhone').value;
  state.provider.email = document.getElementById('providerEmail').value;
  state.provider.cityState = document.getElementById('providerCityState').value;
  state.provider.pixKey = document.getElementById('providerPixKey').value;
  state.provider.pixType = document.getElementById('providerPixType').value;

  saveProviderData();

  state.client.name = document.getElementById('clientName').value;
  state.client.doc = document.getElementById('clientDoc').value;
  state.client.phone = document.getElementById('clientPhone').value;
  state.client.address = document.getElementById('clientAddress').value;

  state.discount = parseCurrency(document.getElementById('discountInput').value);
  state.paymentMethod = document.getElementById('paymentMethod').value;
  state.notes = document.getElementById('notesInput').value;
}

function toggleDocTypeFields() {
  const isOrcamento = state.docType === 'orcamento';
  const dueDateGroup = document.getElementById('dueDateGroup');
  const typeBadge = document.getElementById('preview-doc-badge');

  if (dueDateGroup) {
    dueDateGroup.style.display = isOrcamento ? 'block' : 'none';
  }

  if (typeBadge) {
    typeBadge.textContent = isOrcamento ? 'ORÇAMENTO' : 'RECIBO DE PAGAMENTO';
    typeBadge.className = isOrcamento ? 'badge-orcamento' : 'badge-recibo';
  }
}

function setupEventListeners() {
  const form = document.getElementById('document-form');

  form.addEventListener('input', (e) => {
    if (e.target.id === 'providerDoc' || e.target.id === 'clientDoc') {
      e.target.value = maskCPFCNPJ(e.target.value);
    } else if (e.target.id === 'providerPhone' || e.target.id === 'clientPhone') {
      e.target.value = maskPhone(e.target.value);
    }

    readFormToState();
    updateLivePreview();
  });

  const docTypeInputs = document.querySelectorAll('input[name="docType"]');
  docTypeInputs.forEach(radio => {
    radio.addEventListener('change', (e) => {
      state.docType = e.target.value;
      toggleDocTypeFields();
      updateLivePreview();
    });
  });

  const btnAddItem = document.getElementById('btnAddItem');
  if (btnAddItem) {
    btnAddItem.addEventListener('click', () => {
      const nextId = state.items.length > 0 ? Math.max(...state.items.map(i => i.id)) + 1 : 1;
      state.items.push({
        id: nextId,
        desc: '',
        qty: 1,
        price: 0
      });
      renderFormItems();
      updateLivePreview();
      const newInput = document.querySelector(`.item-row[data-id="${nextId}"] .item-desc`);
      if (newInput) newInput.focus();
    });
  }

  const logoInput = document.getElementById('providerLogo');
  const removeLogoBtn = document.getElementById('btnRemoveLogo');

  if (logoInput) {
    logoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        if (file.size > 2 * 1024 * 1024) {
          showToast('A imagem deve ter no máximo 2MB.', 'error');
          return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
          state.provider.logo = event.target.result;
          saveProviderData();
          updateLivePreview();
          if (removeLogoBtn) removeLogoBtn.style.display = 'inline-flex';
          showToast('Logo atualizado com sucesso!', 'success');
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (removeLogoBtn) {
    removeLogoBtn.addEventListener('click', () => {
      state.provider.logo = '';
      if (logoInput) logoInput.value = '';
      saveProviderData();
      updateLivePreview();
      removeLogoBtn.style.display = 'none';
      showToast('Logo removido.', 'info');
    });
  }

  const btnLoadSample = document.getElementById('btnLoadSample');
  if (btnLoadSample) {
    btnLoadSample.addEventListener('click', () => {
      loadSampleData();
    });
  }

  const btnReset = document.getElementById('btnReset');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (confirm('Deseja iniciar um novo documento? Os dados do cliente e itens serão limpos (seus dados de prestador serão mantidos).')) {
        resetClientAndItems();
      }
    });
  }

  const btnDownloadPDF = document.getElementById('btnDownloadPDF');
  if (btnDownloadPDF) {
    btnDownloadPDF.addEventListener('click', async () => {
      const previewEl = document.getElementById('printable-document');
      const originalText = btnDownloadPDF.innerHTML;

      try {
        btnDownloadPDF.disabled = true;
        btnDownloadPDF.innerHTML = `<span class="spinner"></span> Gerando PDF...`;
        
        await generatePDF(previewEl, {
          tipo: state.docType,
          cliente: state.client.name,
          numero: state.docNumber
        });

        showToast('PDF gerado e baixado com sucesso!', 'success');
        state.docNumber = getNextDocumentNumber();
        document.getElementById('docNumber').value = state.docNumber;
        updateLivePreview();
      } catch (err) {
        console.error(err);
        showToast('Erro ao gerar o PDF. Tentando impressão do navegador...', 'error');
        printDocument();
      } finally {
        btnDownloadPDF.disabled = false;
        btnDownloadPDF.innerHTML = originalText;
        if (window.lucide) lucide.createIcons();
      }
    });
  }

  const btnPrint = document.getElementById('btnPrint');
  if (btnPrint) {
    btnPrint.addEventListener('click', () => {
      printDocument();
    });
  }

  const btnWhatsApp = document.getElementById('btnWhatsApp');
  if (btnWhatsApp) {
    btnWhatsApp.addEventListener('click', () => {
      const totals = calculateTotals();
      shareViaWhatsApp({
        clienteNome: state.client.name,
        clienteTelefone: state.client.phone,
        tipo: state.docType,
        docNumero: state.docNumber,
        valorTotal: totals.total,
        prestadorNome: state.provider.name
      });
    });
  }

  const tabEditor = document.getElementById('tabEditor');
  const tabPreview = document.getElementById('tabPreview');
  const editorPane = document.getElementById('editorPane');
  const previewPane = document.getElementById('previewPane');

  if (tabEditor && tabPreview) {
    tabEditor.addEventListener('click', () => {
      tabEditor.classList.add('active');
      tabPreview.classList.remove('active');
      editorPane.classList.remove('mobile-hidden');
      previewPane.classList.add('mobile-hidden');
    });

    tabPreview.addEventListener('click', () => {
      tabPreview.classList.add('active');
      tabEditor.classList.remove('active');
      previewPane.classList.remove('mobile-hidden');
      editorPane.classList.add('mobile-hidden');
    });
  }
}

function renderFormItems() {
  const container = document.getElementById('itemsContainer');
  if (!container) return;

  container.innerHTML = '';

  state.items.forEach((item, index) => {
    const row = document.createElement('div');
    row.className = 'item-row';
    row.setAttribute('data-id', item.id);

    row.innerHTML = `
      <div class="item-col-desc">
        <label class="item-label-mobile">Descrição do Item / Serviço #${index + 1}</label>
        <input type="text" class="form-control item-desc" placeholder="Ex: Troca de disjuntor bipolar 32A" value="${item.desc || ''}">
      </div>
      <div class="item-col-qty">
        <label class="item-label-mobile">Qtd.</label>
        <input type="number" min="1" step="1" class="form-control item-qty" value="${item.qty || 1}">
      </div>
      <div class="item-col-price">
        <label class="item-label-mobile">Valor Unit. (R$)</label>
        <input type="number" min="0" step="0.01" class="form-control item-price" placeholder="0,00" value="${item.price > 0 ? item.price : ''}">
      </div>
      <div class="item-col-subtotal">
        <label class="item-label-mobile">Subtotal</label>
        <span class="item-subtotal-val">${formatCurrency((item.qty || 1) * (item.price || 0))}</span>
      </div>
      <div class="item-col-action">
        <button type="button" class="btn-remove-item" title="Remover item" aria-label="Remover item">
          <i data-lucide="trash-2"></i>
        </button>
      </div>
    `;

    const descInput = row.querySelector('.item-desc');
    const qtyInput = row.querySelector('.item-qty');
    const priceInput = row.querySelector('.item-price');
    const subtotalEl = row.querySelector('.item-subtotal-val');
    const removeBtn = row.querySelector('.btn-remove-item');

    const updateItemData = () => {
      item.desc = descInput.value;
      item.qty = parseFloat(qtyInput.value) || 0;
      item.price = parseFloat(priceInput.value) || 0;
      subtotalEl.textContent = formatCurrency(item.qty * item.price);
      updateLivePreview();
    };

    descInput.addEventListener('input', updateItemData);
    qtyInput.addEventListener('input', updateItemData);
    priceInput.addEventListener('input', updateItemData);

    removeBtn.addEventListener('click', () => {
      if (state.items.length <= 1) {
        item.desc = '';
        item.qty = 1;
        item.price = 0;
        renderFormItems();
        updateLivePreview();
        return;
      }
      state.items = state.items.filter(i => i.id !== item.id);
      renderFormItems();
      updateLivePreview();
    });

    container.appendChild(row);
  });

  if (window.lucide) {
    lucide.createIcons();
  }
}

function calculateTotals() {
  const subtotal = state.items.reduce((acc, item) => {
    return acc + ((item.qty || 0) * (item.price || 0));
  }, 0);

  const discount = Math.min(state.discount || 0, subtotal);
  const total = Math.max(0, subtotal - discount);

  return { subtotal, discount, total };
}

function updateLivePreview() {
  const totals = calculateTotals();
  const isOrcamento = state.docType === 'orcamento';

  const previewDocBadge = document.getElementById('preview-doc-badge');
  const previewDocNumber = document.getElementById('preview-doc-number');
  const previewDocDate = document.getElementById('preview-doc-date');
  const previewDueDateContainer = document.getElementById('preview-due-date-container');
  const previewDocDueDate = document.getElementById('preview-doc-due-date');

  if (previewDocBadge) {
    previewDocBadge.textContent = isOrcamento ? 'ORÇAMENTO' : 'RECIBO DE PAGAMENTO';
    previewDocBadge.className = isOrcamento ? 'doc-badge orcamento' : 'doc-badge recibo';
  }

  if (previewDocNumber) previewDocNumber.textContent = state.docNumber || '0001';
  if (previewDocDate) previewDocDate.textContent = formatDateBR(state.docDate);

  if (previewDueDateContainer) {
    if (isOrcamento && state.docDueDate) {
      previewDueDateContainer.style.display = 'block';
      if (previewDocDueDate) previewDocDueDate.textContent = formatDateBR(state.docDueDate);
    } else {
      previewDueDateContainer.style.display = 'none';
    }
  }

  const previewLogo = document.getElementById('preview-provider-logo');
  if (previewLogo) {
    if (state.provider.logo) {
      previewLogo.src = state.provider.logo;
      previewLogo.style.display = 'block';
    } else {
      previewLogo.style.display = 'none';
    }
  }

  setText('preview-provider-name', state.provider.name || 'Nome do Prestador / Empresa');
  setText('preview-provider-doc', state.provider.doc ? `CNPJ/CPF: ${state.provider.doc}` : '');
  setText('preview-provider-phone', state.provider.phone ? `Tel: ${state.provider.phone}` : '');
  setText('preview-provider-email', state.provider.email ? `E-mail: ${state.provider.email}` : '');
  setText('preview-provider-city', state.provider.cityState || '');

  setText('preview-client-name', state.client.name || 'Nome do Cliente');
  setText('preview-client-doc', state.client.doc ? `CPF/CNPJ: ${state.client.doc}` : '');
  setText('preview-client-phone', state.client.phone ? `WhatsApp / Tel: ${state.client.phone}` : '');
  setText('preview-client-address', state.client.address ? `Endereço: ${state.client.address}` : '');

  const receiptDeclaration = document.getElementById('preview-receipt-declaration');
  if (receiptDeclaration) {
    if (!isOrcamento) {
      receiptDeclaration.style.display = 'block';
      const clienteNome = state.client.name || 'o(a) cliente acima identificado';
      const prestadorNome = state.provider.name || 'o prestador de serviços';
      const valorFormatado = formatCurrency(totals.total);
      const extenso = numeroPorExtenso(totals.total);
      
      receiptDeclaration.innerHTML = `
        <div class="receipt-box">
          <p>
            Recebi(emos) de <strong>${clienteNome}</strong> a importância de <strong>${valorFormatado}</strong> 
            (<em>${extenso}</em>), referente à prestação dos serviços e fornecimentos descritos e discriminados neste documento, 
            dando plena, rasa e geral quitação pela quantia recebida.
          </p>
        </div>
      `;
    } else {
      receiptDeclaration.style.display = 'none';
    }
  }

  const itemsTableBody = document.getElementById('preview-items-body');
  if (itemsTableBody) {
    itemsTableBody.innerHTML = '';
    
    state.items.forEach((item, index) => {
      const tr = document.createElement('tr');
      const desc = item.desc || `Item #${index + 1}`;
      const qty = item.qty || 0;
      const price = item.price || 0;
      const rowTotal = qty * price;

      tr.innerHTML = `
        <td class="col-num">${index + 1}</td>
        <td class="col-desc"><strong>${desc}</strong></td>
        <td class="col-qty text-center">${qty}</td>
        <td class="col-price text-right">${formatCurrency(price)}</td>
        <td class="col-subtotal text-right">${formatCurrency(rowTotal)}</td>
      `;
      itemsTableBody.appendChild(tr);
    });
  }

  setText('preview-subtotal', formatCurrency(totals.subtotal));
  
  const discountRow = document.getElementById('preview-discount-row');
  if (discountRow) {
    if (totals.discount > 0) {
      discountRow.style.display = 'table-row';
      setText('preview-discount', `- ${formatCurrency(totals.discount)}`);
    } else {
      discountRow.style.display = 'none';
    }
  }

  setText('preview-total', formatCurrency(totals.total));
  setText('preview-total-extenso', numeroPorExtenso(totals.total));

  const paymentLabels = {
    pix: 'Pix',
    dinheiro: 'Dinheiro',
    cartao_credito: 'Cartão de Crédito',
    cartao_debito: 'Cartão de Débito',
    transferencia: 'Transferência Bancária',
    boleto: 'Boleto Bancário',
    a_combinar: 'A Combinar'
  };

  const paymentMethodLabel = paymentLabels[state.paymentMethod] || state.paymentMethod;
  setText('preview-payment-method', paymentMethodLabel);

  const pixContainer = document.getElementById('preview-pix-container');
  if (pixContainer) {
    if (state.paymentMethod === 'pix' && state.provider.pixKey) {
      pixContainer.style.display = 'block';
      setText('preview-pix-key', `${state.provider.pixType || 'Chave'}: ${state.provider.pixKey}`);
    } else {
      pixContainer.style.display = 'none';
    }
  }

  const notesContainer = document.getElementById('preview-notes-container');
  if (notesContainer) {
    if (state.notes && state.notes.trim()) {
      notesContainer.style.display = 'block';
      setText('preview-notes-text', state.notes);
    } else {
      notesContainer.style.display = 'none';
    }
  }

  const signDateCity = document.getElementById('preview-signature-date-city');
  if (signDateCity) {
    const city = state.provider.cityState ? `${state.provider.cityState}, ` : '';
    signDateCity.textContent = `${city}${formatDateBR(state.docDate)}`;
  }

  setText('preview-signature-name', state.provider.name || 'Assinatura do Responsável');
  setText('preview-signature-doc', state.provider.doc ? `CPF/CNPJ: ${state.provider.doc}` : '');
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function loadSampleData() {
  state.docType = SAMPLE_DATA.docType;
  state.docNumber = getNextDocumentNumber();
  state.docDate = SAMPLE_DATA.docDate;
  state.docDueDate = SAMPLE_DATA.docDueDate;
  state.provider = JSON.parse(JSON.stringify(SAMPLE_DATA.provider));
  state.client = JSON.parse(JSON.stringify(SAMPLE_DATA.client));
  state.items = JSON.parse(JSON.stringify(SAMPLE_DATA.items));
  state.discount = SAMPLE_DATA.discount;
  state.paymentMethod = SAMPLE_DATA.paymentMethod;
  state.notes = SAMPLE_DATA.notes;

  saveProviderData();
  syncStateToForm();
  renderFormItems();
  updateLivePreview();
  showToast('Exemplo profissional carregado com sucesso!', 'success');
}

function resetClientAndItems() {
  state.client = {
    name: '',
    doc: '',
    phone: '',
    address: ''
  };
  state.items = [
    { id: 1, desc: '', qty: 1, price: 0 }
  ];
  state.discount = 0;
  state.docNumber = getNextDocumentNumber();
  state.docDate = getTodayISO();

  syncStateToForm();
  renderFormItems();
  updateLivePreview();
  showToast('Novo documento pronto para preenchimento.', 'info');
}

function showToast(message, type = 'info') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast-item toast-${type}`;
  
  let iconName = 'info';
  if (type === 'success') iconName = 'check-circle-2';
  if (type === 'error') iconName = 'alert-triangle';

  toast.innerHTML = `
    <i data-lucide="${iconName}"></i>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);
  if (window.lucide) lucide.createIcons();

  setTimeout(() => {
    toast.classList.add('visible');
  }, 10);

  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3500);
}
