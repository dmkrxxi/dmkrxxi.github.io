document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('feedbackForm');
    const modalEl = document.getElementById('feedbackModal');
    const modal = new bootstrap.Modal(modalEl);
    const openBtn = document.getElementById('openFormBtn');
    const responseMsg = document.getElementById('formResponse');
    const phoneInput = form.querySelector('[name="phone"]');
    const phonePattern = /^(\+?\d{1,3}[- ]?)?(\(?\d{3}\)?[- ]?)?\d{3}[- ]?\d{2}[- ]?\d{2}$/;
    const emailInput = form.querySelector('[name="email"]');
    const emailPattern = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$', 'i'); // 'i' для нечувствительности к регистру

    // History API: Открытие формы
    openBtn.addEventListener('click', () => {
        history.pushState({ modalOpen: true }, '', '#feedback');
        modal.show();
    });

    // Закрытие формы кнопкой "Назад" в браузере
    window.addEventListener('popstate', (e) => {
        if (!e.state || !e.state.modalOpen) {
            modal.hide();
        }
    });
    
    // Закрытие формы через UI (крестик, Escape) должно сменить URL обратно
    modalEl.addEventListener('hidden.bs.modal', () => {
        if (window.location.hash === '#feedback') {
            history.back(); 
        }
    });

    // LocalStorage
    const fields = ['fio', 'email', 'phone', 'org', 'message'];
    
    // Загрузка сохраненных значений
    fields.forEach(field => {
        const value = localStorage.getItem(field);
        const inputElement = form.querySelector(`[name="${field}"]`);
        if (inputElement && value) {
            inputElement.value = value;
        }
    });

    // Сохранение при вводе
    form.addEventListener('input', (e) => {
        if (fields.includes(e.target.name)) {
            localStorage.setItem(e.target.name, e.target.value);
        }
    });

    // Отправка данных (Fetch)
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!emailPattern.test(emailInput.value.trim())) {
            responseMsg.className = 'mt-3 p-2 text-center d-block rounded error';
            responseMsg.textContent = 'Ошибка: Пожалуйста, введите корректный адрес Email.';
            emailInput.focus(); 
            return; 
        }
        if (!phonePattern.test(phoneInput.value.trim())) {
            responseMsg.className = 'mt-3 p-2 text-center d-block rounded error';
            responseMsg.textContent = 'Ошибка: Пожалуйста, введите корректный номер телефона.';
            phoneInput.focus();
            return;
        }
        responseMsg.className = 'mt-3 p-2 text-center d-block rounded';
        responseMsg.classList.remove('success', 'error');
        responseMsg.textContent = 'Отправка...';

        const formData = new FormData(form);
        
        try {
            const response = await fetch('https://formcarry.com/s/0Cjp6PzwM9Q', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                responseMsg.textContent = 'Успешно отправлено!';
                responseMsg.classList.add('success');
                form.reset();
                fields.forEach(f => localStorage.removeItem(f)); // Очистка LocalStorage
            } else {
                throw new Error('Server returned an error');
            }
        } catch (error) {
            responseMsg.textContent = 'Ошибка при отправке.';
            responseMsg.classList.add('error');
        }
    });

});

