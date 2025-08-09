Cara running server API
1. Install package dari requirements.txt

2. Download data CSV 
https://drive.google.com/file/d/1GZe-HuTHRFD59AjZDKjzTqaZ9jUmwh3f/view?usp=drive_link

3. Masukkan data CSV ke folder "data/"

4. run training script di "scripts/train.py" 
python train.py

5. Run server  "
fastapi dev main.py

Cara Fetch data dari API
1. request POST ke "https://localhost:PORT/yield_prediction_fastapi" *default port 8000

2. Struktur JSON Body
  plant: str // hanya bisa nerima tumbuhan yang ada di data CSV
  avg_min_temperature: float
  avg_max_temperature: float
  avg_temperature_C: float
  diurnal_temp_range_C: float
  total_gdd: float
  avg_daily_water_mm: float
  daily_light_integral_mol_m2_d: float
  
3. expected data return
{
    "predicted_yield": float,
    "units": str
}

