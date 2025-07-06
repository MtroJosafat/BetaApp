// --- PWA Install Prompt ---
let deferredPrompt;
const installBtn = document.getElementById('installBtn');
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'inline-block';
});
installBtn?.addEventListener('click', () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(() => {
            installBtn.style.display = 'none';
            deferredPrompt = null;
        });
    }
});

// --- Service Worker ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js');
    });
}

// --- Tab Navigation ---
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function () {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
        this.classList.add('active');
        document.getElementById(this.dataset.tab).classList.add('active');
        // Focus first interactive element
        setTimeout(() => {
            let f = document.getElementById(this.dataset.tab).querySelector('button, [tabindex]:not([tabindex="-1"])');
            if (f) f.focus();
        }, 200);
    });
});

// --- Modal for Instrumentos ---
window.showModal = function(title, body) {
    const modal = document.getElementById('modal');
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').textContent = body;
    modal.showModal();
};
document.querySelector('.btn-close').onclick = () => document.getElementById('modal').close();

// --- Quiz Data ---
const quizzes = {
    inicial: [
        {
            q: "¿Cuál de los siguientes es un criterio del DSM-5-TR para el diagnóstico de TEA?",
            options: [
                "Fiebre alta persistente",
                "Déficits en comunicación social",
                "Dolores de cabeza frecuentes",
                "Todos los anteriores"
            ],
            correct: 1,
            feedback: "La respuesta correcta es <b>Déficits en comunicación social</b>. Es uno de los dos criterios principales para el diagnóstico de TEA según el DSM-5-TR."
        },
        {
            q: "¿Qué instrumento se utiliza comúnmente para evaluar a niños pequeños (16-30 meses) en riesgo de TEA?",
            options: [
                "M-CHAT-R/F",
                "ADI-R",
                "WISC-V",
                "Ninguno de los anteriores"
            ],
            correct: 0,
            feedback: "La respuesta correcta es <b>M-CHAT-R/F</b>. Es un cuestionario diseñado para screening de TEA en niños pequeños."
        },
        {
            q: "¿Qué profesional NO suele formar parte del equipo multidisciplinar para diagnosticar TEA?",
            options: [
                "Psicólogo",
                "Neurólogo",
                "Chef",
                "Psiquiatra"
            ],
            correct: 2,
            feedback: "La respuesta correcta es <b>Chef</b>. El diagnóstico requiere profesionales de salud mental y desarrollo, no de gastronomía."
        }
    ],
    medio: [
        {
            q: "Según el DSM-5-TR, ¿cuántos síntomas del criterio B (patrones restrictivos/repetitivos) se requieren para el diagnóstico de TEA?",
            options: [
                "1",
                "2",
                "3",
                "4"
            ],
            correct: 1,
            feedback: "La respuesta correcta es <b>2</b>. Se requieren al menos 2 síntomas del criterio B."
        },
        {
            q: "¿Cuál de estos NO es un instrumento específico para evaluar TEA?",
            options: [
                "ADOS-2",
                "ADI-R",
                "M-CHAT-R/F",
                "MMPI-2"
            ],
            correct: 3,
            feedback: "La respuesta correcta es <b>MMPI-2</b>. El MMPI-2 es un test de personalidad para adultos, no específico para TEA."
        },
        {
            q: "¿Qué cambio importante introdujo el DSM-5 respecto al diagnóstico de TEA?",
            options: [
                "Unificó los subtipos en un único espectro",
                "Eliminó el requisito de síntomas en la infancia",
                "Añadió requisitos de pruebas de laboratorio",
                "Redujo el número de criterios necesarios"
            ],
            correct: 0,
            feedback: "La respuesta correcta es <b>Unificó los subtipos en un único espectro</b>."
        }
    ],
    superior: [
        {
            q: "Un niño de 4 años muestra ecolalia, alineación obsesiva de juguetes y evitación del contacto visual, pero tiene buen desarrollo del lenguaje formal. ¿Qué instrumento sería más adecuado?",
            options: [
                "M-CHAT-R/F",
                "Escala de Wechsler",
                "ADOS-2",
                "Ninguno de los anteriores"
            ],
            correct: 2,
            feedback: "La respuesta correcta es <b>ADOS-2</b>. Es el instrumento más completo para evaluar TEA en este caso."
        },
        {
            q: "Según el DSM-5-TR, ¿cuál de estos síntomas pertenece al criterio A (déficits en comunicación social)?",
            options: [
                "Fascinación por las luces intermitentes",
                "Dificultad para ajustar el comportamiento al contexto social",
                "Movimientos estereotipados de las manos",
                "Insistencia en rutinas específicas"
            ],
            correct: 1,
            feedback: "La respuesta correcta es <b>Dificultad para ajustar el comportamiento al contexto social</b>."
        },
        {
            q: "¿Qué evaluación complementaria sería MÁS relevante para un niño con posible TEA que muestra retraso en el lenguaje?",
            options: [
                "Electroencefalograma",
                "Análisis de sangre completo",
                "Radiografía de tórax",
                "Evaluación formal del lenguaje (PLS-5 o CELF-5)"
            ],
            correct: 3,
            feedback: "La respuesta correcta es <b>Evaluación formal del lenguaje (PLS-5 o CELF-5)</b>."
        }
    ]
};

// --- Quiz Rendering & Logic ---
function renderQuiz(level) {
    const container = document.getElementById('quiz-' + level);
    container.innerHTML = '';
    const questions = quizzes[level];
    questions.forEach((q, idx) => {
        const qDiv = document.createElement('div');
        qDiv.className = 'quiz-question';
        qDiv.dataset.idx = idx;
        qDiv.innerHTML = `
            <div class="quiz-q-title">${idx+1}. ${q.q}</div>
            <div class="quiz-options">
                ${q.options.map((opt, i) => `
                    <button class="quiz-option" data-opt="${i}" tabindex="0">${opt}</button>
                `).join('')}
            </div>
            <div class="quiz-feedback"></div>
        `;
        container.appendChild(qDiv);
    });
    // Results and reset
    const res = document.createElement('div');
    res.className = 'quiz-results';
    container.appendChild(res);

    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = 'Reiniciar evaluación';
    btn.onclick = () => renderQuiz(level);
    container.appendChild(btn);

    // Option interaction
    container.querySelectorAll('.quiz-option').forEach(btn => {
        btn.addEventListener('click', function() {
            const qDiv = this.closest('.quiz-question');
            if (qDiv.querySelector('.quiz-option[disabled]')) return; // already answered
            qDiv.querySelectorAll('.quiz-option').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            // Check answer immediately
            checkQuizAnswer(level, qDiv, parseInt(this.dataset.opt));
        });
        btn.addEventListener('keydown', function(e) {
            if (["Enter"," "].includes(e.key)) {
                e.preventDefault(); this.click();
            }
        });
    });
}

function checkQuizAnswer(level, qDiv, selectedIdx) {
    const qIdx = parseInt(qDiv.dataset.idx);
    const q = quizzes[level][qIdx];
    const opts = qDiv.querySelectorAll('.quiz-option');
    opts.forEach((btn, i) => {
        btn.setAttribute('disabled', 'true');
        btn.classList.remove('correct', 'incorrect');
        if (i === q.correct) btn.classList.add('correct');
        else if (i === selectedIdx) btn.classList.add('incorrect');
    });
    const feedback = qDiv.querySelector('.quiz-feedback');
    feedback.innerHTML = q.feedback;
    feedback.className = 'quiz-feedback ' + (selectedIdx === q.correct ? 'correct' : 'incorrect');
    // Update results
    updateQuizResults(level);
}

function updateQuizResults(level) {
    const container = document.getElementById('quiz-' + level);
    const questions = quizzes[level];
    let correct = 0, answered = 0;
    container.querySelectorAll('.quiz-question').forEach((qDiv, idx) => {
        const opt = qDiv.querySelector('.quiz-option.selected');
        if (opt) {
            answered++;
            if (parseInt(opt.dataset.opt) === questions[idx].correct) correct++;
        }
    });
    const res = container.querySelector('.quiz-results');
    if (answered === questions.length) {
        res.innerHTML = `Resultado: <span style="color:var(--gothic-gold)">${correct}</span> de ${questions.length} correctas (${Math.round((correct/questions.length)*100)}%)`;
        res.style.display = 'block';
    } else {
        res.style.display = 'none';
    }
}

// --- Quiz level navigation ---
document.querySelectorAll('.quiz-level').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.quiz-level').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        ['inicial','medio','superior'].forEach(level=>{
            document.getElementById('quiz-'+level).style.display = 'none';
        });
        const level = this.dataset.quiz;
        document.getElementById('quiz-'+level).style.display = 'block';
        renderQuiz(level);
        setTimeout(() => {
            document.getElementById('quiz-'+level).scrollIntoView({behavior:"smooth", block:"start"});
        }, 200);
    });
});

// Inicial rendering
window.addEventListener('DOMContentLoaded', () => {
    ['inicial','medio','superior'].forEach(level=>{
        document.getElementById('quiz-'+level).style.display = 'none';
    });
});

// Keyboard navigation for tabs
document.addEventListener('keydown', function(e){
    if(document.activeElement.classList.contains('tab')){
        let tabs = Array.from(document.querySelectorAll('.tab'));
        let idx = tabs.indexOf(document.activeElement);
        if(e.key==="ArrowRight" && idx < tabs.length-1) {e.preventDefault(); tabs[idx+1].focus();}
        if(e.key==="ArrowLeft" && idx > 0) {e.preventDefault(); tabs[idx-1].focus();}
    }
});

// Accessibility for quiz options
document.addEventListener('keydown', function(e){
    if(document.activeElement.classList.contains('quiz-option')){
        let options = Array.from(document.activeElement.parentElement.querySelectorAll('.quiz-option'));
        let idx = options.indexOf(document.activeElement);
        if(e.key === "ArrowDown" || e.key === "ArrowRight"){
            e.preventDefault();
            if(idx < options.length-1) options[idx+1].focus();
        }
        if(e.key === "ArrowUp" || e.key === "ArrowLeft"){
            e.preventDefault();
            if(idx > 0) options[idx-1].focus();
        }
    }
});
