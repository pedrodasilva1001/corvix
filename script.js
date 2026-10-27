// ==========================================================================
// Corvix Security - Comportamento, Diagnóstico Ao Vivo e Interatividade
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initMobileMenu();
  initTypewriter();
  initHeaderScroll();
  initScrollSpy();
  initModalListeners();
  initFormMessagePrefill();
});

/* ==========================================================================
   Menu Mobile
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  if (menuBtn && mobileMenu) {
    // Abre/fecha o menu
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
      
      // Altera o ícone (hambúrguer <=> X)
      const icon = menuBtn.querySelector("i");
      if (mobileMenu.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
      } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      }
    });

    // Fecha o menu ao clicar em qualquer link
    mobileLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        const icon = menuBtn.querySelector("i");
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      });
    });
  }
}

/* ==========================================================================
   Efeito Typewriter (Digitação Automática no Hero)
   ========================================================================== */
function initTypewriter() {
  const target = document.getElementById("typewriter");
  if (!target) return;

  const words = ["Cybersecurity", "Suporte de TI", "Redes Corporativas", "Segurança de Dados", "Consultoria TI"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let delay = 150;

  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      target.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      delay = 75; // Apaga mais rápido
    } else {
      target.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      delay = 150; // Escreve em velocidade normal
    }

    // Lógica de transição entre escrever e apagar
    if (!isDeleting && charIndex === currentWord.length) {
      delay = 2000; // Pausa após terminar a palavra
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 500; // Pequeno delay antes de começar a próxima
    }

    setTimeout(type, delay);
  }

  // Inicia o loop de digitação
  setTimeout(type, 1000);
}

/* ==========================================================================
   Efeitos do Header ao Rolar
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector(".header-main");
  
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  });
}

/* ==========================================================================
   ScrollSpy (Destaque do menu ativo conforme a página rola)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 120) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

/* ==========================================================================
   Funções de Autofill (Preenchimento Rápido do Formulário)
   ========================================================================== */
const defaultMessages = {
  // Atendimento Humano & Diagnóstico
  "Reunião/Ligação de Apresentação (10 min)": "Olá, equipe Corvix! Hoje em dia há IA e robôs demais no mercado, e acredito que o contato humano faz toda a diferença. Podemos agendar uma rápida ligação ou reunião de 10 minutos para vocês se apresentarem e conversarmos sobre a TI/Segurança da minha empresa?",
  "Diagnóstico de Domínio & Rede": "Olá, Corvix! Gostaria de receber um diagnóstico técnico do domínio e da infraestrutura de rede da minha empresa, e agendar uma rápida conversa com um especialista humano.",

  // Serviços
  "Suporte de TI": "Olá, Corvix! Gostaria de mais informações sobre o serviço de Suporte de TI. Podemos agendar uma rápida ligação para vocês se apresentarem e entenderem a estrutura da minha empresa?",
  "Redes": "Olá, Corvix! Gostaria de mais informações sobre o serviço de Redes. Preciso otimizar e estruturar a rede da minha empresa e gostaria de conversar diretamente com um especialista.",
  "Cybersecurity": "Olá, Corvix! Gostaria de mais informações sobre o serviço de Cybersecurity. Preciso proteger minha empresa contra ameaças digitais e gostaria de agendar uma breve reunião de apresentação.",
  "Segurança de Dados": "Olá, Corvix! Gostaria de mais informações sobre Segurança de Dados e Backups corporativos. Podemos conversar rapidamente por ligação ou reunião?",
  "Consultoria": "Olá, Corvix! Gostaria de mais informações sobre Consultoria de TI e adequação LGPD. Podemos agendar uma rápida ligação de apresentação?",
  "Suporte 24/7": "Olá, Corvix! Tenho operações críticas que precisam de Suporte 24/7 e gostaria de falar diretamente com um especialista humano para conhecer a Corvix.",
  
  // Pacotes
  "Pacote Segurança": "Olá, Corvix! Tenho interesse no Pacote Segurança (análise de vulnerabilidades, hardening e firewall). Podemos agendar uma rápida ligação ou reunião para vocês se apresentarem?",
  "Pacote Internet/Conexão": "Olá, Corvix! Tenho interesse no Pacote Internet/Conexão (roteadores corporativos, Wi-Fi seguro e VPN). Podemos conversar rapidamente com um especialista?",
  "Pacote Suporte/Consultoria": "Olá, Corvix! Tenho interesse no Pacote Suporte/Consultoria. Como o contato humano é essencial para nós, podemos agendar uma rápida ligação de apresentação?",
  "Pacote Proteção Total": "Olá, Corvix! Tenho interesse no Pacote Proteção Total (suporte 24/7, redes seguras e backups em nuvem). Podemos agendar uma reunião rápida de apresentação?"
};

function prefillService(serviceName) {
  const select = document.getElementById("service-select");
  const messageArea = document.getElementById("message");
  if (select) {
    select.value = serviceName;
  }
  if (messageArea && defaultMessages[serviceName]) {
    messageArea.value = defaultMessages[serviceName];
  }
}

function prefillPackage(packageName) {
  const select = document.getElementById("service-select");
  const messageArea = document.getElementById("message");
  if (select) {
    select.value = packageName;
  }
  if (messageArea && defaultMessages[packageName]) {
    messageArea.value = defaultMessages[packageName];
  }
}

window.prefillHumanMeeting = function() {
  prefillService("Reunião/Ligação de Apresentação (10 min)");
  const checkbox = document.getElementById("prefer-human-call");
  if (checkbox) checkbox.checked = true;
};

// Escuta a mudança manual no dropdown do formulário
function initFormMessagePrefill() {
  const serviceSelect = document.getElementById("service-select");
  const messageArea = document.getElementById("message");
  
  if (serviceSelect && messageArea) {
    serviceSelect.addEventListener("change", (e) => {
      const selectedValue = e.target.value;
      const currentMsg = messageArea.value.trim();
      
      // Só substitui a mensagem se estiver vazia ou se contiver uma das mensagens padrão
      const isDefault = currentMsg === "" || Object.values(defaultMessages).includes(currentMsg);
      if (isDefault && defaultMessages[selectedValue]) {
        messageArea.value = defaultMessages[selectedValue];
      }
    });
  }
}

/* ==========================================================================
   Persistência Local de Leads & Envio via WhatsApp
   ========================================================================== */
function saveLeadRecord(leadData) {
  try {
    const existing = JSON.parse(localStorage.getItem("corvix_captured_leads") || "[]");
    existing.unshift({
      ...leadData,
      timestamp: new Date().toISOString(),
      sourceUrl: window.location.href
    });
    localStorage.setItem("corvix_captured_leads", JSON.stringify(existing.slice(0, 200)));
  } catch (err) {
    console.warn("Aviso ao salvar lead localmente:", err);
  }
}

function sendMessage(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const service = document.getElementById("service-select").value;
  const message = document.getElementById("message").value.trim();
  const preferCallEl = document.getElementById("prefer-human-call");
  const preferCall = preferCallEl ? preferCallEl.checked : true;

  // Validação básica
  if (!name || !email || !service || !message) {
    alert("Por favor, preencha todos os campos do formulário.");
    return;
  }

  // Salva o lead antes de abrir o WhatsApp para evitar perda de conversão
  saveLeadRecord({
    type: "contact_form",
    name,
    email,
    service,
    preferHumanCall: preferCall,
    message
  });

  // Número do WhatsApp (API Internacional)
  const phoneNumber = "5519995347558";

  const callTag = preferCall
    ? "✅ *Preferência:* Agendar rápida ligação/reunião humana de apresentação (10 min)\n"
    : "";

  // Formatação profissional da mensagem
  const text = `*CORVIX SECURITY - NOVO CONTATO DO SITE*

👤 *Nome/Empresa:* ${name}
✉️ *E-mail:* ${email}
💼 *Interesse:* ${service}
${callTag}
📝 *Mensagem:*
${message}`;

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

  // Abre em nova janela/aba
  window.open(url, "_blank");
}

/* ==========================================================================
   Scanner Ao Vivo de Segurança de Domínio & Rede (DNS-over-HTTPS)
   ========================================================================== */
let lastDiagnosticResult = null;

function sanitizeDomainInput(raw) {
  let cleaned = (raw || "").trim().toLowerCase();
  cleaned = cleaned.replace(/^https?:\/\//i, "");
  cleaned = cleaned.replace(/^www\./i, "");
  cleaned = cleaned.split("/")[0].split("?")[0].split("#")[0];
  return cleaned;
}

async function queryGoogleDns(name, type = "TXT") {
  const url = `https://dns.google/resolve?name=${encodeURIComponent(name)}&type=${encodeURIComponent(type)}`;
  const response = await fetch(url, { headers: { Accept: "application/dns-json" } });
  if (!response.ok) {
    throw new Error(`Falha na consulta DNS (${response.status})`);
  }
  return response.json();
}

window.runDomainDiagnostic = async function(event) {
  event.preventDefault();

  const inputEl = document.getElementById("scanner-domain-input");
  const submitBtn = document.getElementById("scanner-submit-btn");
  const resultsBox = document.getElementById("scanner-results");
  const checksGrid = document.getElementById("scanner-checks-grid");

  const domain = sanitizeDomainInput(inputEl ? inputEl.value : "");
  if (!domain || !domain.includes(".") || domain.length < 4) {
    alert("Por favor, digite um domínio corporativo válido (ex: suaempresa.com.br).");
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Auditando DNS & Segurança...`;
  }

  try {
    const [txtRes, dmarcRes, mxRes, nsRes, caaRes] = await Promise.all([
      queryGoogleDns(domain, "TXT").catch(() => ({})),
      queryGoogleDns(`_dmarc.${domain}`, "TXT").catch(() => ({})),
      queryGoogleDns(domain, "MX").catch(() => ({})),
      queryGoogleDns(domain, "NS").catch(() => ({})),
      queryGoogleDns(domain, "CAA").catch(() => ({}))
    ]);

    const txtRecords = (txtRes.Answer || []).map(a => (a.data || "").replace(/^"|"$/g, ""));
    const dmarcRecords = (dmarcRes.Answer || []).map(a => (a.data || "").replace(/^"|"$/g, ""));
    const mxRecords = (mxRes.Answer || []).map(a => a.data || "");
    const nsRecords = (nsRes.Answer || []).map(a => a.data || "");
    const caaRecords = (caaRes.Answer || []).map(a => a.data || "");

    // 1. Análise SPF
    const spfRecord = txtRecords.find(r => r.toLowerCase().includes("v=spf1"));
    let spfStatus = "fail";
    let spfLabel = "Ausente / Crítico";
    let spfDesc = "Sem registro SPF. Terceiros podem disparar e-mails falsos usando o nome do seu domínio.";
    let score = 20;

    if (spfRecord) {
      if (spfRecord.includes("-all")) {
        spfStatus = "pass";
        spfLabel = "Blindado (-all)";
        spfDesc = "Política SPF restritiva ativa. Servidores não autorizados são bloqueados.";
        score += 25;
      } else if (spfRecord.includes("~all")) {
        spfStatus = "warn";
        spfLabel = "Parcial (~all)";
        spfDesc = "SPF em modo SoftFail (~all). Recomendamos endurecer a política junto ao DMARC.";
        score += 15;
      } else {
        spfStatus = "warn";
        spfLabel = "Permissivo";
        spfDesc = "SPF encontrado, mas sem regra clara de bloqueio final (-all).";
        score += 8;
      }
    }

    // 2. Análise DMARC
    const dmarcRecord = dmarcRecords.find(r => r.toLowerCase().includes("v=dmarc1"));
    let dmarcStatus = "fail";
    let dmarcLabel = "Desprotegido";
    let dmarcDesc = "Sem DMARC ativo. Sua empresa está vulnerável a ataques de phishing e falsificação de boletos/e-mails (Spoofing).";

    if (dmarcRecord) {
      const lowerDmarc = dmarcRecord.toLowerCase();
      if (lowerDmarc.includes("p=reject")) {
        dmarcStatus = "pass";
        dmarcLabel = "Máxima (p=reject)";
        dmarcDesc = "Política DMARC de bloqueio total configurada corretamente.";
        score += 30;
      } else if (lowerDmarc.includes("p=quarantine")) {
        dmarcStatus = "pass";
        dmarcLabel = "Ativo (Quarentena)";
        dmarcDesc = "E-mails suspeitos em nome da empresa são enviados para quarentena.";
        score += 24;
      } else {
        dmarcStatus = "warn";
        dmarcLabel = "Apenas Monitorando (p=none)";
        dmarcDesc = "O DMARC existe, mas está em modo 'p=none' (não bloqueia ataques reais de falsificação).";
        score += 10;
      }
    }

    // 3. Análise Servidor de E-mail (MX)
    let mxStatus = "warn";
    let mxLabel = "Não Identificado";
    let mxDesc = "Nenhum servidor de e-mail corporativo (MX) detectado neste domínio.";
    let providerName = "Não detectado";

    if (mxRecords.length > 0) {
      const joinedMx = mxRecords.join(" ").toLowerCase();
      if (joinedMx.includes("google") || joinedMx.includes("googlemail")) {
        providerName = "Google Workspace";
      } else if (joinedMx.includes("outlook") || joinedMx.includes("protection.outlook")) {
        providerName = "Microsoft 365";
      } else if (joinedMx.includes("locaweb")) {
        providerName = "Locaweb";
      } else if (joinedMx.includes("kinghost")) {
        providerName = "KingHost";
      } else if (joinedMx.includes("titan") || joinedMx.includes("hostgator")) {
        providerName = "HostGator / Titan";
      } else if (joinedMx.includes("zoho")) {
        providerName = "Zoho Mail";
      } else {
        providerName = "Servidor Dedicado / Próprio";
      }
      mxStatus = "pass";
      mxLabel = providerName;
      mxDesc = `${mxRecords.length} servidor(es) MX ativo(s) (${providerName}). Importante auditar MFA e políticas de acesso.`;
      score += 15;
    }

    // 4. Resiliência DNS & Certificados (NS + CAA)
    let dnsStatus = "warn";
    let dnsLabel = "Padrão (Sem CAA)";
    let dnsDesc = `DNS ativo com ${nsRecords.length || 1} nameserver(s), mas sem trava CAA contra emissão indevida de certificados SSL.`;

    if (caaRecords.length > 0 && nsRecords.length >= 2) {
      dnsStatus = "pass";
      dnsLabel = "Blindado (NS + CAA)";
      dnsDesc = "Redundância de DNS ativa e restrição de Autoridade Certificadora (CAA) configurada.";
      score += 10;
    } else if (nsRecords.length >= 2) {
      score += 5;
    }

    score = Math.min(100, Math.max(15, score));

    // Define classificação de risco
    const scoreCircle = document.getElementById("scanner-score-circle");
    const scoreValue = document.getElementById("scanner-score-value");
    const riskBadge = document.getElementById("scanner-risk-badge");
    const domainTitle = document.getElementById("scanner-domain-title");
    const execSummary = document.getElementById("scanner-executive-summary");

    scoreCircle.className = "score-circle";
    riskBadge.className = "score-badge";

    let riskLevelText = "";
    if (score < 60) {
      scoreCircle.classList.add("risk-high");
      riskBadge.classList.add("badge-danger");
      riskLevelText = "Risco Elevado de Exposição";
      execSummary.textContent = `Identificamos brechas importantes na autenticação de domínio de ${domain} que permitem falsificação de identidade corporativa ou instabilidade.`;
    } else if (score < 85) {
      scoreCircle.classList.add("risk-medium");
      riskBadge.classList.add("badge-warning");
      riskLevelText = "Proteção Parcial — Requer Ajustes";
      execSummary.textContent = `O domínio ${domain} possui configuração básica (${providerName}), mas ainda apresenta pontos abertos que exigem hardening.`;
    } else {
      scoreCircle.classList.add("risk-low");
      riskBadge.classList.add("badge-ok");
      riskLevelText = "Boa Maturidade Externa";
      execSummary.textContent = `Parabéns! O perímetro público de DNS/E-mail de ${domain} está bem configurado. Recomendamos auditoria interna de rede, firewall e backups.`;
    }

    scoreValue.textContent = score;
    riskBadge.textContent = riskLevelText;
    domainTitle.textContent = `Diagnóstico Técnico: ${domain}`;

    const checks = [
      { icon: "fa-envelope-circle-check", title: "Proteção SPF", status: spfStatus, label: spfLabel, desc: spfDesc },
      { icon: "fa-user-shield", title: "Blindagem DMARC", status: dmarcStatus, label: dmarcLabel, desc: dmarcDesc },
      { icon: "fa-server", title: "Infraestrutura E-mail", status: mxStatus, label: mxLabel, desc: mxDesc },
      { icon: "fa-network-wired", title: "Resiliência DNS & SSL", status: dnsStatus, label: dnsLabel, desc: dnsDesc }
    ];

    checksGrid.innerHTML = checks.map(c => `
      <div class="scanner-check-item">
        <div class="scanner-check-top">
          <h4><i class="fa-solid ${c.icon}"></i> ${c.title}</h4>
          <span class="check-status-pill pill-${c.status}">${c.label}</span>
        </div>
        <p>${c.desc}</p>
      </div>
    `).join("");

    lastDiagnosticResult = {
      domain,
      score,
      riskLevelText,
      spfLabel,
      dmarcLabel,
      providerName,
      dnsLabel
    };

    saveLeadRecord({
      type: "domain_scanner",
      domain,
      score,
      riskLevelText,
      spfLabel,
      dmarcLabel,
      providerName
    });

    resultsBox.style.display = "block";
  } catch (err) {
    alert("Não foi possível consultar o DNS deste domínio no momento. Verifique se digitou corretamente (ex: empresa.com.br).");
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<i class="fa-solid fa-magnifying-glass-chart"></i> Analisar Agora`;
    }
  }
};

window.sendDiagnosticToWhatsApp = function() {
  const phoneNumber = "5519995347558";
  const d = lastDiagnosticResult || {
    domain: "minha empresa",
    score: "--",
    riskLevelText: "Pendente",
    spfLabel: "-",
    dmarcLabel: "-"
  };

  const text = `Olá, equipe Corvix! Fiz o diagnóstico rápido do domínio *${d.domain}* no site de vocês:

📊 *Score de Segurança Externa:* ${d.score}/100 (${d.riskLevelText})
🛡️ *SPF:* ${d.spfLabel} | *DMARC:* ${d.dmarcLabel}

Como hoje em dia existe IA demais e o contato humano faz toda a diferença, *podemos agendar uma rápida ligação ou reunião de 10 minutos* para vocês se apresentarem e me mostrarem como blindar esses pontos?`;

  window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, "_blank");
};

/* ==========================================================================
   Widget Assistente Consultivo Corvix (Human-First)
   ========================================================================== */
window.toggleAssistantPopup = function(show) {
  const popup = document.getElementById("corvix-assistant-popup");
  if (!popup) return;
  if (typeof show === "boolean") {
    popup.classList.toggle("active", show);
  } else {
    popup.classList.toggle("active");
  }
};

window.quickAssistantAction = function(actionType) {
  toggleAssistantPopup(false);
  const phoneNumber = "5519995347558";

  if (actionType === "scanner") {
    const diagSection = document.getElementById("diagnostico");
    if (diagSection) {
      diagSection.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const input = document.getElementById("scanner-domain-input");
        if (input) input.focus();
      }, 500);
    }
    return;
  }

  if (actionType === "reuniao") {
    const text = `Olá, pessoal da Corvix! Vi no site de vocês o convite para conversar diretamente com um especialista. Hoje em dia há IA demais e o contato humano faz a diferença — podemos agendar uma rápida ligação/reunião de 10 min para vocês se apresentarem?`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, "_blank");
    return;
  }

  if (actionType === "urgente") {
    const text = `Olá, Corvix! Preciso de suporte técnico / apoio em redes e segurança para minha empresa e gostaria de falar diretamente com um especialista humano.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, "_blank");
  }
};

/* ==========================================================================
   Modal de Detalhes dos Serviços
   ========================================================================== */

// Dados dos Serviços
const serviceDetails = {
  suporte_ti: {
    icon: "fa-laptop-code",
    title: "Suporte de TI Completo",
    prefill: "Suporte de TI",
    description: "Atendimento técnico ágil e especializado para manter o parque tecnológico da sua empresa sempre funcional e livre de problemas. Reduzimos o tempo de inatividade de seus colaboradores resolvendo incidentes rapidamente.",
    bullets: [
      "Suporte remoto imediato e visitas presenciais",
      "Instalação e configuração de softwares corporativos",
      "Formatação e reparo de computadores/notebooks",
      "Instalação e gerenciamento de impressoras",
      "Inventário completo de ativos de hardware",
      "Configuração de e-mails corporativos (Office 365 / Workspace)"
    ]
  },
  redes: {
    icon: "fa-network-wired",
    title: "Infraestrutura de Redes",
    prefill: "Redes",
    description: "Engenharia de conectividade robusta para sua empresa. Desenhamos, implementamos e monitoramos sua infraestrutura de cabos e roteadores corporativos para assegurar estabilidade, velocidade e alta disponibilidade de internet.",
    bullets: [
      "Configuração de Roteadores, Firewalls e Switches",
      "Instalação e calibração de Wi-Fi corporativo seguro",
      "Rede isolada para visitantes/clientes (VLANs)",
      "VPN segura para acesso remoto (Home Office)",
      "Organização e identificação de racks e cabeamento",
      "Redundância de link (Dual-WAN contra quedas)"
    ]
  },
  cybersecurity: {
    icon: "fa-shield-halved",
    title: "Cybersecurity Avançada",
    prefill: "Cybersecurity",
    description: "Blindagem digital completa contra ransomwares, malwares, roubos de identidade e ataques cibernéticos estruturados. Analisamos seus pontos fracos e criamos defesas ativas baseadas em padrões globais de segurança.",
    bullets: [
      "Auditoria de vulnerabilidades em servidores e sistemas",
      "Hardening de estações de trabalho e sistemas operacionais",
      "Bloqueio de portas de risco e varreduras de intrusão",
      "Treinamentos educativos antiphishing para colaboradores",
      "Implementação de políticas de Menor Privilégio",
      "Proteção ativa contra ransomwares e malwares modernos"
    ]
  },
  seguranca_dados: {
    icon: "fa-database",
    title: "Segurança de Dados & Backup",
    prefill: "Segurança de Dados",
    description: "A garantia de que as informações críticas e estratégicas da sua empresa nunca serão perdidas ou sequestradas. Desenhamos rotinas rígidas de backup e criptografia para proteger as informações confidenciais do seu negócio.",
    bullets: [
      "Backups automáticos diários em nuvem criptografada",
      "Servidores NAS locais com tolerância a falhas físicas",
      "Criptografia de discos rígidos em notebooks corporativos",
      "Testes periódicos de restauração (Restore) de dados",
      "Plano de Recuperação de Desastres (Disaster Recovery)",
      "Adequação técnica inicial às normas da LGPD"
    ]
  },
  consultoria: {
    icon: "fa-brain",
    title: "Consultoria e Estratégia de TI",
    prefill: "Consultoria",
    description: "Assessoria técnica para direcionar os investimentos da sua empresa de forma estratégica. Auxiliamos na tomada de decisão de compra de novos sistemas e hardwares, garantindo a melhor relação custo-benefício.",
    bullets: [
      "Planejamento de migração de sistemas locais para a nuvem",
      "Auditoria de conformidade com boas práticas de TI",
      "Relatórios de obsolescência de equipamentos",
      "Desenho de arquitetura de TI para expansão de filiais",
      "Avaliação técnica de fornecedores de software de terceiros",
      "Otimização de custos de licenciamento (SaaS)"
    ]
  },
  suporte_247: {
    icon: "fa-headset",
    title: "Suporte & Monitoramento 24/7",
    prefill: "Suporte 24/7",
    description: "Indicado para empresas com operações contínuas que não toleram interrupções. Nossa equipe atua em plantão dedicado monitorando servidores e bancos de dados para agir proativamente antes mesmo que sua equipe note a instabilidade.",
    bullets: [
      "Plantão de atendimento telefônico emergencial 24h",
      "Monitoramento ativo de Uptime de servidores web",
      "Resposta imediata a incidentes críticos de rede",
      "Acordo de Nível de Serviço (SLA) prioritário",
      "Monitoramento de temperatura de sala de servidores",
      "Relatórios mensais de incidentes resolvidos em plantão"
    ]
  }
};

// Abre o Modal com os dados correspondentes
window.openServiceModal = function(serviceKey) {
  const data = serviceDetails[serviceKey];
  if (!data) return;

  const modal = document.getElementById("service-modal");
  const body = document.getElementById("modal-body");

  if (modal && body) {
    // Constrói o HTML do modal dinamicamente
    let bulletsHTML = "";
    data.bullets.forEach(bullet => {
      bulletsHTML += `<li><i class="fa-solid fa-square-check"></i> ${bullet}</li>`;
    });

    body.innerHTML = `
      <div class="service-icon-wrapper">
        <i class="fa-solid ${data.icon}"></i>
      </div>
      <h3>${data.title}</h3>
      <p>${data.description}</p>
      
      <h4>O que está incluído no escopo:</h4>
      <ul class="modal-bullets">
        ${bulletsHTML}
      </ul>
      
      <button class="btn btn-primary" onclick="selectServiceFromModal('${data.prefill}')">
        <i class="fa-brands fa-whatsapp"></i> Agendar Conversa sobre este Serviço
      </button>
    `;

    modal.classList.add("active");
    document.body.style.overflow = "hidden"; // Desativa scroll da página de fundo
  }
};

// Inicializa os escutadores para fechar o modal
function initModalListeners() {
  const modal = document.getElementById("service-modal");
  const closeBtn = document.getElementById("modal-close");

  if (modal && closeBtn) {
    // Fecha no botão X
    closeBtn.addEventListener("click", closeModal);

    // Fecha ao clicar fora do card
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Fecha ao apertar a tecla ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        closeModal();
      }
    });
  }
}

// Fecha o Modal
function closeModal() {
  const modal = document.getElementById("service-modal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = ""; // Reativa scroll da página
  }
}

// Função de Seleção dentro do Modal
window.selectServiceFromModal = function(servicePrefillValue) {
  closeModal();
  prefillService(servicePrefillValue);
  
  // Rola até o contato
  const contactSection = document.getElementById("contato");
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: "smooth" });
  }
};

/* ==========================================================================
   Inicialização e Alternância de Tema (Claro / Escuro)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById("theme-toggle");
  const themeToggleMobile = document.getElementById("theme-toggle-mobile");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  // Função interna para setar as classes do tema e ícones correspondentes
  function applyTheme(theme) {
    const iconDesktop = themeToggle ? themeToggle.querySelector("i") : null;
    const iconMobile = themeToggleMobile ? themeToggleMobile.querySelector("i") : null;

    if (theme === "light") {
      document.body.classList.add("light-theme");
      if (iconDesktop) {
        iconDesktop.className = "fa-solid fa-moon";
      }
      if (iconMobile) {
        iconMobile.className = "fa-solid fa-moon";
      }
    } else {
      document.body.classList.remove("light-theme");
      if (iconDesktop) {
        iconDesktop.className = "fa-solid fa-sun";
      }
      if (iconMobile) {
        iconMobile.className = "fa-solid fa-sun";
      }
    }
  }

  // Verifica o tema salvo no localStorage, senão herda do sistema operacional
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    applyTheme(systemPrefersDark.matches ? "dark" : "light");
  }

  // Monitora clique no alternador de tema desktop
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isCurrentlyLight = document.body.classList.contains("light-theme");
      const nextTheme = isCurrentlyLight ? "dark" : "light";
      localStorage.setItem("theme", nextTheme);
      applyTheme(nextTheme);
    });
  }

  // Monitora clique no alternador de tema mobile
  if (themeToggleMobile) {
    themeToggleMobile.addEventListener("click", () => {
      const isCurrentlyLight = document.body.classList.contains("light-theme");
      const nextTheme = isCurrentlyLight ? "dark" : "light";
      localStorage.setItem("theme", nextTheme);
      applyTheme(nextTheme);
    });
  }

  // Observa mudanças nas configurações do sistema em tempo real
  systemPrefersDark.addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      applyTheme(e.matches ? "dark" : "light");
    }
  });
}
