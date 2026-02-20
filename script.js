function checkEnv() {
  const status = document.getElementById("status");

  if (window.base) {
    status.innerText = "✅ Running inside Base App";
    console.log("Base object:", window.base);
  } else {
    status.innerText = "🌐 Running in normal browser";
  }
}

window.onload = checkEnv;
