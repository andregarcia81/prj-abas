document.addEventListener("DOMContentLoaded", function () {
  const btnTopo = document.getElementById("btnTopo");

  // Mostrar ou ocultar botão conforme rolagem
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      btnTopo.classList.add("show");
    } else {
      btnTopo.classList.remove("show");
    }
  });

  // Rolagem suave ao topo
  btnTopo.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});
