document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы DOM
    const quantityInput = document.getElementById('quantity');
    const productSelect = document.getElementById('product');
    const calculateButton = document.getElementById('calculate');
    const resultDiv = document.getElementById('result');

    // Функция для проверки корректности ввода
    function validateInput(input) {
        // Регулярное выражение: только цифры (одна или более)
        const regex = /^\d+$/;
        return regex.test(input);
    }

    // Функция для расчета стоимости
    function calculateCost() {
        // Получаем значения из формы
        const quantity = quantityInput.value.trim();
        const price = parseInt(productSelect.value);
        
        // Проверяем корректность ввода
        if (!validateInput(quantity)) {
            showResult('Ошибка: введите корректное количество (только цифры)', 'alert-danger');
            return;
        }
        
        const quantityNumber = parseInt(quantity);
        
        // Проверяем, что количество больше 0
        if (quantityNumber <= 0) {
            showResult('Ошибка: количество должно быть больше 0', 'alert-danger');
            return;
        }
        
        // Рассчитываем стоимость
        const totalCost = quantityNumber * price;
        
        // Показываем результат
        showResult(`Общая стоимость заказа: <strong>${totalCost} руб.</strong>`, 'alert-success');
    }

    // Функция для отображения результата
    function showResult(message, alertClass) {
        resultDiv.innerHTML = message;
        resultDiv.className = `alert ${alertClass}`;
        resultDiv.style.display = 'block';
    }

    // Назначаем обработчик события на кнопку
    calculateButton.addEventListener('click', function(event) {
        event.preventDefault();
        calculateCost();
    });

    // Дополнительно: обработка нажатия Enter в поле ввода
    quantityInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            calculateCost();
        }
    });

    console.log('Калькулятор инициализирован');
});
