// Lightweight single-account gate for the static investor presentation.
// This discourages casual access but does not replace server-side authentication.
(() => {
  const AUTHORIZED_EMAIL = "investor@nocorealestate.com";
  const AUTHORIZED_PASSWORD_HASH = "0fdb60db372eadca8c59d7be03f8df871daae02041d050819efa77c6ded7716a";
  const form = document.getElementById("authForm");
  const emailInput = document.getElementById("authEmail");
  const passwordInput = document.getElementById("authPassword");
  const submitButton = document.getElementById("authSubmit");
  const errorMessage = document.getElementById("authError");
  let failedAttempts = 0;

  const hashPassword = async (password) => {
    const bytes = new TextEncoder().encode(password);
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    submitButton.disabled = true;
    errorMessage.textContent = "Checking access…";

    const emailMatches = emailInput.value.trim().toLowerCase() === AUTHORIZED_EMAIL;
    const passwordHash = await hashPassword(passwordInput.value);
    const passwordMatches = passwordHash === AUTHORIZED_PASSWORD_HASH;

    if (emailMatches && passwordMatches) {
      document.body.classList.remove("auth-locked");
      passwordInput.value = "";
      errorMessage.textContent = "";
      return;
    }

    failedAttempts += 1;
    passwordInput.value = "";
    errorMessage.textContent = "Email or password is incorrect.";

    const delay = Math.min(failedAttempts * 1000, 5000);
    window.setTimeout(() => {
      submitButton.disabled = false;
      passwordInput.focus();
    }, delay);
  });

  window.addEventListener("load", () => emailInput.focus());
})();
