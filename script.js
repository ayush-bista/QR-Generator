const qrInput = document.getElementById("qrInput");
const foregroundColor = document.getElementById("foregroundColor");
const backgroundColor = document.getElementById("backgroundColor");
const qrSize = document.getElementById("qrSize");
const sizeValue = document.getElementById("sizeValue");
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");
const clearBtn = document.getElementById("clearBtn");
const qrContainer = document.getElementById("qrcode");
const historyList = document.getElementById("historyList");
const statusText = document.getElementById("statusText");

sizeValue.textContent = qrSize.value;

qrSize.addEventListener("input", () => {
  sizeValue.textContent = qrSize.value;
});

function updateHistory(value) {
  const item = document.createElement("li");
  item.textContent = value.length > 60 ? value.slice(0, 60) + "..." : value;
  historyList.prepend(item);

  if (historyList.children.length > 6) {
    historyList.removeChild(historyList.lastChild);
  }
}

function generateQR() {
  const value = qrInput.value.trim();

  if (!value) {
    alert("Please enter some content first.");
    return;
  }

  qrContainer.innerHTML = "";

  new QRCode(qrContainer, {
    text: value,
    width: Number(qrSize.value),
    height: Number(qrSize.value),
    colorDark: foregroundColor.value,
    colorLight: backgroundColor.value,
  });

  updateHistory(value);
  statusText.textContent = "Your customized QR code is ready.";
}

function downloadQR() {
  const img = qrContainer.querySelector("img");
  const canvas = qrContainer.querySelector("canvas");

  if (!img && !canvas) {
    alert("Generate a QR code first.");
    return;
  }

  const link = document.createElement("a");
  link.download = "custom-qr.png";
  link.href = img ? img.src : canvas.toDataURL("image/png");
  link.click();
}

function clearQR() {
  qrInput.value = "";
  qrContainer.innerHTML = "";
  statusText.textContent = "Your QR will appear here.";
}

generateBtn.addEventListener("click", generateQR);
downloadBtn.addEventListener("click", downloadQR);
clearBtn.addEventListener("click", clearQR);