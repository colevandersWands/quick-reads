import "./gh-corner.js";
import "./print.min.js";

// Create and inject print button
const printButton = document.createElement("button");
printButton.id = "print-button";
printButton.innerHTML = "🖨️ Print/PDF";
printButton.setAttribute("aria-label", "Print or save as PDF");

// Style the button
printButton.style.cssText = `
  position: fixed;
  top: 20px;
  left: 20px;
  padding: 8px 16px;
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  transition: background 0.3s ease;
`;

// Add hover effects
printButton.addEventListener("mouseenter", () => {
  printButton.style.background = "#1976D2";
});

printButton.addEventListener("mouseleave", () => {
  printButton.style.background = "#2196F3";
});

// Add button to body when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(printButton);
  });
} else {
  document.body.appendChild(printButton);
}

// Handle print click using Print.js
printButton.addEventListener("click", () => {
  // Find the printable container
  const printableElement = document.querySelector(".printable");

  if (!printableElement) {
    // Fallback to window.print if no printable element found
    window.print();
    return;
  }

  // Create a temporary wrapper with an ID for Print.js
  const tempId = "print-js-temp-" + Date.now();
  printableElement.id = tempId;

  // Use Print.js to print the printable content
  printJS({
    printable: tempId,
    type: "html",
    targetStyles: ["*"],
    scanStyles: false,
    css: [
      "../public/normalize.css",
      "../public/paper.css",
      "../public/print.min.css",
      "./styles.css",
    ],
    header: null,
    showModal: false,
    onLoadingEnd: () => {
      // Remove temporary ID after Print.js has processed
      printableElement.removeAttribute("id");
    },
    onError: (error) => {
      console.error("Print error:", error);
      // Clean up and fallback
      printableElement.removeAttribute("id");
      window.print();
    },
  });
});

// Add print styles to hide button during printing
const printStyles = document.createElement("style");
printStyles.textContent = `
  @media print {
    #print-button {
      display: none !important;
    }
    .github-corner {
      display: none !important;
    }
  }
`;
document.head.appendChild(printStyles);
