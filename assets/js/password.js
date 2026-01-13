const MS = (() => {

const base = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const sym  = "!@#$%^&*()_+-=[]{}|;:,.<>?/";
let last = "";

const derivePassword = async (len, useSymbol) => {
  const seed = crypto.getRandomValues(new Uint8Array(32));
  const salt = crypto.getRandomValues(new Uint8Array(16));

  const key = await crypto.subtle.importKey(
    "raw", seed, { name: "PBKDF2" }, false, ["deriveBits"]
  );

  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt,
      iterations: 120000,
      hash: "SHA-256"
    },
    key,
    768
  );

  const pool = useSymbol ? base + sym : base;
  let out = "";

  new Uint8Array(bits).forEach(b => {
    let c = pool[b % pool.length];
    let code = c.charCodeAt(0);
    code = 33 + ((code - 33 + 11) % 94);
    out += String.fromCharCode(code);
  });

  return out.slice(0, len);
};

const wanYears = n =>
  Math.floor(n / 10000).toLocaleString("zh-Hant");

const calcStrength = (len, pool) => {
  const years = Math.pow(pool, len) / 1e10 / 31536000;
  if (years < 1e3) return ["極弱", "#fa5252", years];
  if (years < 1e6) return ["弱", "#fd7e14", years];
  if (years < 1e9) return ["中", "#fab005", years];
  if (years < 1e12) return ["強", "#40c057", years];
  return ["頂級", "#4dabf7", years];
};

return {
  generate: async () => {
    const len = +document.getElementById("ms_len").value;
    const symb = document.getElementById("ms_symbol").checked;

    last = await derivePassword(len, symb);
    document.getElementById("ms_out").textContent = last;

    const s = calcStrength(len, symb ? 94 : 62);
    document.getElementById("ms_strength").innerHTML =
      `<span style="color:${s[1]}">
        破解密碼需（${wanYears(s[2])}）萬年
      </span>`;
  },

  copy: () => {
    if (last) navigator.clipboard.writeText(last);
  }
};

})();

document.getElementById("ms_len").oninput = e =>
  document.getElementById("ms_len_val").textContent = e.target.value;
