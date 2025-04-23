document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const editToggle = document.getElementById('editToggle');
    const simulateBtn = document.getElementById('simulateBtn');
    let waterStatus = document.getElementById('waterStatus');
    const predictionResult = document.getElementById('predictionResult');
    
    // Parameter inputs
    let phValue = document.getElementById('phValue');
    let tdsValue = document.getElementById('tdsValue');
    let tempValue = document.getElementById('tempValue');
    let turbidityValue = document.getElementById('turbidityValue');
    let phosphateValue = document.getElementById('phosphateValue');
    let nitrateValue = document.getElementById('nitrateValue');
    let doValue = document.getElementById('doValue');
    let bodValue = document.getElementById('bodValue');
    
    // Chart initialization
    const ctx = document.getElementById('qualityChart').getContext('2d');
    let qualityChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['ph', 'tds', 'temp', 'turbidit', 'Nitrate', 'phosphate', 'do', 'bod'],
            datasets: [
                {
                    label: 'Current',
                    backgroundColor: '#2c7be5',
                    data: [7.2, 320, 26.5, 4.2, 8.5, 0.12, 6.8, 3.2]
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Water Quality Parameters'
                }
            }
        }
    });
    
    // Toggle edit mode
    editToggle.addEventListener('change', function() {
        const inputs = document.querySelectorAll('.parameter-card input');
        inputs.forEach(input => {
            input.disabled = !this.checked;
            if (this.checked) {
                input.classList.add('enabled');
            } else {
                input.classList.remove('enabled');
                // Update parameter status when exiting edit mode
                updateParameterStatus(input.id.replace('Value', ''));
            }
        });
        
        // Update overall water status when exiting edit mode
        if (!this.checked) {
            updateWaterStatus();
        }
    });
    
    // Update individual parameter status
    function updateParameterStatus(param) {
        let value = parseFloat(document.getElementById(`${param}Value`).value);
        let statusElement = document.querySelector(`.parameter-card[data-param="${param}"] .param-status`);
        
        // Reset classes
        statusElement.classList.remove('safe', 'moderate', 'unsafe');
        
        // Determine status based on parameter ranges
        switch(param) {
            case 'ph':
                if (value >= 6.5 && value <= 8.5) {
                    statusElement.classList.add('safe');
                    statusElement.textContent = 'Safe';
                } else if ((value >= 6.0 && value < 6.5) || (value > 8.5 && value <= 9.0)) {
                    statusElement.classList.add('moderate');
                    statusElement.textContent = 'Moderate';
                } else {
                    statusElement.classList.add('unsafe');
                    statusElement.textContent = 'Unsafe';
                }
                break;
                
            case 'tds':
                if (value < 500) {
                    statusElement.classList.add('safe');
                    statusElement.textContent = 'Safe';
                } else if (value >= 500 && value < 1000) {
                    statusElement.classList.add('moderate');
                    statusElement.textContent = 'Moderate';
                } else {
                    statusElement.classList.add('unsafe');
                    statusElement.textContent = 'Unsafe';
                }
                break;
                
            case 'temp':
                if (value < 30) {
                    statusElement.classList.add('safe');
                    statusElement.textContent = 'Safe';
                } else if (value >= 30 && value < 35) {
                    statusElement.classList.add('moderate');
                    statusElement.textContent = 'Moderate';
                } else {
                    statusElement.classList.add('unsafe');
                    statusElement.textContent = 'Unsafe';
                }
                break;
                
            case 'turbidity':
                if (value < 5) {
                    statusElement.classList.add('safe');
                    statusElement.textContent = 'Safe';
                } else if (value >= 5 && value < 10) {
                    statusElement.classList.add('moderate');
                    statusElement.textContent = 'Moderate';
                } else {
                    statusElement.classList.add('unsafe');
                    statusElement.textContent = 'Unsafe';
                }
                break;
                
            case 'nitrate':
                if (value < 10) {
                    statusElement.classList.add('safe');
                    statusElement.textContent = 'Safe';
                } else if (value >= 10 && value < 20) {
                    statusElement.classList.add('moderate');
                    statusElement.textContent = 'Moderate';
                } else {
                    statusElement.classList.add('unsafe');
                    statusElement.textContent = 'Unsafe';
                }
                break;
                
            case 'phosphate':
                if (value < 0.2) {
                    statusElement.classList.add('safe');
                    statusElement.textContent = 'Safe';
                } else if (value >= 0.2 && value < 0.5) {
                    statusElement.classList.add('moderate');
                    statusElement.textContent = 'Moderate';
                } else {
                    statusElement.classList.add('unsafe');
                    statusElement.textContent = 'Unsafe';
                }
                break;
                
            case 'do':
                if (value > 5) {
                    statusElement.classList.add('safe');
                    statusElement.textContent = 'Safe';
                } else if (value > 3 && value <= 5) {
                    statusElement.classList.add('moderate');
                    statusElement.textContent = 'Moderate';
                } else {
                    statusElement.classList.add('unsafe');
                    statusElement.textContent = 'Unsafe';
                }
                break;
                
            case 'bod':
                if (value < 5) {
                    statusElement.classList.add('safe');
                    statusElement.textContent = 'Safe';
                } else if (value >= 5 && value < 10) {
                    statusElement.classList.add('moderate');
                    statusElement.textContent = 'Moderate';
                } else {
                    statusElement.classList.add('unsafe');
                    statusElement.textContent = 'Unsafe';
                }
                break;
        }
    }
    
    // Update overall water status
    function updateWaterStatus() {
        const statusElements = document.querySelectorAll('.param-status');
        let isUnsafe = false;
        let isModerate = false;
        
        statusElements.forEach(element => {
            if (element.classList.contains('unsafe')) {
                isUnsafe = true;
            } else if (element.classList.contains('moderate')) {
                isModerate = true;
            }
        });
        
        // Update status banner
        waterStatus.innerHTML = '';
        const banner = document.createElement('div');
        
        if (isUnsafe) {
            banner.className = 'status-banner unsafe';
            banner.innerHTML = `
                <i class="fas fa-exclamation-circle"></i>
                <div>
                    <h3>Current Water Status: Unsafe for Drinking</h3>
                    <p>Some parameters are beyond acceptable limits. Caution advised.</p>
                </div>
            `;
        } else if (isModerate) {
            banner.className = 'status-banner moderate';
            banner.innerHTML = `
                <i class="fas fa-info-circle"></i>
                <div>
                    <h3>Current Water Status: Moderate</h3>
                    <p>Some parameters are approaching unsafe levels. Monitoring recommended.</p>
                </div>
            `;
        } else {
            banner.className = 'status-banner safe';
            banner.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <div>
                    <h3>Current Water Status: Safe for Drinking</h3>
                    <p>All parameters are within acceptable limits.</p>
                </div>
            `;
        }
        
        waterStatus.appendChild(banner);
    }
    
    // Simulate future water quality
    simulateBtn.addEventListener('click', function() {
        // Get current values
        let currentValues = {
            ph: parseFloat(phValue.value),
            tds: parseFloat(tdsValue.value),
            temp: parseFloat(tempValue.value),
            turbidity: parseFloat(turbidityValue.value),
            nitrate: parseFloat(nitrateValue.value),
            phosphate: parseFloat(phosphateValue.value),
            do: parseFloat(doValue.value),
            bod: parseFloat(bodValue.value)
        };
        
        // Calculate predicted values (increase pollutants, decrease DO)
        const predictedValues = {
            ph: currentValues.ph - (Math.random() * 0.3),
            tds: currentValues.tds * (1 + (Math.random() * 0.2)),
            temp: currentValues.temp + (Math.random() * 2),
            turbidity: currentValues.turbidity * (1 + (Math.random() * 0.3)),
            nitrate: currentValues.nitrate * (1 + (Math.random() * 0.4)),
            phosphate: currentValues.phosphate * (1 + (Math.random() * 0.5)),
            do: currentValues.do * (1 - (Math.random() * 0.2)),
            bod: currentValues.bod * (1 + (Math.random() * 0.5))
        };
        
        // Update chart
        qualityChart.data.datasets = [
            {
                label: 'Current',
                backgroundColor: '#2c7be5',
                data: Object.values(currentValues)
            },
            {
                label: 'Predicted (7 days)',
                backgroundColor: '#fd7e14',
                data: Object.values(predictedValues)
            }
        ];
        qualityChart.update();
        
        // Determine prediction outcome
        let daysUntilUnsafe = 7 + Math.floor(Math.random() * 14);
        let riskFactors = [];
        
        if (predictedValues.ph < 6.5 || predictedValues.ph > 8.5) riskFactors.push('pH imbalance');
        if (predictedValues.tds > 1000) riskFactors.push('high TDS');
        if (predictedValues.nitrate > 20) riskFactors.push('high nitrate levels');
        if (predictedValues.phosphate > 0.5) riskFactors.push('high phosphate levels');
        if (predictedValues.do < 3) riskFactors.push('low dissolved oxygen');
        if (predictedValues.bod > 10) riskFactors.push('high BOD');
        
        // Update prediction result
        if (riskFactors.length > 0) {
            predictionResult.innerHTML = `
                <h3>Prediction Result</h3>
                <p>If current trends continue, Rankala Lake water may become unsafe for drinking in approximately ${daysUntilUnsafe} days.</p>
                <p>Main risk factors: ${riskFactors.join(', ')}.</p>
                <p>Recommended actions: Reduce pollutant inputs, increase aeration, and monitor closely.</p>
            `;
        } else {
            predictionResult.innerHTML = `
                <h3>Prediction Result</h3>
                <p>Water quality is projected to remain within safe limits for the next 30 days with current conditions.</p>
                <p>Continue regular monitoring to maintain water quality.</p>
            `;
        }
    });
    
    // Initialize water status
    updateWaterStatus();
    
    // Add input event listeners for real-time updates in edit mode
    const inputs = document.querySelectorAll('.parameter-card input');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (!editToggle.checked) return;
            const param = this.id.replace('Value', '');
            updateParameterStatus(param);
        });
    });
});