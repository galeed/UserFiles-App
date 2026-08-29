// =============================================
// LÓGICA DE INTRO CYBERPUNK
// =============================================

function initCyberpunkLoader() {
  const loader = document.getElementById('intro-loader');
  const mainApp = document.getElementById('main-app');
  const matrixBg = document.getElementById('matrix-code');
  const progressBar = document.getElementById('intro-progress');
  
  // 1. Generar Código Rápido de Fondo (Matrix effect)
  // Genera caracteres aleatorios muy rápido
  const chars = '0123456789ABCDEF@#$%&<>[]{}+=-_';
  let matrixText = '';
  
  // Llenamos el fondo con mucho texto inicial
  for (let i = 0; i < 4000; i++) {
    matrixText += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  matrixBg.textContent = matrixText;

  // Intervalo ultra rápido para cambiar caracteres (efecto ruido digital)
  const matrixInterval = setInterval(() => {
    let newText = '';
    // Cambiamos solo una parte para rendimiento
    for (let i = 0; i < 100; i++) {
        const index = Math.floor(Math.random() * matrixText.length);
        const char = chars.charAt(Math.floor(Math.random() * chars.length));
        // Simple reemplazo de caracteres al azar
        matrixBg.textContent = matrixBg.textContent.substring(0, index) + char + matrixBg.textContent.substring(index+1);
    }
  }, 30); // 30ms = Muy rápido

  // 2. Simulación de Barra de Progreso
  let progress = 0;
  
  // Usamos un intervalo irregular para que parezca "carga real"
  const progressInterval = setInterval(() => {
    // Incremento aleatorio entre 1 y 7
    progress += Math.floor(Math.random() * 7) + 1;
    
    if (progress >= 100) {
      progress = 100;
      clearInterval(progressInterval);
      clearInterval(matrixInterval); // Parar el ruido de fondo
      
      // 3. Finalizar y mostrar App
      setTimeout(() => {
        // Efecto Fade Out del loader
        loader.classList.add('fade-out');
        // Efecto Fade In de la app
        mainApp.classList.add('main-app-loaded');
        mainApp.classList.remove('hidden-content');
      }, 500); // Pequeña pausa al llegar al 100%
    }
    
    progressBar.style.width = `${progress}%`;
    
  }, 100); // Actualiza cada 100ms
}

// Iniciar el loader en cuanto cargue el DOM
document.addEventListener('DOMContentLoaded', () => {
  // Iniciamos la intro
  initCyberpunkLoader();

  // ... (El resto de tu código JS actual de ALIAS y DRAG&DROP se mantiene igual debajo) ...
  const savedAlias = sessionStorage.getItem('user_alias');
  if (savedAlias) {
    aliasElement.textContent = savedAlias;
  } else {
    updateAlias();
  }
});

// Generación de Alias Anónimos Futuristas
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
  const newAlias = generateAlias();
  aliasElement.textContent = newAlias;
  sessionStorage.setItem('user_alias', newAlias);
}

// Cargar alias guardado o generar uno nuevo
document.addEventListener('DOMContentLoaded', () => {
  const savedAlias = sessionStorage.getItem('user_alias');
  if (savedAlias) {
    aliasElement.textContent = savedAlias;
  } else {
    updateAlias();
  }
});

refreshBtn.addEventListener('click', updateAlias);

// Manejo de Drag and Drop en la interfaz
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');

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
    console.log('Archivo listo para procesar:', files[0].name);
    // Próximo paso: conectar con Supabase / Cloudflare
  }
});

fileInput.addEventListener('change', (e) => {
  if (e.target.files.length > 0) {
    console.log('Archivo seleccionado:', e.target.files[0].name);
    // Próximo paso: conectar con Supabase / Cloudflare
  }
});
