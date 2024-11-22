(function() {
  const scriptLog = (message, prefix, groupLogs) => {
    const logArgs = [
      `%c${prefix ? prefix : '?'} %c[%cPortainer Proxy%c] %c${message}`, 
      "color: orange; font-weight: bold;",
      "color: gray; font-weight: bold;",
      "color: cyan; font-weight: bold;",
      "color: gray; font-weight: bold;",
      "color: white; font-weight: normal;"
    ];

    if (groupLogs) {
      console.groupCollapsed(...logArgs);
      groupLogs();
      console.groupEnd();
    } else {
      console.log(...logArgs);
    }
  }

  const blockElement = () => {
    const element = document.querySelectorAll('.border');
    if (element.length >= 10) {
      const targetElement = element[9]; // nth-of-type(10) => индекс 9 в массиве (0-индексация)
      if (targetElement) {
        targetElement.style.display = 'none'; // Блокируем элемент
        scriptLog('Blocked element: .border:nth-of-type(10)');
      } else {
        scriptLog('Element .border:nth-of-type(10) not found');
      }
    }
  };

  scriptLog("Using block-element script", "?");

  // Apply styles when the document is ready
  document.addEventListener("DOMContentLoaded", blockElement);
  // Apply styles on URL change (SPA)
  window.addEventListener("popstate", blockElement);
  window.addEventListener("pushState", blockElement);
})();
