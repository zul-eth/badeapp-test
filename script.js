/* =========================
   BASE MINI APP SCRIPT
========================= */

console.log("Base Mini App Script Loaded");
console.log("window.ethereum =", window.ethereum);


/* =========================
   DETECT BASE APP ENV
========================= */
function isBaseApp() {
  const p = window.ethereum;
  return p && (p.isCoinbaseWallet || p.isCoinbaseBrowser);
}


/* =========================
   LOAD BASE PROFILE
========================= */
async function loadBaseProfile() {

  const status = document.getElementById("status");
  const profile = document.getElementById("profile");

  if (!isBaseApp()) {
    status.innerText = "🌐 Open inside Base App";
    return;
  }

  try {

    const provider = window.ethereum;

    /* =========================
       REQUEST WALLET ADDRESS
    ========================= */
    const accounts = await provider.request({
      method: "eth_requestAccounts"
    });

    const address = accounts[0];

    console.log("Wallet Address:", address);

    const ethProvider = new ethers.BrowserProvider(provider);

    /* =========================
       ENS / BASENAME LOOKUP
    ========================= */

    let ensName = null;
    let avatar = null;

    try {

      ensName = await ethProvider.lookupAddress(address);
      console.log("ENS Name:", ensName);

      if (ensName) {
        const resolver = await ethProvider.getResolver(ensName);
        avatar = await resolver?.getText("avatar");
      }

    } catch (e) {
      console.log("ENS lookup failed:", e);
    }

    /* =========================
       UPDATE UI
    ========================= */

    status.innerText = "✅ Base Mini App Active";

    profile.innerHTML = `
      <div style="margin-top:10px">
        ${avatar ? `<img src="${avatar}" width="70"/>` : ""}
        <p><b>${ensName || address.slice(0,6)+"..."+address.slice(-4)}</b></p>
        <small>${address}</small>
      </div>
    `;

  } catch (err) {

    console.error(err);
    status.innerText = "❌ Failed load profile";

  }
}


/* =========================
   AUTO RUN WHEN OPENED
========================= */
window.onload = () => {
  loadBaseProfile();
};
