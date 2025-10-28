/*jslint browser: true, devel: true, this: true*/
window.addEventListener('DOMContentLoaded', function (event) {
    "use strict";
    const quantityInput = document.getElementById("quantity");
    const serviceTypeRadios = document.getElementsByName("serviceType");
    const optionsDiv = document.getElementById("optionsDiv");
    const optionsSelect = document.getElementById("optionsSelect");
    const propertyDiv = document.getElementById("propertyDiv");
    const propertyCheck = document.getElementById("propertyCheck");
    const resultDiv = document.getElementById("result");
    const calcForm = document.getElementById("calcForm");
    const prices = {
        serviceTypes: {
            type1: 499,
            type2: 769,
            type3: 939
        },
        options: {
            option1: 119,
            option2: 139,
            option3: 135
        },
        property: 49
    };
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    function showResult(message, alertClass) {
        resultDiv.innerHTML = message;
        resultDiv.className = "alert " + alertClass+ " mt-3";
        resultDiv.style.display = "block";
    }
    function updatePrice() {
        let unitPrice = 0;
        let rawQuantity = quantityInput.value.trim();
        if (rawQuantity === "") {
            showResult("Введите количество.", "alert-secondary");
            return;
        }
        const regex = /^\d+$/;
        if (!regex.test(rawQuantity)) {
            showResult("Ошибка: количество должно быть целым числом (только цифры).", "alert-danger");
            return;
        }
        let quantity = parseInt(rawQuantity, 10);
        if (quantity < 1) {
            showResult("Ошибка: количество должно быть 1 или больше.", "alert-danger");
            return;
        }
        let selectedType = document.querySelector('input[name="serviceType"]:checked').value;
        if (selectedType === "type1") {
            unitPrice = prices.serviceTypes.type1;
            optionsDiv.style.display = "none";
            propertyDiv.style.display = "none";
        } else if (selectedType === "type2") {
            unitPrice = prices.serviceTypes.type2;
            optionsDiv.style.display = "block";
            propertyDiv.style.display = "none";
            unitPrice += prices.options[optionsSelect.value];
        } else if (selectedType === "type3") {
            unitPrice = prices.serviceTypes.type3;
            optionsDiv.style.display = "none";
            propertyDiv.style.display = "block";
            if (propertyCheck.checked) {
                unitPrice += prices.property;
            }
        }
        let totalPrice = unitPrice * quantity;
        let formattedPrice = formatNumber(totalPrice);
        showResult("Итоговая стоимость: <strong>" + formattedPrice + " руб.</strong>", "alert-success");
    }
    quantityInput.addEventListener("input", updatePrice);
    serviceTypeRadios.forEach(function (radio) {
        radio.addEventListener("change", updatePrice);
    });
    optionsSelect.addEventListener("change", updatePrice);
    propertyCheck.addEventListener("change", updatePrice);
    if (calcForm) {
        calcForm.addEventListener("submit", function(event) {
            event.preventDefault(); 
        });
    }
    updatePrice();
});
