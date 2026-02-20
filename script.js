/* =========================
   BASE MINI APP (OFFICIAL FLOW)
========================= */

async function loadBaseProfile() {

  const status = document.getElementById("status");
  const profile = document.getElementById("profile");

  try {

    // ✅ Frame context dari Base App
    const frame = window.frame;

    if (!frame) {
      status.innerText = "🌐 Not inside Base App";
      return;
    }

    // 🔥 ambil context user resmi
    const context = await frame.context();

    console.log("Base Context:", context);

    /*
      Struktur biasanya:
      context.user.username
      context.user.displayName
      context.user.pfpUrl
      context.user.address
    */

    const user = context.user;

    status.innerText = "✅ Base Mini App Active";

    profile.innerHTML = `
      <div>
        ${user.pfpUrl ? `<img src="${user.pfpUrl}" width="70"/>` : ""}
        <p><b>${user.displayName || user.username}</b></p>
        <small>${user.address}</small>
      </div>
    `;

  } catch (err) {
    console.error(err);
    status.innerText = "❌ Failed load Base profile";
  }
}

window.onload = loadBaseProfile;
