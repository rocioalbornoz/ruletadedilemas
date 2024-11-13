const questions = [
   "Te ofrecen una beca completa para una carrera que no te apasiona, pero no tienes recursos para estudiar lo que realmente quieres. ¿Qué harías?",
"Tus amigos están eligiendo carreras en una universidad en tu ciudad, pero a ti te interesa una carrera que solo se ofrece en otra ciudad. ¿Te irías?",
"Tus padres insisten en que estudies una carrera con “buen futuro económico”, pero no te sientes identificado con ella. ¿Qué eliges?",
"Recibes una oferta de trabajo en el último año de tu carrera, pero para aceptarla tendrías que dejar los estudios por un tiempo. ¿Qué harías?",
"Te apasionan dos carreras muy diferentes, pero solo puedes elegir una por cuestiones económicas y de tiempo. ¿Cómo decides?",
"Te das cuenta, después del primer semestre, que la carrera que elegiste no es lo que esperabas. ¿Cambias de carrera o sigues para no perder el tiempo?",
"Estás a punto de graduarte, pero surge una oportunidad para realizar prácticas en otro país que implica retrasar tu titulación. ¿Qué harías?",
"Te interesa una carrera que involucra mucha investigación, pero sabes que no es un campo bien pagado. ¿Aún así la elegirías?",
"Encuentras una carrera que te interesa, pero requiere habilidades en las que no eres bueno (como matemáticas o idiomas). ¿Intentas mejorar o buscas otra opción?",
"Tu carrera soñada implica estudiar muchos años más que el promedio. Mientras tanto, otros amigos ya empiezan a trabajar. ¿Aún así la eliges?",
"Te interesa estudiar arte, pero tus padres ofrecen financiarte solo si eliges una carrera más tradicional. ¿Qué harías?",
"Consigues trabajo en una empresa que no tiene nada que ver con lo que estudiaste, pero el sueldo es muy bueno. ¿Te quedas?",
"Descubres que tu carrera está cambiando mucho por la tecnología y no sabes si seguirá siendo relevante en el futuro. ¿Sigues adelante o buscas otra opción?",
"Tus intereses vocacionales cambian con el tiempo: primero te gusta medicina, luego arquitectura, después diseño. ¿Qué haces para decidir?",
"Te ofrecen estudiar en una universidad de prestigio, pero muy exigente, donde hay poca vida social. ¿Eliges prestigio o calidad de vida?",
"Sientes que te apasionan las artes, pero no tienes ejemplos de personas cercanas que hayan tenido éxito en ese campo. ¿Te arriesgarías?",
"Tienes una oferta de empleo estable, pero una startup emergente te ofrece un trabajo más interesante con mucho riesgo. ¿Qué eliges?",
"Durante tus estudios descubres que otra carrera relacionada con la tuya parece más interesante. ¿Te cambias o terminas lo que empezaste?",
"Encuentras una carrera perfecta para ti, pero solo puedes acceder a ella en un idioma que no dominas aún. ¿Te atreves a estudiarla?",
"Una carrera técnica corta te permite trabajar pronto, pero siempre soñaste con estudiar algo más largo y especializado. ¿Qué decides?",

];

const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spinButton');
const questionBox = document.getElementById('question');
const totalSlices = questions.length; // Número de segmentos debe coincidir con el número de preguntas
const sliceAngle = (2 * Math.PI) / totalSlices;
let spinning = false;

// Dibujar la ruleta
function drawWheel() {
    const radius = canvas.width / 2;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    let currentAngle = 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < totalSlices; i++) {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.fillStyle = i % 2 === 0 ? "#0176DE" : "#173F8A";
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        currentAngle += sliceAngle;
    }
}

// Girar la ruleta
function spinWheel() {
    if (spinning) return;
    spinning = true;

    let spinAngle = Math.random() * 360 + 720; // Rotación entre 720 y 1080 grados
    let currentRotation = 0;
    const spinSpeed = 10;
    const spinInterval = setInterval(() => {
        currentRotation += spinSpeed;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(currentRotation * Math.PI / 180);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);
        drawWheel();
        ctx.restore();

        if (currentRotation >= spinAngle) {
            clearInterval(spinInterval);
            spinning = false;
            showQuestion(currentRotation % 360);
        }
    }, 30);
}

// Mostrar la pregunta
function showQuestion(rotationAngle) {
    const sliceIndex = Math.floor(rotationAngle / (360 / totalSlices));
    const question = questions[sliceIndex];
    questionBox.innerHTML = question;
}

// Inicializar la ruleta
drawWheel();

// Evento del botón para girar la ruleta
spinButton.addEventListener('click', spinWheel);

