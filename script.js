function checkEnv() {
  const status = document.getElementById("status");

  console.log("window.base =", window.base);
  console.log("window.ethereum =", window.ethereum);

  if (window.base || window.ethereum) {
    status.innerText = "✅ Running inside Base App (Provider Detected)";
  } else {
    status.innerText = "🌐 Running in normal browser";
  }
}

window.onload = checkEnv;
