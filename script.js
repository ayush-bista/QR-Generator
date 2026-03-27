const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");
const clearBtn = document.getElementById("clearBtn");

const textValue = document.getElementById("textValue");
const urlValue = document.getElementById("urlValue");
const wifiSsid = document.getElementById("wifiSsid");
const wifiPassword = document.getElementById("wifiPassword");
const wifiSecurity = document.getElementById("wifiSecurity");
const contactName = document.getElementById("contactName");
const contactPhone = document.getElementById("contactPhone");
const contactEmail = document.getElementById("contactEmail");

const foregroundColor = document.getElementById("foregroundColor");
const backgroundColor = document.getElementById("backgroundColor");
const qrSize = document.getElementById("qrSize");
const sizeValue = document.getElementById("sizeValue");
const qrContainer = document.getElementById("qrcode");
const statusText = document.getElementById("statusText");

let activeTab = "text";

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    tabContents.forEach((tab) => tab.classList.remove("active"));

    button.classList.add("active");
    activeTab = button.dataset.tab;

    if (activeTab === "text") document.getElementById("textTab").classList.add("active");
    if (activeTab === "url") document.getElementById("urlTab").classList.add("active");
    if (activeTab === "wifi") document.getElementById("wifiTab").classList.add("active");
    if (activeTab === "contact") document.getElementById("contactTab").classList.add("active");
  });
});

qrSize.addEventListener("input", () => {
  sizeValue.textContent = qrSize.value;
});

function getQRData() {
  if (activeTab === "text") {
    return textValue.value.trim();
  }

  if (activeTab === "url") {
    return urlValue.value.trim();
  }

  if (activeTab === "wifi") {
    const ssid = wifiSsid.value.trim();
    const password = wifiPassword.value.trim();
    const security = wifiSecurity.value;

    return `WIFI:T:${security};S:${ssid};P:${password};;`;
  }

  if (activeTab === "contact") {
    const name = contactName.value.trim();
    const phone = contactPhone.value.trim();
    const email = contactEmail.value.trim();

    return `BEGIN:VCARD
VERSION:3.0
FN:${name}
TEL:${phone}
EMAIL:${email}
END:VCARD`;
  }

  return "";
}

function generateQR() {
  const qrData = getQRData();

  if (!qrData || qrData.includes("S:;") || qrData.includes("FN:")) {
    if (
      (activeTab === "text" && !textValue.value.trim()) ||
      (activeTab === "url" && !urlValue.value.trim()) ||
      (activeTab === "wifi" && !wifiSsid.value.trim()) ||
      (activeTab === "contact" && !contactName.value.trim())
    ) {
      alert("Please fill the required fields first.");
      return;
    }
  }

  qrContainer.innerHTML = "";

  new QRCode(qrContainer, {
    text: qrData,
    width: Number(qrSize.value),
    height: Number(qrSize.value),
    colorDark: foregroundColor.value,
    colorLight: backgroundColor.value
  });

  statusText.textContent = "Your QR code is ready to use and download.";
}

function downloadQR() {
  const img = qrContainer.querySelector("img");
  const canvas = qrContainer.querySelector("canvas");

  if (!img && !canvas) {
    alert("Please generate a QR code first.");
    return;
  }

  const link = document.createElement("a");
  link.download = "qrforge-code.png";
  link.href = img ? img.src : canvas.toDataURL("image/png");
  link.click();
}

function clearFields() {
  textValue.value = "";
  urlValue.value = "";
  wifiSsid.value = "";
  wifiPassword.value = "";
  contactName.value = "";
  contactPhone.value = "";
  contactEmail.value = "";
  qrContainer.innerHTML = "";
  statusText.textContent = "Generate a QR code to preview it here.";
}

generateBtn.addEventListener("click", generateQR);
downloadBtn.addEventListener("click", downloadQR);
clearBtn.addEventListener("click", clearFields);