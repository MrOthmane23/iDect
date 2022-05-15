let detect_canvas = document.querySelector('#detect');
let ctx = detect_canvas.getContext('2d');
let detection_control = document.querySelector('#detect_frames_control');
let points = [];
let detecting = false;
let detection_frames = [];
let image = new Image();
image.src = './img/test.jpg';

function initCanvas() {
    ctx.clearRect(0, 0, detect_canvas.width, detect_canvas.height);
    detect_canvas.width = detect_canvas.scrollWidth;
    if (!imageVerifyDraw()) {
        setTimeout(initCanvas, 100);
        return;
    }
    ctx.lineWidth = 2;
    drawDetectionPoints();
    drawDetectionFrames();
}

function imageVerifyDraw() {
    if (image.complete && image.naturalWidth > 0) {
        let image_ratio = image.naturalWidth / image.naturalHeight;
        detect_canvas.height = detect_canvas.width / image_ratio;
        ctx.drawImage(image, 0, 0, detect_canvas.width, detect_canvas.height);
        return true;
    }
    return false;
}

initCanvas();

window.addEventListener('resize', initCanvas);



class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class DetectionFrame {
    constructor(points, description) {
        this.points = points;
        this.description = description;
    }
}

detect_canvas.addEventListener('click', (e) => {
    if (detecting) {
        let x = e.layerX / detect_canvas.width;
        let y = e.layerY / detect_canvas.height;
        points.push(new Point(x, y));
        ctx.clearRect(0, 0, detect_canvas.width, detect_canvas.height);
        ctx.drawImage(image, 0, 0, detect_canvas.width, detect_canvas.height);
        ctx.fillStyle = '#0f0';
        drawDetectionFrames();
        points.forEach(point => {
            ctx.fillRect(point.x * detect_canvas.width - 2, point.y * detect_canvas.height - 2, 4, 4);
        });
        drawDetectionPoints();
    }
});

detection_control.querySelector('.add').addEventListener('click', (e) => {
    if (!detecting) {
        detecting = true;
        detection_control.querySelector('.add').innerHTML = 'Stop';
    } else {
        if (points.length < 3) {
            alert('Not enough points');
            return;
        }
        detection_frames.push(new DetectionFrame(points, 'test'));
        drawDetectionFrames();
        points = [];
        detecting = false;
        detection_control.querySelector('.add').innerHTML = 'Add';
    }
});

function drawDetectionFrames() {
    ctx.strokeStyle = '#1f1';
    detection_frames.forEach((frame) => {
        ctx.beginPath();
        frame.points.forEach((point, index) => {
            if (index === 0) {
                ctx.moveTo(point.x * detect_canvas.width, point.y * detect_canvas.height);
            } else {
                ctx.lineTo(point.x * detect_canvas.width, point.y * detect_canvas.height);
            }
        });
        ctx.closePath();
        ctx.stroke();
    });
}

function drawDetectionPoints() {
    ctx.strokeStyle = '#0f0';
    ctx.beginPath();
    points.forEach((point, index) => {
        if (index === 0) {
            ctx.moveTo(point.x * detect_canvas.width, point.y * detect_canvas.height);
        } else {
            ctx.lineTo(point.x * detect_canvas.width, point.y * detect_canvas.height);
        }
    });
    ctx.stroke();
}

window.addEventListener('beforeunload', (e) => {
    if (detection_frames.length > 0) {
        e.returnValue = 'Are you sure you want to leave?';
    }
});