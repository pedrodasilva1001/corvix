// ==========================================================================
// Corvix Security - Comportamento e Interatividade
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initTypewriter();
  initHeaderScroll();
  initScrollSpy();
  initModalListeners();
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
      const sectionHeight = section.clientHeight;
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
function prefillService(serviceName) {
  const select = document.getElementById("service-select");
  if (select) {
    select.value = serviceName;
  }
}

function prefillPackage(packageName) {
  const select = document.getElementById("service-select");
  if (select) {
    select.value = packageName;
  }
}

/* ==========================================================================
   Envio de Mensagem de Contato via WhatsApp
   ========================================================================== */
function sendMessage(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const service = document.getElementById("service-select").value;
  const message = document.getElementById("message").value.trim();

  // Validação básica
  if (!name || !email || !service || !message) {
    alert("Por favor, preencha todos os campos do formulário.");
    return;
  }

  // Número do WhatsApp (API Internacional)
  const phoneNumber = "5519995347558";

  // Formatação profissional da mensagem
  const text = `*CORVIX SECURITY - NOVO CONTATO DO SITE*

👤 *Nome:* ${name}
✉️ *E-mail:* ${email}
💼 *Interesse:* ${service}

📝 *Mensagem:*
${message}`;

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

  // Abre em nova janela/aba
  window.open(url, "_blank");
}

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
        <i class="fa-brands fa-whatsapp"></i> Solicitar este Serviço
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
