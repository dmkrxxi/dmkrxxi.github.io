// ... предыдущий код без изменений ...

// Мобильное меню
const burgerMenu = document.getElementById('burgerMenu');
const mobileNav = document.getElementById('mobileNav');
const mobileCloseBtn = document.getElementById('mobileCloseBtn');
const mobileOpenContacts = document.getElementById('mobileOpenContacts');
const mobileOpenForm = document.getElementById('mobileOpenForm');
const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');

// Функции для открытия/закрытия модальных окон
function openModal(modal) {
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');
    
    // Если форма очень длинная, прокручиваем к началу
    setTimeout(() => {
        const formContent = modal.querySelector('.form-content');
        if (formContent) {
            formContent.scrollTop = 0;
        }
    }, 10);
}

function closeModal(modal) {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
}

// Открытие мобильного меню
burgerMenu.addEventListener('click', () => {
    mobileNav.classList.add('active');
    burgerMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Закрытие мобильного меню
function closeMobileMenu() {
    mobileNav.classList.remove('active');
    burgerMenu.classList.remove('active');
    document.body.style.overflow = '';
    
    // Закрываем все подменю
    mobileDropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
    });
}

mobileCloseBtn.addEventListener('click', closeMobileMenu);

// Обработчики для ссылок в мобильном меню
mobileOpenContacts.addEventListener('click', (e) => {
    e.preventDefault();
    closeMobileMenu();
    setTimeout(() => {
        openModal(contactsModal);
    }, 300);
});

mobileOpenForm.addEventListener('click', () => {
    closeMobileMenu();
    setTimeout(() => {
        openModal(formModal);
    }, 300);
});

// Подменю в мобильном меню
mobileDropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('.mobile-nav-link');
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        }
    });
});

// Закрытие мобильного меню при клике на обычные ссылки
document.querySelectorAll('.mobile-nav-link:not(.mobile-dropdown .mobile-nav-link), .mobile-dropdown-content a').forEach(link => {
    link.addEventListener('click', (e) => {
        if (!link.getAttribute('href').startsWith('#')) return;
        
        const targetId = link.getAttribute('href');
        if (targetId && targetId.startsWith('#') && targetId !== '#contactsModal') {
            closeMobileMenu();
            
            // Плавная прокрутка к секции
            setTimeout(() => {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }, 300);
        }
    });
});

// Закрытие мобильного меню при изменении размера окна
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Плавная прокрутка для навигации
document.querySelectorAll('nav a, .dropdown-content a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#home' || targetId === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else if (targetId.startsWith('#')) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Открытие/закрытие модального окна контактов
const contactsModal = document.getElementById('contactsModal');
const openContactsBtn = document.getElementById('openContacts');
const closeContactsBtn = document.getElementById('closeContacts');

openContactsBtn.addEventListener('click', () => {
    openModal(contactsModal);
});

closeContactsBtn.addEventListener('click', () => {
    closeModal(contactsModal);
});

window.addEventListener('click', (e) => {
    if (e.target === contactsModal) {
        closeModal(contactsModal);
    }
});

// Открытие/закрытие модального окна формы
const formModal = document.getElementById('formModal');
const openFormBtn = document.getElementById('openForm');
const closeFormBtn = document.getElementById('closeForm');

openFormBtn.addEventListener('click', () => {
    openModal(formModal);
});

closeFormBtn.addEventListener('click', () => {
    closeModal(formModal);
});

window.addEventListener('click', (e) => {
    if (e.target === formModal) {
        closeModal(formModal);
    }
});

// Галерея с прокруткой
const gallerySlider = document.getElementById('gallerySlider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

prevBtn.addEventListener('click', () => {
    gallerySlider.scrollBy({
        left: -320,
        behavior: 'smooth'
    });
});

nextBtn.addEventListener('click', () => {
    gallerySlider.scrollBy({
        left: 320,
        behavior: 'smooth'
    });
});

// Прокрутка отзывов
const reviewsSlider = document.getElementById('reviewsSlider');
const prevReview = document.getElementById('prevReview');  // ИЗМЕНИЛ НА prevReview
const nextReview = document.getElementById('nextReview');  // ИЗМЕНИЛ НА nextReview

// Проверяем, что все элементы найдены
console.log('Слайдер отзывов:', reviewsSlider);
console.log('Кнопка назад:', prevReview);
console.log('Кнопка вперед:', nextReview);

// Только если все элементы существуют, добавляем обработчики
if (reviewsSlider && prevReview && nextReview) {
    prevReview.addEventListener('click', () => {
        console.log('Прокрутка отзывов назад');
        reviewsSlider.scrollBy({
            left: -370,
            behavior: 'smooth'
        });
    });

    nextReview.addEventListener('click', () => {
        console.log('Прокрутка отзывов вперед');
        reviewsSlider.scrollBy({
            left: 370,
            behavior: 'smooth'
        });
    });
} else {
    console.error('Не найдены элементы для прокрутки отзывов!');
    console.error('Найден слайдер:', reviewsSlider);
    console.error('Найдена кнопка prevReview:', prevReview);
    console.error('Найдена кнопка nextReview:', nextReview);
}

// Отправка формы с использованием fetch
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
// ... продолжение кода ...

// Отправка формы с использованием fetch
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// Установка минимальной даты на сегодня
const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.min = today;

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Собираем данные формы
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // В реальном приложении здесь был бы URL сервера
    const apiUrl = 'https://formcarry.com/s/LiYsQAxL-Oj'; // Тестовый URL
    
    // Отправляем данные
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Ошибка сети');
    })
    .then(data => {
    // Показываем сообщение об успехе
    formMessage.textContent = 'Столик успешно забронирован! Мы свяжемся с вами для подтверждения.';
    formMessage.className = 'form-message success';
    formMessage.style.display = 'block';
    
    // Очищаем форму
    contactForm.reset();
    
    // Скрываем сообщение через 5 секунд
    setTimeout(() => {
        formMessage.style.display = 'none';
        closeModal(formModal);
    }, 5000);
})
    .catch(error => {
        // Показываем сообщение об ошибке
        formMessage.textContent = 'Произошла ошибка при бронировании. Пожалуйста, попробуйте еще раз или позвоните нам.';
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';
        
        // Скрываем сообщение через 5 секунд
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    });
});

// Анимация при наведении на карточки товаров
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Кнопки "Заказать" без действия
const buyButtons = document.querySelectorAll('.buy-btn');
buyButtons.forEach(button => {
    button.addEventListener('click', () => {
        alert('Функция онлайн-заказа в разработке. Пожалуйста, забронируйте столик или позвоните нам для заказа.');
    });
});

// Добавляем возможность закрытия модальных окон клавишей ESC
// Добавляем возможность закрытия модальных окон клавишей ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal(contactsModal);
        closeModal(formModal);
    }

});

