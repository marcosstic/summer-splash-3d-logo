/* Summer Splash - Parallax Effects Module */
export class ParallaxController {
    constructor() {
        this.elements = [];
        this.isRunning = false;
        this.animationId = null;
        
        this.init();
    }
    
    init() {
        this.createParallaxElements();
        this.startAnimation();
    }
    
    createParallaxElements() {
        // Create floating bubbles for depth effect
        const sceneContainer = document.querySelector('.scene-container');
        
        for (let i = 0; i < 15; i++) {
            const bubble = document.createElement('div');
            bubble.className = 'parallax-bubble';
            bubble.style.cssText = `
                position: absolute;
                width: ${Math.random() * 60 + 20}px;
                height: ${Math.random() * 60 + 20}px;
                background: radial-gradient(circle at 30% 30%, 
                    rgba(90, 231, 245, 0.6), 
                    rgba(90, 231, 245, 0.1));
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                z-index: ${Math.floor(Math.random() * 3) - 2};
                animation: float ${Math.random() * 10 + 10}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            
            sceneContainer.appendChild(bubble);
            this.elements.push({
                element: bubble,
                baseX: parseFloat(bubble.style.left),
                baseY: parseFloat(bubble.style.top),
                depth: Math.random() * 0.5 + 0.1,
                speed: Math.random() * 0.5 + 0.2
            });
        }
        
        // Add floating animation keyframes if not exists
        if (!document.querySelector('#parallax-styles')) {
            const style = document.createElement('style');
            style.id = 'parallax-styles';
            style.textContent = `
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px) translateX(0px);
                    }
                    25% {
                        transform: translateY(-20px) translateX(10px);
                    }
                    50% {
                        transform: translateY(10px) translateX(-10px);
                    }
                    75% {
                        transform: translateY(-10px) translateX(20px);
                    }
                }
                
                .parallax-bubble {
                    filter: blur(1px);
                    opacity: 0.3;
                    transition: transform 0.3s ease-out;
                }
                
                .parallax-bubble:hover {
                    filter: blur(0px);
                    opacity: 0.6;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    startAnimation() {
        this.isRunning = true;
        this.animate();
    }
    
    animate() {
        if (!this.isRunning) return;
        
        const time = Date.now() * 0.001;
        
        this.elements.forEach((item, index) => {
            const { element, baseX, baseY, depth, speed } = item;
            
            // Subtle movement based on time
            const offsetX = Math.sin(time * speed + index) * 10 * depth;
            const offsetY = Math.cos(time * speed + index) * 5 * depth;
            
            // Apply parallax transformation
            element.style.transform = `
                translate(${offsetX}px, ${offsetY}px)
                translateZ(${-depth * 100}px)
                scale(${1 + depth * 0.2})
            `;
        });
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    stopAnimation() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
    
    // Update parallax based on mouse movement
    updateMouseParallax(mouseX, mouseY) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const percentX = (mouseX - centerX) / centerX;
        const percentY = (mouseY - centerY) / centerY;
        
        this.elements.forEach((item) => {
            const { element, baseX, baseY, depth } = item;
            
            const moveX = percentX * 50 * depth;
            const moveY = percentY * 50 * depth;
            
            element.style.transform = `
                translate(${moveX}px, ${moveY}px)
                translateZ(${-depth * 100}px)
                scale(${1 + depth * 0.2})
            `;
        });
    }
    
    // Clean up method
    destroy() {
        this.stopAnimation();
        this.elements.forEach(item => {
            item.element.remove();
        });
        this.elements = [];
    }
}
