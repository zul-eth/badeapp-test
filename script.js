import { sdk } from "https://esm.sh/@farcaster/miniapp-sdk";

const status = document.getElementById("status");

async function init() {

  // 🔥 WAJIB sesuai docs
  await sdk.actions.ready();

  status.innerText = "Mini App Ready";

  // wallet tetap dari provider Base
  const accounts = await window.ethereum.request({
    method: "eth_accounts"
  });

  console.log("Accounts:", accounts);
}

init();
