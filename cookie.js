document.addEventListener("DOMContentLoaded", function () {

    const savedConsent = localStorage.getItem("cookie_consent");

    if (!savedConsent) {
        showBanner();
    } else {
        applyConsent(JSON.parse(savedConsent));
    }

    // =========================
    // COOKIE BANNER
    // =========================
    function showBanner() {
        const banner = document.createElement("div");
        banner.id = "cookie-banner";
        banner.style.cssText = `
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background: #222;
      color: #fff;
      padding: 15px;
      text-align: center;
      z-index: 9999;
      font-family: Arial, sans-serif;
    `;

        banner.innerHTML = `
      This website uses cookies.
      <button id="accept-all" style="margin-left:10px;">Accept all</button>
      <button id="open-settings" style="margin-left:5px;">Settings</button>
    `;

        document.body.appendChild(banner);

        document.getElementById("accept-all").onclick = function () {
            saveConsent({ stats: true, marketing: true });
        };

        document.getElementById("open-settings").onclick = openSettings;
    }

    // =========================
    // SETTINGS MODAL
    // =========================
    function openSettings() {
        const modal = document.createElement("div");
        modal.id = "cookie-modal";
        modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.7);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

        modal.innerHTML = `
      <div style="
        background:#fff;
        color:#000;
        padding:20px;
        width:90%;
        max-width:420px;
        border-radius:8px;
      ">
        <h2>Cookie Settings</h2>

        <p style="margin-bottom:20px;">Here you can choose which cookies are allowed.</p>

        <label style="display:block;margin-bottom:10px;">
          <input type="checkbox" checked disabled>
          <strong>Necessary Cookies</strong>
        </label>

        <label style="display:block;margin-bottom:10px;">
          <input type="checkbox" id="stats">
          Analytics Cookies
        </label>

        <label style="display:block;margin-bottom:20px;">
          <input type="checkbox" id="marketing">
          Marketing Cookies
        </label>

        <button id="save-settings">Save Selection</button>
      </div>
    `;

        document.body.appendChild(modal);

        document.getElementById("save-settings").onclick = function () {
            const consent = {
                stats: document.getElementById("stats").checked,
                marketing: document.getElementById("marketing").checked
            };
            saveConsent(consent);
            modal.remove();
        };
    }

    // =========================
    // SAVE + APPLY CONSENT
    // =========================
    function saveConsent(consent) {
        localStorage.setItem("cookie_consent", JSON.stringify(consent));
        document.getElementById("cookie-banner")?.remove();
        applyConsent(consent);
    }

    function applyConsent(consent) {
        if (consent.stats) loadStats();
        if (consent.marketing) loadMarketing();
    }

    // =========================
    // EXAMPLE SCRIPTS
    // =========================
    function loadStats() {
        console.log("Analytics cookies enabled");
        // e.g., Google Analytics could be loaded here
    }

    function loadMarketing() {
        console.log("Marketing cookies enabled");
        // e.g., Facebook Pixel could be loaded here
    }

});
