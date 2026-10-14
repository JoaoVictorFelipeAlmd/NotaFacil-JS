# 📄 NotaFácil JS - Gerador de Recibos e Orçamentos para Autônomos

> Uma aplicação web moderna, rápida e 100% gratuita desenvolvida em **JavaScript Vanilla**, voltada para pequenos prestadores de serviços locais (eletricistas, pedreiros, manicures, designers, técnicos, encanadores, entregadores) que precisam gerar recibos de quitação e orçamentos profissionais em PDF diretamente do navegador ou celular.

---

## 🚀 Demonstração Rápida

- **Hospedagem ideal:** GitHub Pages (sem necessidade de backend, banco de dados ou compilação)
- **Modo de teste rápido:** Clique no botão **"Carregar Exemplo"** no topo da tela para visualizar um documento completo pré-preenchido instantaneamente.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5 Semântico:** Estrutura acessível com formulários nativos, metatags OpenGraph e validação.
- **CSS3 Moderno:**
  - CSS Custom Properties (Variáveis).
  - CSS Grid e Flexbox para layout responsivo split-screen.
  - Folha A4 com proporções e tipografia fieis a um documento corporativo impresso.
  - Regras `@media print` para garantir impressão direta impecável sem elementos de interface.
- **JavaScript (Vanilla / ES6+):**
  - Manipulação reativa de estado no DOM.
  - Máscaras inteligentes de entrada para CPF/CNPJ e Telefone/Celular (sem bibliotecas externas).
  - Algoritmo de conversão monetária para número por extenso em português brasileiro.
  - Armazenamento persistente com `localStorage`.
- **Bibliotecas via CDN:**
  - [html2pdf.js](https://github.com/eKoopmans/html2pdf.js) (integração entre `jsPDF` e `html2canvas` para renderização visual em alta resolução).
  - [Lucide Icons](https://lucide.dev/) (iconografia limpa e moderna).
  - Fonte [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts).

---

## ✨ Funcionalidades

| Recurso | Descrição |
| :--- | :--- |
| **Alternância Orçamento / Recibo** | Alterne com 1 clique entre proposta comercial com validade ou recibo formal com declaração de quitação. |
| **Live Preview (Tempo Real)** | Veja cada letra digitada atualizar instantaneamente na folha A4 ao lado. |
| **Tabela Dinâmica de Itens** | Adicione ou remova linhas de serviços, alterando quantidades e valores unitários com cálculo automático de subtotais. |
| **Cálculo de Desconto e Total** | Insira descontos e veja o valor final e o texto por extenso recalculados em tempo real. |
| **Dados do Prestador Salvos** | Nome, contato, documento e chave Pix ficam salvos no navegador para os próximos usos. |
| **Upload de Logo/Foto** | Insira o logotipo do seu negócio ou foto profissional no cabeçalho do documento (convertido via Base64). |
| **Formas de Pagamento & Pix** | Destaque para chave Pix (CPF, CNPJ, E-mail, Celular ou Aleatória) no corpo do documento. |
| **Exportação em PDF** | Baixa o documento em PDF A4 nítido com nome padronizado (`Tipo_Cliente_Numero.pdf`). |
| **Impressão Direta** | Botão de impressão com estilos CSS dedicados que ocultam menus e mostram apenas o documento. |
| **Compartilhar no WhatsApp** | Gera mensagem estruturada com saudação, total e número da nota direto para o contato do cliente. |
| **Responsivo para Celular** | Abas dedicadas ("Formulário" / "Ver Documento") permitindo ao autônomo fechar negócio na obra ou na rua pelo smartphone. |
