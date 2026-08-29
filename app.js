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
