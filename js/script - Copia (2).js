document.addEventListener("DOMContentLoaded", function () {
  const btnTopo = document.getElementById("btnTopo");

  // Mostrar ou ocultar botão conforme rolagem
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      btnTopo.classList.remove("d-none");
    } else {
      btnTopo.classList.add("d-none");
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
