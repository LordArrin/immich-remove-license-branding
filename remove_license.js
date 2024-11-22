(function() {
  const scriptLog = (message, prefix, groupLogs) => {
    const logArgs = [
      `%c${prefix ? prefix : 'ⓘ'} %c[%cPortainer Proxy%c] %c${message}`, 
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

  // Используем MutationObserver для мониторинга изменений на странице
  const observer = new MutationObserver(() => {
    blockElement();
  });

  const config = {
    childList: true, // наблюдаем за добавлением/удалением дочерних элементов
    subtree: true // наблюдаем за всеми дочерними узлами
  };

  const initObserver = () => {
    observer.observe(document.body, config);
  };

  scriptLog("Using block-element script with MutationObserver", "ツ");

  // Применяем блокировку при загрузке страницы
  document.addEventListener("DOMContentLoaded", () => {
    blockElement();
    initObserver(); // Запускаем MutationObserver для динамического отслеживания изменений
  });

  // Повторно применяем блокировку при изменении URL (SPA)
  window.addEventListener("popstate", blockElement);
  window.addEventListener("pushState", blockElement);
})();
