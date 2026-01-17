// Dynamic Motion Parallax Animation (Theme V3)
const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');

const bgImage = new Image();
bgImage.src = 'images/muv_motion_bg.png';

const logoImage = new Image();
logoImage.src = 'images/muv_3d_emblem.png';

let width, height;
let mouse = { x: 0, y: 0 };
let targetMouse = { x: 0, y: 0 };
let loadedCount = 0;

function onImageLoad() {
    loadedCount++;
    if (loadedCount === 2) {
        resize();
        animate();
    }
}

bgImage.onload = onImageLoad;
logoImage.onload = onImageLoad;

window.addEventListener('mousemove', (e) => {
    // Normalize mouse from -1 to 1
    targetMouse.x = (e.clientX / width) * 2 - 1;
    targetMouse.y = (e.clientY / height) * 2 - 1;
});

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);

// Smooth interpolation
function lerp(start, end, factor) {
    return start + (end - start) * factor;
}

// Draw function with specific transforms
function drawLayer(img, shiftX, shiftY, scaleBase, parallaxFactor) {
    if (!img.width) return;

    const imgAspect = img.width / img.height;
    const canvasAspect = width / height;

    let drawW, drawH;

    // Cover Logic
    if (canvasAspect > imgAspect) {
        drawW = width * scaleBase;
        drawH = drawW / imgAspect;
    } else {
        drawH = height * scaleBase;
        drawW = drawH * imgAspect;
    }

    const centerX = width / 2;
    const centerY = height / 2;

    // Apply Parallax
    const offsetX = -shiftX * parallaxFactor * 50;
    const offsetY = -shiftY * parallaxFactor * 50;

    const x = centerX - (drawW / 2) + offsetX;
    const y = centerY - (drawH / 2) + offsetY;

    ctx.drawImage(img, x, y, drawW, drawH);
}

let time = 0;

function animate() {
    requestAnimationFrame(animate);

    // Smooth mouse follow
    mouse.x = lerp(mouse.x, targetMouse.x, 0.05);
    mouse.y = lerp(mouse.y, targetMouse.y, 0.05);

    time += 0.005;

    // Breathing scale (Sine wave)
    // Background breathes slowly, Logo breathes differently
    const breath = Math.sin(time) * 0.02; // +/- 2% scale

    // Clear
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, width, height);

    // 1. Draw Background (Deep space, moves slightly)
    // Scale must be > 1.0 to avoid edges appearing during parallax
    drawLayer(bgImage, mouse.x, mouse.y, 1.1 + breath, 1.0);

    // Add a dark overlay gradient to ensure text readability
    const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width);
    gradient.addColorStop(0, 'rgba(0,0,0,0.1)');
    gradient.addColorStop(1, 'rgba(0,0,0,0.6)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // 2. Draw Logo (Frontend, moves more for depth)
    // Logo can be smaller, centered
    // "Contain" logic for logo instead of "Cover"
    const logoScale = (width < 768) ? 0.3 : 0.2; // Smaller on desktop

    // Custom draw for contained logo
    const logoAspect = logoImage.width / logoImage.height;
    const lH = height * logoScale;
    const lW = lH * logoAspect;

    const lX = (width - lW) / 2 - (mouse.x * 30); // Move opposite to BG for 3D feel? 
    // Usually parallax moves in same direction but different amounts. 
    // Foreground moves MORE than background (or opposite relative to camera).
    // Let's make Logo move MORE (closer to camera).
    const lY = (height - lH) / 2 - (mouse.y * 30);

    // Optional: Add a shadow to the logo
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 10;

    ctx.drawImage(logoImage, lX, lY, lW, lH);

    // Reset shadow
    ctx.shadowColor = 'transparent';
}
