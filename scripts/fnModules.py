from pathlib import Path

directory = Path("src-tauri/src/ingestion_coefficients/")

files = directory.iterdir()

for file in files:
  print(".plugin(inhalation_coefficients::" + file.name[:-3] + "::init())")
        