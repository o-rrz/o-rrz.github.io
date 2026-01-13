const base = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

document.addEventListener("DOMContentLoaded", () => {
  const out = document.getElementById("output");
  const btn = document.getElementById("generate");

  btn.onclick = () => {
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    let pwd = "";
    bytes.forEach(b => pwd += base[b % base.length]);
    out.textContent = pwd;
  };
});
