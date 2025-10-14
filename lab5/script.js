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
            showResult('Ошибка: введите корректное количество (только цифры)', 'error');
            return;
        }
        
        const quantityNumber = parseInt(quantity);
        
        // Проверяем, что количество больше 0
        if (quantityNumber <= 0) {
            showResult('Ошибка: количество должно быть больше 0', 'error');
            return;
        }
        
        // Рассчитываем стоимость
        const totalCost = quantityNumber * price;
        
        // Получаем название выбранного товара
        const selectedOption = productSelect.options[productSelect.selectedIndex];
        const productName = selectedOption.text.split(' - ')[0];
        
        // Показываем результат
        showResult(`Стоимость заказа: ${totalCost} руб.<br>
                   Товар: ${productName}<br>
                   Количество: ${quantityNumber} шт.<br>
                   Цена за единицу: ${price} руб.`, 'success');
    }

    // Функция для отображения результата
    function showResult(message, type) {
        resultDiv.innerHTML = message;
        resultDiv.className = `result ${type}`;
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
