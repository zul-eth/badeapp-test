const status = document.getElementById("status");

async function init() {
  if (!window.ethereum) {
    status.innerText = "❌ No provider";
    return;
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    });

    const address = accounts[0];

    status.innerHTML = `
      ✅ Mini App Active <br>
      👤 ${address.slice(0,6)}...${address.slice(-4)}
    `;

    console.log("Wallet:", address);
  } catch (e) {
    console.log(e);
    status.innerText = "❌ Wallet error";
  }
}

init();
