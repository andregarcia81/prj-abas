document.addEventListener("DOMContentLoaded", () => {
  console.log("Interface de abas carregada com sucesso.");
});

document.addEventListener("DOMContentLoaded", function () {
  const scrollButton = document.querySelector('footer a[href="#"]');
  if (scrollButton) {
    scrollButton.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
