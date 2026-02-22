# Draw-AI

Draw-AI is a simple highschool project heavily inspired by Google's Quick, Draw!
Draw objects on a canvas and let the AI guess what you're drew.

## Features

- Draw on a web canvas
- AI predicts your drawing

## Dependencies
- Flask
- flask-cors
- TensorFlow
- Pillow
- numpy

## Installation

### Clone the repository:
    
Open the terminal and paste the following:

```bash
git clone https://github.com/Daniel-Jsson/Basic-AI.git
``` 

### [Python](https://www.python.org/downloads/)

**Python 3.11.x is required**
tested on 3.11.8

**Make sure to add Python to PATH when installing**

### Create and activate a virtual enviorment

enter the following into the terminal:

```bash
python -m venv .venv

.venv\Scripts\activate

```

then Install dependencies:
```bash
pip install -r requirements.txt
```


## Usage

1. Open the terminal and run the following:

```python
python draw-ai/backend/app.py

```

2. Then open Index.html in your browser.

3. Draw something on the canvas and click "Guess!" to see the AI prediction.


## License

MIT