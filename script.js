const qrInput = document.getElementById("qrInput");
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");
const clearBtn = document.getElementById("clearBtn");
const qrContainer = document.getElementById("qrcode");

let qrCodeInstance = null;

function generateQR() {
  const value = qrInput.value.trim();

  if (!value) {
    alert("Please enter some text or a URL.");
    return;
  }

  qrContainer.innerHTML = "";

  qrCodeInstance = new QRCode(qrContainer, {
    text: value,
    width: 250,
    height: 250,
  });
}

function downloadQR() {
  const img = qrContainer.querySelector("img");
  const canvas = qrContainer.querySelector("canvas");

  if (!img && !canvas) {
    alert("Please generate a QR code first.");
    return;
  }

  let imageSource = "";

  if (img) {
    imageSource = img.src;
  } else if (canvas) {
    imageSource = canvas.toDataURL("image/png");
  }

  const link = document.createElement("a");
  link.href = imageSource;
  link.download = "qrcode.png";
  link.click();
}

function clearQR() {
  qrInput.value = "";
  qrContainer.innerHTML = "";
}

generateBtn.addEventListener("click", generateQR);
downloadBtn.addEventListener("click", downloadQR);
clearBtn.addEventListener("click", clearQR);