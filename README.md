# 📄 NotaFácil JS - Gerador de Recibos e Orçamentos para Autônomos

> Uma aplicação web moderna, rápida e 100% gratuita desenvolvida em **JavaScript Vanilla**, voltada para pequenos prestadores de serviços locais (eletricistas, pedreiros, manicures, designers, técnicos, encanadores, entregadores) que precisam gerar recibos de quitação e orçamentos profissionais em PDF diretamente do navegador ou celular.

---

## 🚀 Demonstração Rápida

- **Hospedagem ideal:** GitHub Pages (sem necessidade de backend, banco de dados ou compilação)
- **Modo de teste rápido:** Clique no botão **"Carregar Exemplo"** no topo da tela para visualizar um documento completo pré-preenchido instantaneamente.

---

## 💡 Por que este projeto se destaca?

Muitos projetos de portfólio limitam-se a clones de redes sociais ou listas de tarefas (To-Do Lists). O **NotaFácil JS** foi desenvolvido para:
1. **Resolver uma dor real:** Milhões de microempreendedores e autônomos no Brasil não possuem CNPJ ou sistemas pagos de faturamento e acabam enviando orçamentos desformatados pelo WhatsApp ou assinando blocos de papel.
2. **Proporcionar usabilidade real:**
   - Funciona tanto em computadores quanto em smartphones (com abas de alternância de tela).
   - Salva os dados do prestador no `localStorage` para não ser necessário redigitar telefone, CNPJ e chave Pix a cada emissão.
   - Converte automaticamente o valor total para **texto por extenso** (ex: *R$ 1.250,50* vira *um mil, duzentos e cinquenta reais e cinquenta centavos*), item essencial em recibos jurídicos de quitação.
   - Gera um PDF vetorial com corte milimétrico A4 limpo.
   - Gera link direto com mensagem pronta para envio no **WhatsApp** do cliente com 1 clique.

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

---

## 📂 Estrutura de Arquivos

```
NotaFácil/
├── index.html          # Interface principal e folha A4
├── css/
│   └── style.css       # Layout split, folha A4, estilos responsivos e print
├── js/
│   ├── app.js          # Lógica central, eventos, estado e localStorage
│   ├── utils.js        # Formatação BRL, número por extenso e máscaras
│   └── pdf.js          # Geração do PDF via html2pdf/jsPDF e WhatsApp share
├── assets/
│   └── favicon.svg     # Ícone do projeto
└── README.md           # Documentação completa
```

---

## 💻 Como Rodar o Projeto

Como o projeto foi construído em **JavaScript puro**, não é necessário instalar Node.js, npm ou dependências:

1. Clone ou baixe este repositório:
   ```bash
   git clone https://github.com/SEU_USUARIO/notafacil-js.git
   ```
2. Abra o arquivo `index.html` em qualquer navegador (Google Chrome, Firefox, Safari, Edge).
3. Pronto! A aplicação já está funcionando 100%.

---

## 🌐 Como Publicar no GitHub Pages (Gratuito)

1. Crie um novo repositório no GitHub chamado `notafacil-js`.
2. Envie os arquivos do projeto para o repositório (`git push origin main`).
3. No GitHub, acesse **Settings** > **Pages**.
4. Em **Branch**, selecione `main` e a pasta `/(root)`.
5. Clique em **Save**. Em instantes seu link estará ativo (ex: `https://seu-usuario.github.io/notafacil-js/`).

---

## 📢 Sugestão de Post para o LinkedIn

```markdown
🚀 Acabei de desenvolver o NotaFácil JS: uma solução prática e gratuita para autônomos e pequenos prestadores de serviços!

💡 O Problema:
Eletricistas, diaristas, mecânicos, pedreiros e designers frequentemente perdem tempo ou passam uma imagem amadora ao enviar orçamentos soltos no WhatsApp ou ao preencher blocos de recibos de papelaria.

🛠️ A Solução:
Criei uma aplicação web intuitiva em JavaScript Vanilla, HTML5 e CSS3, sem frameworks pesados, focada em resolver essa dor com máxima agilidade:

✅ Alternância rápida entre Orçamento e Recibo de Quitação;
✅ Pré-visualização em tempo real (WYSIWYG) em formato A4;
✅ Conversão automática do valor para texto por extenso em português;
✅ Máscaras dinâmicas de CPF/CNPJ e Telefone;
✅ Persistência local (LocalStorage) para salvar os dados do prestador;
✅ Exportação em PDF nítido (via jsPDF) e envio estruturado para o WhatsApp do cliente com 1 clique;
✅ 100% responsivo para ser usado no celular na hora da visita técnica.

🔗 Teste direto no navegador: [SEU LINK DO GITHUB PAGES]
💻 Código-fonte: [SEU LINK DO REPOSITÓRIO GITHUB]

O que achou da ideia e da interface? Feedbacks são super bem-vindos! 👇

#javascript #frontend #webdevelopment #portflio #solucoesreais #opensource #jspdf
```

---

## 📄 Licença

Este projeto está sob a licença [MIT](https://opensource.org/licenses/MIT). Sinta-se livre para usar, estudar e modificar.
