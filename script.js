/* =========================
   BASE MINI APP (OFFICIAL SDK)
========================= */

/*
  SDK resmi Base Mini App
  (Frame SDK)
*/
import { sdk } from "https://esm.sh/@farcaster/frame-sdk";

console.log("Frame SDK Loaded");

/* =========================
   LOAD PROFILE FROM BASE CONTEXT
========================= */
async function loadProfile(){

  const status = document.getElementById("status");
  const profile = document.getElementById("profile");

  try{

    // 🔥 ambil context resmi dari Base App
    const context = await sdk.context;

    console.log("Base Context:", context);

    if(!context || !context.user){
      status.innerText = "🌐 Not opened via Base App";
      return;
    }

    const user = context.user;

    /*
      Struktur dari Base:
      user.displayName
      user.username
      user.pfpUrl
      user.fid
      user.address
    */

    status.innerText = "✅ Base Mini App Active";

    profile.innerHTML = `
      <div>
        ${user.pfpUrl ? `<img src="${user.pfpUrl}" width="70"/>` : ""}
        <p><b>${user.displayName || user.username}</b></p>
        <small>${user.username}</small>
      </div>
    `;

  }catch(err){
    console.error(err);
    status.innerText = "❌ Failed load profile";
  }
}

window.loadProfile = loadProfile;

/* AUTO LOAD */
loadProfile();
