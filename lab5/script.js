/*jslint browser: true, devel: true, this: true*/
document.addEventListener("DOMContentLoaded", function () {
    "use strict";
    var quantityInput = document.getElementById("quantity");
    var productSelect = document.getElementById("product");
    var calculateButton = document.getElementById("calculate");
    var resultDiv = document.getElementById("result");
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    function validateInput(input) {
        var regex = /^\d+$/;
        return regex.test(input);
    }
    function showResult(message, alertClass) {
        resultDiv.innerHTML = message;
        resultDiv.className = "alert " + alertClass;
        resultDiv.style.display = "block";
    }
    function calculateCost() {
        var quantity = quantityInput.value.trim();
        var price = parseInt(productSelect.value, 10);
        var quantityNumber;
        var totalCost;
        var formattedCost;
        if (!validateInput(quantity)) {
            showResult("Ошибка: введите корректное количество (только цифры)", "alert-danger");
            return;
        }
        quantityNumber = parseInt(quantity, 10);
        if (quantityNumber <= 0) {
            showResult("Ошибка: количество должно быть больше 0", "alert-danger");
            return;
        }
        totalCost = quantityNumber * price;
        formattedCost = formatNumber(totalCost);
        showResult("Общая стоимость: <strong>" + formattedCost + " руб.</strong>", "alert-success");
    }
    calculateButton.addEventListener("click", function (event) {
        event.preventDefault();
        calculateCost();
    });
    quantityInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            calculateCost();
        }
    });
});
