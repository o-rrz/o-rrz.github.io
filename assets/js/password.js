const base = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const sym = "!@#$%^&*()_+-=[]{}|;:,.<>?/";

const lenInput = document.getElementById("len");
const lenVal = document.getElementById("lenVal");
const output = document.getElementById("output");
const strength = document.getElementById("strength");

lenInput.oninput = () => {
  lenVal.textContent = lenInput.value;
};

document.getElementById("generate").onclick = () => {
  const len = +lenInput.value;
  const pool = document.getElementById("useSymbol").checked
    ? base + sym
    : base;

  const bytes = crypto.getRandomValues(new Uint8Array(len));
  let pwd = "";
  bytes.forEach(b => pwd += pool[b % pool.length]);

  output.textContent = pwd;
  strength.textContent = `長度 ${len}，字元空間 ${pool.length}`;
};

document.getElementById("copy").onclick = () => {
  if (output.textContent)
    navigator.clipboard.writeText(output.textContent);
};
