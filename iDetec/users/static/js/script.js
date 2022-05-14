const canvas = document.querySelector('#detect');
const ctx = canvas.getContext('2d');

function setCanvas() {
    canvas.width = canvas.scrollWidth;
    canvas.height = canvas.scrollHeight;
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
setCanvas();
window.addEventListener('resize', () => {
    setCanvas();
});