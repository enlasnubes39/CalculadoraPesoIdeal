/**
 * Lógica principal de la Calculadora de Peso Ideal
 * Maneja eventos del DOM, cálculos y registro del Service Worker para la PWA.
 */

document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate-btn');
    const heightInput = document.getElementById('height');
    const resultSection = document.getElementById('result-section');
    const idealWeightDisplay = document.getElementById('ideal-weight');

    /**
     * Calcula el peso ideal usando la Fórmula de Robinson.
     * @param {number} heightCm - La altura de la persona en centímetros.
     * @param {string} gender - 'male' o 'female'.
     * @returns {number} El peso ideal estimado en kg.
     */
    const calculateIdealWeight = (heightCm, gender) => {
        // Altura en pulgadas sobre 5 pies (60 pulgadas = 152.4 cm)
        const heightInches = heightCm / 2.54;
        const over5Feet = heightInches > 60 ? heightInches - 60 : 0;

        let idealWeight = 0;
        
        if (gender === 'male') {
            idealWeight = 52 + (1.9 * over5Feet);
        } else {
            idealWeight = 49 + (1.7 * over5Feet);
        }
        
        // Retornar redondeado a 1 decimal
        return Math.round(idealWeight * 10) / 10;
    };

    /**
     * Maneja el evento de clic en el botón calcular.
     */
    calculateBtn.addEventListener('click', () => {
        const height = parseFloat(heightInput.value);
        const gender = document.querySelector('input[name="gender"]:checked').value;

        if (!height || height < 100 || height > 250) {
            alert('Por favor, ingresa una altura válida en centímetros.');
            return;
        }

        const idealWeight = calculateIdealWeight(height, gender);
        
        idealWeightDisplay.textContent = idealWeight;
        resultSection.classList.remove('hidden');
    });

    // Registrar Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(registration => {
                    console.log('ServiceWorker registrado con éxito:', registration.scope);
                })
                .catch(error => {
                    console.log('Fallo en el registro del ServiceWorker:', error);
                });
        });
    }
});
