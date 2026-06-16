# 🌾 Agrarian AI: Smart Crop Recommendation & Yield Prediction System

An intelligent, data-driven agriculture platform that leverages Machine Learning, historical weather archives, and topographic data to empower farmers, agricultural planners, and agronomists with precise crop selection and yield estimation.

---

## 🚀 Overview
Agrarian AI combines state-of-the-art predictive modeling with real-time environmental APIs. By integrating coordinates with historical climate statistics, the system automates complex agricultural decisions:
1. **Recommend the most suitable crop** for a specific location based on long-term temperature, rainfall, relative humidity, solar radiation (PAR), elevation, and sun exposure.
2. **Predict potential crop yield** (in kilograms) for a given land area using target plant characteristics, historical thermal accumulation (Growing Degree Days - GDD), and seasonal weather predictions.

---

## 🛠️ Key Features
* **Double ML Architecture**: Utilizes pre-trained Random Forest models (`Classifier` and `Regressor`) optimized for high accuracy on tabular agricultural datasets.
* **NASA POWER API Integration**: Dynamically fetches 11 years of daily meteorological data (temperature, rainfall, solar radiation, soil wetness) for any coordinate on Earth to compute reliable long-term historical averages.
* **Topographic Awareness**: Integrates the Open-Elevation API to automatically retrieve elevation profile data, which heavily influences crop suitability.
* **Interactive Jupyter Dashboard**: Includes a complete [inference notebook](file:///c:/Users/lenovo/Documents/GitHub/ml_model_agrarian/notebooks/inference.ipynb) equipped with `ipywidgets` for rapid, code-free testing and beautiful HTML visualization.
* **Production-Ready REST API**: Powered by FastAPI, featuring fully typed request/response schemas (via Pydantic) and optimized for deployment in cloud environments.

---

## 📁 Repository Structure
```bash
ml_model_agrarian/
├── app/
│   ├── __init__.py
│   └── main_alt.py        # Production FastAPI server (loads models relative to module path)
├── notebooks/
│   ├── crop_recommendation/   # Training data, feature engineering, and model exploration notebooks
│   ├── yield_prediction/      # Yield prediction exploration notebooks
│   └── inference.ipynb    # The newly created, interactive inference notebook
├── saved_models/          # Serialized scikit-learn models & ColumnTransformers (.joblib)
├── scripts/               # Automation scripts for training the models
├── requirements.txt       # Project dependencies
└── README.md              # Project documentation (this file)
```

---

## ⚙️ Installation & Getting Started

### 1. Clone the repository and enter the directory
```bash
git clone https://github.com/fadhilr2/ml_model_agrarian.git
cd ml_model_agrarian
```

### 2. Set up a virtual environment and install dependencies
```bash
# Create virtual environment
python -m venv .venv

# Activate virtual environment (Windows)
.venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Run the Interactive Notebook
Open your preferred editor (such as VS Code), load [notebooks/inference.ipynb](file:///c:/Users/lenovo/Documents/GitHub/ml_model_agrarian/notebooks/inference.ipynb), select the `.venv` kernel, and execute the cells. The notebook will automatically render a web-style dashboard inside your editor.

### 4. Start the FastAPI Server
To launch the API server locally:
```bash
uvicorn app.main_alt:app --reload
```
Once started, you can access the interactive API docs at `http://127.0.0.1:8000/docs`.

---

## 🔌 API Documentation

### 1. Crop Recommendation Endpoint
* **URL:** `/crop_recommendation_fastapi`
* **Method:** `POST`
* **Payload:**
```json
{
  "tingkat_komitmen": "High",
  "location": {
    "lat": -7.2504,
    "lon": 112.7508
  },
  "sun_exposure": "Full Sun",
  "area": 1000
}
```
* **Response:**
```json
{
  "plant": "Pepper"
}
```

### 2. Yield Prediction Endpoint
* **URL:** `/yield_prediction_fastapi`
* **Method:** `POST`
* **Payload:**
```json
{
  "plant": {
    "name": "Potatoes",
    "base_temp": 10.0,
    "growing_days": 120
  },
  "location": {
    "lat": -7.2504,
    "lon": 112.7508
  },
  "startDate": "2026-06-01",
  "area": 1000
}
```
* **Response:**
```json
{
  "predicted_yield": 779199.0,
  "units": "sq_meters"
}
```

> [!TIP]
> Both endpoints will automatically fetch remote weather/elevation data for the specified latitude and longitude, process the features, apply the appropriate `ColumnTransformer`, and return the prediction in real-time. If the external APIs are down or slow, the server includes a robust fallback dataset mechanism to prevent request timeouts.

---

## 🧠 Model Details
* **Crop Recommendation Model**: Random Forest Classifier (`entropy` criterion), utilizing features: `avg_temperature`, `PRECTOTCORR` (Precipitation), `RH2M` (Relative Humidity), `ALLSKY_SFC_PAR_TOT` (Photosynthetically Active Radiation), `elevation`, and `sun_exposure`.
* **Yield Prediction Model**: Random Forest Regressor, utilizing features: `plant_name`, `T2M_MIN` (Min Temp), `T2M_MAX` (Max Temp), `avg_temperature`, `diurnal_temp_range`, `avg_total_gdd` (Growing Degree Days), `PRECTOTCORR`, and `ALLSKY_SFC_PAR_TOT`.

---
*Developed with ❤️ for Sustainable Agriculture and Yield Optimization.*
