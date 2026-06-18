function sendMessage(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const phoneNumber = "5599999999999"; // Troque pelo seu WhatsApp com DDI + DDD

  const text = `Olá, meu nome é ${name}.
Meu e-mail é ${email}.

Quero falar com a Corvix Security sobre:
${message}`;

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

  window.open(url, "_blank");
}