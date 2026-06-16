document.addEventListener('DOMContentLoaded', () => {
    // Tab Switching Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            
            // Remove active class from all
            tabBtns.forEach(b => b.classList.remove('active'));
            panels.forEach(p => {
                if (p.id !== targetId) {
                    p.classList.remove('active');
                    setTimeout(() => {
                        if (!p.classList.contains('active')) {
                            p.style.display = 'none';
                        }
                    }, 300); // Wait for fade out
                }
            });

            // Add active class to clicked
            btn.classList.add('active');
            const targetPanel = document.getElementById(targetId);
            
            targetPanel.style.display = 'block';
            setTimeout(() => targetPanel.classList.add('active'), 10);
        });
    });

    // Loader Logic
    const loader = document.getElementById('loader');
    const showLoader = () => loader.classList.remove('hidden');
    const hideLoader = () => loader.classList.add('hidden');

    // Crop Recommendation Submit
    const recForm = document.getElementById('recommendation-form');
    recForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        showLoader();

        const payload = {
            tingkat_komitmen: document.getElementById('rec-tingkat').value,
            location: {
                lat: parseFloat(document.getElementById('rec-lat').value),
                lon: parseFloat(document.getElementById('rec-lon').value)
            },
            sun_exposure: document.getElementById('rec-sun').value,
            area: parseInt(document.getElementById('rec-area').value)
        };

        try {
            const response = await fetch('/crop_recommendation_fastapi', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error('API request failed');

            const data = await response.json();
            
            document.getElementById('rec-output').innerText = data.plant;
            document.getElementById('rec-result').classList.remove('hidden');

        } catch (error) {
            console.error(error);
            document.getElementById('rec-output').innerText = "Error: Could not get recommendation.";
            document.getElementById('rec-output').style.color = "var(--error-color)";
            document.getElementById('rec-result').classList.remove('hidden');
        } finally {
            hideLoader();
        }
    });

    // Yield Prediction Submit
    const yieldForm = document.getElementById('yield-form');
    
    // Auto set date to today for convenience
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('yield-start').value = today;

    yieldForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        showLoader();

        const payload = {
            plant: {
                name: document.getElementById('yield-plant').value,
                base_temp: parseFloat(document.getElementById('yield-base-temp').value),
                growing_days: parseInt(document.getElementById('yield-growing-days').value)
            },
            location: {
                lat: parseFloat(document.getElementById('yield-lat').value),
                lon: parseFloat(document.getElementById('yield-lon').value)
            },
            startDate: document.getElementById('yield-start').value,
            area: parseInt(document.getElementById('yield-area').value)
        };

        try {
            const response = await fetch('/yield_prediction_fastapi', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'API request failed');
            }

            const data = await response.json();
            
            // Format number to be readable
            const formattedYield = new Intl.NumberFormat('en-US').format(data.predicted_yield.toFixed(2));

            document.getElementById('yield-output').innerText = `${formattedYield} gram`;
            document.getElementById('yield-output').style.color = "var(--accent-color)";
            document.getElementById('yield-result').classList.remove('hidden');

        } catch (error) {
            console.error(error);
            document.getElementById('yield-output').innerText = `Error: ${error.message}`;
            document.getElementById('yield-output').style.color = "var(--error-color)";
            document.getElementById('yield-result').classList.remove('hidden');
        } finally {
            hideLoader();
        }
    });
});
