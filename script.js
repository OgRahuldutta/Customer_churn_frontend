const BACKEND_URL = "https://ograhul-cusomer-care-churn-backend.hf.space/predict";

document.getElementById("churnForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "🔄 Predicting...";

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

    try {
        const response = await fetch(BACKEND_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error("Server error");

        const result = await response.json();

        const probability = (result.probability * 100).toFixed(2);

        const riskLevel =
            probability > 70 ? "High Risk" :
            probability > 40 ? "Medium Risk" :
            "Low Risk";

        const color = result.prediction === "Yes" ? "red" : "green";

        resultDiv.innerHTML = `
            <div style="color:${color}; font-size:22px; font-weight:bold;">
                ${result.prediction === "Yes" ? "⚠ Likely to Churn" : "✅ Likely to Stay"}
            </div>
            <div style="margin-top:8px;">
                Confidence: ${probability}%
            </div>
            <div class="progress">
                <div class="progress-bar" style="width:${probability}%; background:${color};"></div>
            </div>
            <div style="margin-top:6px;">
                ${riskLevel}
            </div>
        `;

    } catch (error) {
        console.error(error);
        resultDiv.innerHTML = "❌ Backend not reachable";
    }
});
