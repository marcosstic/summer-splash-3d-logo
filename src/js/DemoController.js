/* Demo Controller - Sistema de Efectos 3D */
export class DemoController {
    constructor() {
        this.currentEffect = 'current';
        this.controlsVisible = false;
        this.init();
    }

    init() {
        this.createControls();
        this.setupEventListeners();
        this.loadSavedEffect();
    }

    createControls() {
        // Botón toggle
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'demo-controls-toggle';
        toggleBtn.innerHTML = '🎨';
        toggleBtn.title = 'Toggle Demo Controls';
        document.body.appendChild(toggleBtn);

        // Panel de controles
        const controls = document.createElement('div');
        controls.className = 'demo-controls hidden';
        controls.innerHTML = `
            <h3>🎨 Efectos 3D Demo</h3>
            
            <button class="effect-button active" data-effect="current">
                ⭐ Actual (Optimizado)
            </button>
            
            <button class="effect-button" data-effect="extrusion">
                🏗️ Extrusión 3D Mejorada
            </button>
            
            <button class="effect-button" data-effect="solid">
                🧱 Bloque Sólido
            </button>
            
            <button class="effect-button" data-effect="neon">
                💫 Neón 3D Glow
            </button>
            
            <button class="effect-button" data-effect="metallic">
                ✨ Metalizado
            </button>
            
            <button class="effect-button" data-effect="inflatable">
                🎈 Inflable 3D
            </button>
        `;

        document.body.appendChild(controls);

        this.toggleBtn = toggleBtn;
        this.controlsPanel = controls;
        this.effectButtons = controls.querySelectorAll('.effect-button');
    }

    setupEventListeners() {
        // Toggle panel
        this.toggleBtn.addEventListener('click', () => this.toggleControls());

        // Effect buttons
        this.effectButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const effect = e.target.dataset.effect;
                this.switchEffect(effect);
            });
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideControls();
            }
            if (e.key === 'd' && e.ctrlKey) {
                e.preventDefault();
                this.toggleControls();
            }
        });
    }

    toggleControls() {
        this.controlsVisible = !this.controlsVisible;
        if (this.controlsVisible) {
            this.showControls();
        } else {
            this.hideControls();
        }
    }

    showControls() {
        this.controlsPanel.classList.remove('hidden');
        this.toggleBtn.innerHTML = '❌';
        this.controlsVisible = true;
    }

    hideControls() {
        this.controlsPanel.classList.add('hidden');
        this.toggleBtn.innerHTML = '🎨';
        this.controlsVisible = false;
    }

    switchEffect(effectName) {
        // Remover clase activa de todos los botones
        this.effectButtons.forEach(btn => btn.classList.remove('active'));
        
        // Añadir clase activa al botón seleccionado
        const selectedBtn = document.querySelector(`[data-effect="${effectName}"]`);
        if (selectedBtn) {
            selectedBtn.classList.add('active');
        }

        // Remover todas las clases de efecto del logo
        const logo = document.querySelector('.logo-3d');
        logo.className = 'logo-3d';

        // Aplicar nueva clase de efecto
        if (effectName !== 'current') {
            logo.classList.add(`effect-${effectName}`);
        }

        // Guardar preferencia
        this.currentEffect = effectName;
        localStorage.setItem('preferred-3d-effect', effectName);

        // Log para debugging
        console.log(`🎨 Efecto cambiado a: ${effectName}`);
    }

    loadSavedEffect() {
        const savedEffect = localStorage.getItem('preferred-3d-effect');
        if (savedEffect && savedEffect !== 'current') {
            this.switchEffect(savedEffect);
        }
    }

    // Método público para resetear al efecto actual
    resetToCurrent() {
        this.switchEffect('current');
    }

    // Método público para obtener efecto actual
    getCurrentEffect() {
        return this.currentEffect;
    }
}

// Auto-inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.demoController = new DemoController();
    console.log('🎨 Demo Controller initialized - Press Ctrl+D to toggle');
});
