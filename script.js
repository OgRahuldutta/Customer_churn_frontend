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

        document.getElementById("result").innerHTML =
            `Prediction: ${result.prediction}`;

    } catch (error) {
        console.error(error);
        document.getElementById("result").innerText = "Backend not reachable";
    }
});
