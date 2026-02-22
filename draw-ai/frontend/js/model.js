const predictionElement = document.getElementById("aiPrediction")

async function getPrediction() {
    const canvas = document.getElementById('myCanvas');
    const imageData = canvas.toDataURL('image/png');

    try {
            const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageData })
    });

    const result = await response.json();
    console.log(`AI Confidence: ${Math.round(result.confidence * 100)}% for ${result.prediction}`);
    predictionElement.textContent = `Prediction: ${result.prediction} | Confidence: ${Math.round(result.confidence * 100)}%`;

    return result
    } catch(err) {
        console.error("Fetch error:", err)
        return null
    }


}   