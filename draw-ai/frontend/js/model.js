async function getPrediction() {
    const canvas = document.getElementById('myCanvas');
    const imageData = canvas.toDataURL('image/png');

    const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageData })
    });

    const result = await response.json();
    console.log("The model thinks this is a:", result.prediction);
    alert("Prediction: " + result.prediction);
}