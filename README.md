# Mobispace Tools

A collection of **privacy-first, client-side web tools**  
built with modern Web APIs and hosted on GitHub Pages.

🔗 Live: https://o-rrz.github.io/

---

## 🔐 Secure Password Generator

A high-entropy password generator designed with modern
cryptographic principles.

### ✨ Features

- 100% client-side (no server, no tracking)
- Uses Web Crypto API
- Configurable length (6–99)
- Optional symbol set
- Real-time strength estimation
- One-click copy

---

## 🔬 Security Design

### Randomness Source

- `crypto.getRandomValues()`  
  → Cryptographically secure RNG provided by the browser

### Key Derivation

- Algorithm: **PBKDF2**
- Hash: **SHA-256**
- Iterations: **120,000**
- Salt: Random (16 bytes)
- Seed: Random (32 bytes)

PBKDF2 is used here as a deterministic entropy expansion
mechanism, ensuring strong diffusion before character mapping.

### Entropy Estimation

| Mode | Charset | Entropy per char |
|----|----|----|
| No symbols | 62 | ~5.95 bits |
| With symbols | 94 | ~6.55 bits |

Example (24 chars with symbols):










This exceeds the security level of most consumer password policies.

---

## 🧠 Strength Estimation Model

Estimated brute-force time is calculated assuming:
昂
- 10¹⁰ guesses per second
- Offline attack scenario

Displayed as:
> 破解密碼需（X）萬年

This is an approximation for **user intuition**, not a formal proof.

---

## 🌍 Internationalization

The project supports multiple languages via JSON-based i18n.

Current languages:
- 繁體中文 (zh-Hant)
- English (en)

---

## 📦 Philosophy

- No cookies
- No analytics
- No backend
- No data collection

Everything runs locally in your browser.

---

## 📜 License

MIT License
