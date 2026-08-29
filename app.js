// =============================================
// LÓGICA PANTALLA DE CARGA CYBERPUNK (MATRIX)
// =============================================

function initCyberpunkLoader() {
  const loader = document.getElementById('intro-loader');
  const mainApp = document.getElementById('main-app');
  const matrixBg = document.getElementById('matrix-code');
  const progressBar = document.getElementById('intro-progress');
  
  if (!loader || !mainApp || !matrixBg || !progressBar) return;

  // Set de caracteres Hacker/Matrix
  const chars = '0123456789ABCDEF01<>[]{}/*#+=~$_X';
  let matrixText = '';
  
  // Rellenar fondo con texto inicial
  for (let i = 0; i < 3500; i++) {
    matrixText += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  matrixBg.textContent = matrixText;

  // Cambiar caracteres de forma rápida (efecto ruido digital)
  const matrixInterval = setInterval(() => {
    let currentText = matrixBg.textContent;
    for (let i = 0; i < 80; i++) {
      const index = Math.floor(Math.random() * currentText.length);
      const char = chars.charAt(Math.floor(Math.random() * chars.length));
      currentText = currentText.substring(0, index) + char + currentText.substring(index + 1);
    }
    matrixBg.textContent = currentText;
  }, 30);

  // Barra de progreso
  let progress = 0;
  const progressInterval = setInterval(() => {
    progress += Math.floor(Math.random() * 8) + 2;
    
    if (progress >= 100) {
      progress = 100;
      clearInterval(progressInterval);
      clearInterval(matrixInterval);
      
      setTimeout(() => {
        loader.classList.add('fade-out');
        mainApp.classList.add('main-app-loaded');
        mainApp.classList.remove('hidden-content');
      }, 400);
    }
    
    progressBar.style.width = `${progress}%`;
  }, 90);
}

// =============================================
// GENERADOR DE ALIAS ANÓNIMOS
// =============================================

const prefixes = ['Cyber', 'Neon', 'Shadow', 'Quantum', 'Phantom', 'Vector', 'Pixel', 'Void'];
const suffixes = ['Lynx', 'Falcon', 'Spectre', 'Paws', 'Runner', 'Ghost', 'Vortex', 'Operator'];

function generateAlias() {
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  const num = Math.floor(10 + Math.random() * 90);
  return `${prefix}${suffix}_${num}`;
}

const aliasElement = document.getElementById('current-alias');
const refreshBtn = document.getElementById('btn-refresh-alias');

function updateAlias() {
  if (!aliasElement) return;
  const newAlias = generateAlias();
  aliasElement.textContent = newAlias;
  sessionStorage.setItem('user_alias', newAlias);
}

// =============================================
// EVENTOS Y EVENT LISTENERS
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Iniciar animación de carga
  initCyberpunkLoader();

  // 2. Gestionar Alias
  const savedAlias = sessionStorage.getItem('user_alias');
  if (savedAlias && aliasElement) {
    aliasElement.textContent = savedAlias;
  } else {
    updateAlias();
  }

  if (refreshBtn) {
    refreshBtn.addEventListener('click', updateAlias);
  }

  // 3. Controles Drag & Drop
  const dropZone = document.getElementById('drop-zone');
  const fileInput = document.getElementById('file-input');

  if (dropZone) {
    ['dragenter', 'dragover'].forEach(eventName => {
      dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
      }, false);
    });

    dropZone.addEventListener('drop', (e) => {
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        console.log('Archivo arrastrado:', files[0].name);
      }
    });
  }

  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        console.log('Archivo seleccionado:', e.target.files[0].name);
      }
    });
  }
});
