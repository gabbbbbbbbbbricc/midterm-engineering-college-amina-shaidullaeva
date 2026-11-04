document.addEventListener('DOMContentLoaded', () => {

    // ИНТЕРАКТИВ 1: Переключатель оттенка (Navy / Slate Comfort Mode) с сохранением
    const toneBtn = document.getElementById('toneToggleBtn');
    if (localStorage.getItem('ec_tone') === 'slate') {
        document.body.classList.add('slate-mode');
    }
    if (toneBtn) {
        toneBtn.addEventListener('click', () => {
            document.body.classList.toggle('slate-mode');
            const isSlate = document.body.classList.contains('slate-mode');
            localStorage.setItem('ec_tone', isSlate ? 'slate' : 'navy');
            toneBtn.textContent = isSlate ? 'Tone: Warm Slate' : 'Tone: Deep Navy';
        });
    }

    // ИНТЕРАКТИВ 2: Фильтр учебных программ на странице Programs
    const filterButtons = document.querySelectorAll('.filter-btn');
    const programItems = document.querySelectorAll('.program-card-item');

    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('btn-eagle'));
                filterButtons.forEach(b => b.classList.add('btn-outline-eagle'));
                btn.classList.remove('btn-outline-eagle');
                btn.classList.add('btn-eagle');

                const category = btn.getAttribute('data-filter');
                programItems.forEach(item => {
                    if (category === 'all' || item.getAttribute('data-category') === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // ИНТЕРАКТИВ 3: Калькулятор стипендии Eagle Merit на странице Admissions
    const gpaRange = document.getElementById('gpaRange');
    const gpaValue = document.getElementById('gpaValue');
    const discountOutput = document.getElementById('discountOutput');

    if (gpaRange) {
        gpaRange.addEventListener('input', () => {
            const val = parseFloat(gpaRange.value).toFixed(1);
            gpaValue.textContent = val;
            let grant = '0% (Standard Tuition)';
            if (val >= 3.8) grant = '50% Bald Eagle Presidential Grant ($3,000/yr saved)';
            else if (val >= 3.5) grant = '30% Dean’s Honor Grant ($1,800/yr saved)';
            else if (val >= 3.2) grant = '15% Merit Support ($900/yr saved)';
            discountOutput.textContent = grant;
        });
    }

    // ВАЛИДАЦИЯ ФОРМЫ 1: Сложная форма регистрации (registration.html)
    const regForm = document.getElementById('registrationForm');
    if (regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const setFieldState = (input, errorId, condition) => {
                const errEl = document.getElementById(errorId);
                if (!condition) {
                    input.classList.add('is-invalid-field');
                    input.classList.remove('is-valid-field');
                    if (errEl) errEl.style.display = 'block';
                    isValid = false;
                } else {
                    input.classList.remove('is-invalid-field');
                    input.classList.add('is-valid-field');
                    if (errEl) errEl.style.display = 'none';
                }
            };

            const fullName = document.getElementById('fullName');
            setFieldState(fullName, 'err-name', fullName.value.trim().length >= 3);

            const email = document.getElementById('regEmail');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setFieldState(email, 'err-email', emailRegex.test(email.value.trim()));

            const phone = document.getElementById('regPhone');
            const phoneRegex = /^[+\d\s()-]{7,20}$/;
            setFieldState(phone, 'err-phone', phoneRegex.test(phone.value.trim()));

            const program = document.getElementById('regProgram');
            setFieldState(program, 'err-program', program.value !== '');

            const studyModeChecked = document.querySelector('input[name="studyMode"]:checked');
            const errMode = document.getElementById('err-mode');
            if (!studyModeChecked) {
                errMode.style.display = 'block';
                isValid = false;
            } else {
                errMode.style.display = 'none';
            }

            const intake = document.getElementById('regIntake');
            setFieldState(intake, 'err-intake', intake.value !== '');

            const pass = document.getElementById('regPass');
            setFieldState(pass, 'err-pass', pass.value.length >= 8);

            const confirmPass = document.getElementById('regConfirmPass');
            setFieldState(confirmPass, 'err-confirm', confirmPass.value === pass.value && confirmPass.value.length >= 8);

            const terms = document.getElementById('regTerms');
            const errTerms = document.getElementById('err-terms');
            if (!terms.checked) {
                errTerms.style.display = 'block';
                isValid = false;
            } else {
                errTerms.style.display = 'none';
            }

            const confirmBox = document.getElementById('regConfirmation');
            if (isValid) {
                confirmBox.classList.remove('d-none');
                confirmBox.innerHTML = `
                    <h4 class="text-white mb-2">🦅 Application Registered Successfully!</h4>
                    <p class="mb-1">Thank you, <strong>${fullName.value}</strong>. Your applicant profile for <strong>${program.value}</strong> has been created.</p>
                    <p class="small text-secondary mb-0">Confirmation ID: #EC-2026-${Math.floor(1000 + Math.random() * 9000)} | Sent to ${email.value}</p>
                `;
                regForm.reset();
                document.querySelectorAll('.is-valid-field').forEach(el => el.classList.remove('is-valid-field'));
            } else {
                confirmBox.classList.add('d-none');
            }
        });
    }

    // ВАЛИДАЦИЯ ФОРМЫ 2: Контактная форма с защитой от спама (contact.html)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('cName');
            const email = document.getElementById('cEmail');
            const subject = document.getElementById('cSubject');
            const msg = document.getElementById('cMessage');
            const spam = document.getElementById('cSpam');
            const honeypot = document.getElementById('cHoneypot');
            const statusBox = document.getElementById('contactFeedback');

            // Скрытая ловушка для ботов
            if (honeypot && honeypot.value !== '') return;

            const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
            const spamOk = spam.value.trim() === '7';

            if (name.value.trim().length < 2 || !emailOk || subject.value.trim().length < 3 || msg.value.trim().length < 10 || !spamOk) {
                statusBox.className = 'alert mt-3 border border-danger text-light';
                statusBox.style.backgroundColor = '#3b1c22';
                statusBox.textContent = !spamOk
                    ? 'Anti-spam check failed: Please enter the correct sum (4 + 3 = 7).'
                    : 'Please fill out all required fields validly (message must be at least 10 characters).';
                statusBox.classList.remove('d-none');
            } else {
                statusBox.className = 'alert mt-3 border border-success text-light';
                statusBox.style.backgroundColor = '#143326';
                statusBox.textContent = `Thank you, ${name.value}! Your message regarding "${subject.value}" has been received by the Eagle Admissions Desk.`;
                statusBox.classList.remove('d-none');
                contactForm.reset();
            }
        });
    }
});