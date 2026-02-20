/* =========================
   BASE MINI APP (OFFICIAL PROVIDER FLOW)
========================= */

console.log("Script Loaded");
console.log("window.ethereum =", window.ethereum);

/* =========================
   DETECT BASE MINI APP
========================= */
function isBaseMiniApp() {
  const p = window.ethereum;
  return p && (p.isCoinbaseWallet || p.isCoinbaseBrowser);
}

/* =========================
   MAIN CHECK FUNCTION
========================= */
async function checkEnv() {

  const status = document.getElementById("status");

  // ❌ bukan Base App
  if (!isBaseMiniApp()) {
    status.innerText = "🌐 Running in normal browser";
    return;
  }

  status.innerText = "✅ Base Mini App Active";

  try {

    /* =========================
       AMBIL USER ADDRESS
    ========================= */

    const accounts = await window.ethereum.request({
      method: "eth_accounts"
    });

    console.log("Accounts:", accounts);

    if (!accounts || !accounts.length) {
      status.innerText = "⚠️ Wallet not detected";
      return;
    }

    const address = accounts[0];

    console.log("Wallet Address:", address);

    status.innerText =
      "👤 " +
      address.slice(0,6) +
      "..." +
      address.slice(-4);

  } catch (err) {
    console.error(err);
    status.innerText = "❌ Error reading wallet";
  }
}

/* =========================
   EXPOSE TO HTML BUTTON
========================= */
window.checkEnv = checkEnv;

/* =========================
   AUTO RUN ON LOAD
========================= */
window.onload = checkEnv;
