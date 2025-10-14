/*jslint browser: true, devel: true, es6: true, this: true*/

document.addEventListener('DOMContentLoaded', function () {
    'use strict';
    
    // Получаем элементы DOM
    var quantityInput = document.getElementById('quantity');
    var productSelect = document.getElementById('product');
    var calculateButton = document.getElementById('calculate');
    var resultDiv = document.getElementById('result');

    // Функция для форматирования числа с пробелами
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    // Функция для проверки корректности ввода
    function validateInput(input) {
        // Регулярное выражение: только цифры (одна или более)
        var regex = /^\d+$/;
        return regex.test(input);
    }

    // Функция для расчета стоимости
    function calculateCost() {
        // Получаем значения из формы
        var quantity = quantityInput.value.trim();
        var price = parseInt(productSelect.value, 10);
        var quantityNumber, totalCost;
        
        // Проверяем корректность ввода
        if (!validateInput(quantity)) {
            showResult('Ошибка: введите корректное количество (только цифры)', 'alert-danger');
            return;
        }
        
        quantityNumber = parseInt(quantity, 10);
        
        // Проверяем, что количество больше 0
        if (quantityNumber <= 0) {
            showResult('Ошибка: количество должно быть больше 0', 'alert-danger');
            return;
        }
        
        // Рассчитываем стоимость
        totalCost = quantityNumber * price;
        
        // Форматируем стоимость с пробелами
        var formattedCost = formatNumber(totalCost);
        
        // Показываем результат (только стоимость)
        showResult('Общая стоимость заказа: <strong>' + formattedCost + ' руб.</strong>', 'alert-success');
    }

    // Функция для отображения результата
    function showResult(message, alertClass) {
        resultDiv.innerHTML = message;
        resultDiv.className = 'alert ' + alertClass;
        resultDiv.style.display = 'block';
    }

    // Назначаем обработчик события на кнопку
    calculateButton.addEventListener('click', function (event) {
        event.preventDefault();
        calculateCost();
    });

    // Дополнительно: обработка нажатия Enter в поле ввода
    quantityInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            calculateCost();
        }
    });
});
