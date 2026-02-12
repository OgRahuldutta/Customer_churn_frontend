const BACKEND_URL = "https://ograhul-cusomer-care-churn-backend.hf.space/predict";


document.getElementById("churnForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const data = {
        Age: parseInt(document.getElementById("Age").value),
        Tenure_Months: parseInt(document.getElementById("Tenure_Months").value),
        Monthly_Charges: parseFloat(document.getElementById("Monthly_Charges").value),
        Internet_Service: document.getElementById("Internet_Service").value,
        Contract_Type: document.getElementById("Contract_Type").value,
        Payment_Method: document.getElementById("Payment_Method").value,
        Gender: document.getElementById("Gender").value,
        Tech_Support: document.getElementById("Tech_Support").value
    };

    const resultBox = document.getElementById("result");
    resultBox.innerHTML = "🔄 Predicting...";

    try {
        const response = await fetch(BACKEND_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error("Server error");
        }

        const result = await response.json();

        if (result.prediction) {

            const probabilityPercent = (result.probability * 100).toFixed(2);

            let riskColor;
            if (result.risk_level === "Low") {
                riskColor = "#28a745";
            } else if (result.risk_level === "Medium") {
                riskColor = "#ffc107";
            } else {
                riskColor = "#dc3545";
            }

            resultBox.innerHTML = `
                <div class="result-card">
                    <h2>Prediction Result</h2>
                    <p><strong>Customer Status:</strong> ${result.prediction}</p>
                    <p><strong>Churn Probability:</strong> ${probabilityPercent}%</p>
                    <p><strong>Risk Level:</strong> 
                        <span style="color:${riskColor}; font-weight:bold;">
                            ${result.risk_level}
                        </span>
                    </p>
                </div>
            `;
        } else {
            resultBox.innerHTML = "⚠️ Unexpected response from backend";
        }

    } catch (error) {
        console.error(error);
        resultBox.innerHTML = "❌ Backend not reachable";
    }
});
