let currentType = "url";
let currentPattern = "rounded";
let logoImage = "";

/* =========================
   QR INITIALIZATION
========================= */

const qrCode = new QRCodeStyling({
  width: 280,
  height: 280,
  type: "svg",
  data: "https://openai.com",
  image: "",

  margin: 10,

  qrOptions: {
    errorCorrectionLevel: "H"
  },

  imageOptions: {
    crossOrigin: "anonymous",
    margin: 8,
    imageSize: 0.3
  },

  dotsOptions: {
    color: "#000000",
    type: "rounded"
  },

  backgroundOptions: {
    color: "#ffffff"
  },

  cornersSquareOptions: {
    type: "extra-rounded"
  },

  cornersDotOptions: {
    type: "dot"
  }
});

qrCode.append(
  document.getElementById("qr-preview")
);

/* =========================
   GET QR DATA
========================= */

function getQRData() {

  // URL
  if (currentType === "url") {

    return (
      document.getElementById("url-input").value
      || "https://openai.com"
    );
  }

  // TEXT
  if (currentType === "text") {

    return (
      document.getElementById("text-input").value
      || "Hello"
    );
  }

  // WIFI
  if (currentType === "wifi") {

    const wifiName =
      document.getElementById("wifi-name").value;

    const wifiPassword =
      document.getElementById("wifi-password").value;

    return `WIFI:T:WPA;S:${wifiName};P:${wifiPassword};;`;
  }

  // EMAIL
  if (currentType === "email") {

    const email =
      document.getElementById("email-input").value;

    return `mailto:${email}`;
  }

}

/* =========================
   UPDATE QR
========================= */

function updateQRCode() {

  const foreground =
    document.getElementById("foreground").value;

  const background =
    document.getElementById("background").value;

  const size =
    Number(
      document.getElementById("qr-size").value
    );

  // Update labels
  document.getElementById(
    "foreground-text"
  ).innerText = foreground;

  document.getElementById(
    "background-text"
  ).innerText = background;

  document.getElementById(
    "size-label"
  ).innerText = `${size}px`;

  // Update QR
  qrCode.update({

    width: size,
    height: size,

    data: getQRData(),

    image: logoImage,

    dotsOptions: {
      color: foreground,
      type: currentPattern
    },

    backgroundOptions: {
      color: background
    }

  });

}

/* =========================
   TABS
========================= */

const tabs =
  document.querySelectorAll(".tab");

tabs.forEach((tab) => {

  tab.addEventListener("click", () => {

    // Remove active
    tabs.forEach((t) => {
      t.classList.remove("active");
    });

    // Add active
    tab.classList.add("active");

    // Set type
    currentType =
      tab.dataset.type;

    // Hide all panels
    document
      .querySelectorAll(".content-panel")
      .forEach((panel) => {
        panel.classList.add("hidden");
      });

    // Show current panel
    document
      .getElementById(
        `${currentType}-panel`
      )
      .classList.remove("hidden");

    updateQRCode();

  });

});

/* =========================
   INPUT EVENTS
========================= */

document
  .querySelectorAll("input, textarea")
  .forEach((element) => {

    element.addEventListener(
      "input",
      updateQRCode
    );

  });

/* =========================
   PATTERN EVENTS
========================= */

const patterns =
  document.querySelectorAll(".pattern");

patterns.forEach((pattern) => {

  pattern.addEventListener("click", () => {

    patterns.forEach((p) => {
      p.classList.remove("active");
    });

    pattern.classList.add("active");

    currentPattern =
      pattern.dataset.pattern;

    updateQRCode();

  });

});

/* =========================
   THEME EVENTS
========================= */

const themes =
  document.querySelectorAll(".theme");

themes.forEach((theme) => {

  theme.addEventListener("click", () => {

    themes.forEach((t) => {
      t.classList.remove("active");
    });

    theme.classList.add("active");

    const foreground =
      theme.dataset.fg;

    const background =
      theme.dataset.bg;

    document.getElementById(
      "foreground"
    ).value = foreground;

    document.getElementById(
      "background"
    ).value = background;

    updateQRCode();

  });

});

/* =========================
   LOGO UPLOAD
========================= */

document
  .getElementById("logo-upload")
  .addEventListener("change", (event) => {

    const file =
      event.target.files[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onload = function(e) {

      logoImage = e.target.result;

      updateQRCode();

    };

    reader.readAsDataURL(file);

  });

/* =========================
   DOWNLOAD PNG
========================= */

document
  .getElementById("download-png")
  .addEventListener("click", () => {

    qrCode.download({
      extension: "png"
    });

  });

/* =========================
   DOWNLOAD SVG
========================= */

document
  .getElementById("download-svg")
  .addEventListener("click", () => {

    qrCode.download({
      extension: "svg"
    });

  });

/* =========================
   INITIAL LOAD
========================= */

updateQRCode();