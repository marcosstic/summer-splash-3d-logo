/* Summer Splash - Mouse Tracker Module */
export class MouseTracker {
    constructor() {
        this.container = document.getElementById('logoContainer');
        this.root = document.documentElement;
        this.isTracking = false;
        this.sensitivity = 0.15;
        this.maxRotation = 20;
        
        this.init();
    }
    
    init() {
        // Mouse events
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        document.addEventListener('mouseenter', () => this.startTracking());
        document.addEventListener('mouseleave', () => this.stopTracking());
        
        // Touch events for mobile
        document.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        document.addEventListener('touchstart', () => this.startTracking());
        document.addEventListener('touchend', () => this.stopTracking());
        
        // Reset position on click
        this.container.addEventListener('click', () => this.resetPosition());
    }
    
    handleMouseMove(event) {
        if (!this.isTracking) return;
        
        const { clientX, clientY } = event;
        const { innerWidth, innerHeight } = window;
        
        // Calculate normalized position (-1 to 1)
        const x = (clientX / innerWidth) * 2 - 1;
        const y = (clientY / innerHeight) * 2 - 1;
        
        // Apply sensitivity and calculate rotation
        const rotateY = x * this.maxRotation * this.sensitivity;
        const rotateX = -y * this.maxRotation * this.sensitivity;
        
        // Update CSS variables
        this.updateRotation(rotateX, rotateY);
    }
    
    handleTouchMove(event) {
        if (!this.isTracking) return;
        event.preventDefault();
        
        const touch = event.touches[0];
        const { clientX, clientY } = touch;
        const { innerWidth, innerHeight } = window;
        
        const x = (clientX / innerWidth) * 2 - 1;
        const y = (clientY / innerHeight) * 2 - 1;
        
        const rotateY = x * this.maxRotation * this.sensitivity;
        const rotateX = -y * this.maxRotation * this.sensitivity;
        
        this.updateRotation(rotateX, rotateY);
    }
    
    updateRotation(rotateX, rotateY) {
        this.root.style.setProperty('--rx', `${rotateX}deg`);
        this.root.style.setProperty('--ry', `${rotateY}deg`);
    }
    
    startTracking() {
        this.isTracking = true;
        document.body.style.cursor = 'grab';
    }
    
    stopTracking() {
        this.isTracking = false;
        document.body.style.cursor = 'default';
        this.smoothReset();
    }
    
    resetPosition() {
        this.root.style.setProperty('--rx', '0deg');
        this.root.style.setProperty('--ry', '0deg');
        this.root.style.setProperty('--rz', '0deg');
    }
    
    smoothReset() {
        const currentRx = parseFloat(this.root.style.getPropertyValue('--rx')) || 0;
        const currentRy = parseFloat(this.root.style.getPropertyValue('--ry')) || 0;
        
        const targetRx = 0;
        const targetRy = 0;
        
        const steps = 30;
        const stepX = (targetRx - currentRx) / steps;
        const stepY = (targetRy - currentRy) / steps;
        
        let currentStep = 0;
        
        const animate = () => {
            if (currentStep < steps) {
                const newRx = currentRx + (stepX * currentStep);
                const newRy = currentRy + (stepY * currentStep);
                
                this.root.style.setProperty('--rx', `${newRx}deg`);
                this.root.style.setProperty('--ry', `${newRy}deg`);
                
                currentStep++;
                requestAnimationFrame(animate);
            } else {
                this.resetPosition();
            }
        };
        
        animate();
    }
    
    // Public method to adjust sensitivity
    setSensitivity(value) {
        this.sensitivity = Math.max(0.05, Math.min(0.5, value));
    }
    
    // Public method to adjust max rotation
    setMaxRotation(value) {
        this.maxRotation = Math.max(5, Math.min(45, value));
    }
}
