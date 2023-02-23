from pathlib import Path

directory = Path("src-tauri/src/inhalation_coefficients/")

files = directory.iterdir()

for file in files:
  print("pub mod " + file.name[:-3] + ";")
        