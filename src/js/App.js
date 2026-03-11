/* Summer Splash - Main Application Controller */
import { MouseTracker } from './MouseTracker.js';

export class App {
    constructor() {
        this.logoText = 'SUMMER SPLASH';
        this.logoContainer = document.getElementById('logo3d');
        this.mouseTracker = null;
        
        this.init();
    }
    
    init() {
        this.create3DLogo();
        this.initializeMouseTracker();
        this.setupEventListeners();
        this.addLoadingAnimation();
    }
    
    create3DLogo() {
        // Clear existing content
        this.logoContainer.innerHTML = '';
        
        // Create front layer with glow effect
        const frontLayer = document.createElement('span');
        frontLayer.className = 'text-layer front';
        frontLayer.textContent = this.logoText;
        this.logoContainer.appendChild(frontLayer);
        
        // Create extrusion layers (15 layers total)
        for (let i = 1; i <= 14; i++) {
            const layer = document.createElement('span');
            layer.className = `text-layer layer-${i}`;
            layer.textContent = this.logoText;
            this.logoContainer.appendChild(layer);
        }
        
        // Create back layer
        const backLayer = document.createElement('span');
        backLayer.className = 'text-layer back';
        backLayer.textContent = this.logoText;
        this.logoContainer.appendChild(backLayer);
        
        console.log(`3D Logo created with ${this.logoContainer.children.length} layers`);
    }
    
    initializeMouseTracker() {
        this.mouseTracker = new MouseTracker();
        console.log('Mouse tracker initialized');
    }
    
    setupEventListeners() {
        // Add keyboard controls
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Add resize handler
        window.addEventListener('resize', () => this.handleResize());
        
        // Add performance monitoring
        this.monitorPerformance();
    }
    
    handleKeyboard(event) {
        switch(event.key.toLowerCase()) {
            case 'r':
                // Reset rotation
                this.mouseTracker.resetPosition();
                break;
            case 'arrowup':
                // Increase sensitivity
                this.mouseTracker.setSensitivity(this.mouseTracker.sensitivity + 0.02);
                console.log(`Sensitivity: ${this.mouseTracker.sensitivity}`);
                break;
            case 'arrowdown':
                // Decrease sensitivity
                this.mouseTracker.setSensitivity(this.mouseTracker.sensitivity - 0.02);
                console.log(`Sensitivity: ${this.mouseTracker.sensitivity}`);
                break;
            case ' ':
                // Space bar for random rotation
                this.randomRotation();
                event.preventDefault();
                break;
        }
    }
    
    handleResize() {
        // Adjust logo size for mobile if needed
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            document.documentElement.style.setProperty('--logo-scale', '0.8');
        } else {
            document.documentElement.style.setProperty('--logo-scale', '1');
        }
    }
    
    randomRotation() {
        const randomX = (Math.random() - 0.5) * 40;
        const randomY = (Math.random() - 0.5) * 40;
        const randomZ = (Math.random() - 0.5) * 10;
        
        document.documentElement.style.setProperty('--rx', `${randomX}deg`);
        document.documentElement.style.setProperty('--ry', `${randomY}deg`);
        document.documentElement.style.setProperty('--rz', `${randomZ}deg`);
        
        // Reset after 2 seconds
        setTimeout(() => {
            this.mouseTracker.smoothReset();
        }, 2000);
    }
    
    addLoadingAnimation() {
        // Add entrance animation
        this.logoContainer.style.opacity = '0';
        this.logoContainer.style.transform = 'scale(0.5) rotateX(90deg)';
        
        setTimeout(() => {
            this.logoContainer.style.transition = 'all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            this.logoContainer.style.opacity = '1';
            this.logoContainer.style.transform = 'scale(1) rotateX(0deg)';
        }, 100);
    }
    
    monitorPerformance() {
        let fps = 0;
        let lastTime = performance.now();
        
        const measureFPS = () => {
            const currentTime = performance.now();
            fps = Math.round(1000 / (currentTime - lastTime));
            lastTime = currentTime;
            
            // Log performance warnings
            if (fps < 30) {
                console.warn(`Low FPS detected: ${fps}`);
            }
            
            requestAnimationFrame(measureFPS);
        };
        
        // Start monitoring after initial load
        setTimeout(() => {
            requestAnimationFrame(measureFPS);
        }, 2000);
    }
    
    // Public API for external control
    updateText(newText) {
        this.logoText = newText;
        this.create3DLogo();
    }
    
    getMouseTracker() {
        return this.mouseTracker;
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    
    // Make app globally accessible for debugging
    window.summerSplashApp = app;
    
    console.log('Summer Splash 3D Logo initialized');
    console.log('Controls: Arrow keys (sensitivity), R (reset), Space (random rotation)');
});
