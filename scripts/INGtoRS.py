from pathlib import Path
import os

directory = Path("src/data/ingestionCoefficients/")

files = directory.iterdir()

for file in files:
  with file.open('r') as file_handle:
    fileName = file.name
    period = fileName.find(".")
    radionuclideWithDash = fileName[:period - 1] if (fileName[period - 1].isupper()) else fileName[:period]
    radionuclide = radionuclideWithDash[:radionuclideWithDash.find("-")].lower() + radionuclideWithDash[radionuclideWithDash.find("-") + 1:]
    absorptionType = fileName[(period - 1):period].lower() if (fileName[period - 1].isupper()) else "n"

    outputFileName = "src-tauri/src/ingestion_coefficients/ing_" + radionuclide + ".rs"

    if (not os.path.exists(outputFileName)):
      with open(outputFileName, "a") as output_file:
          output_file.write("use std::collections::HashMap;\n")
          output_file.write("\n")
          output_file.write("use tauri::{\n")
          output_file.write("  plugin::{Builder, TauriPlugin},\n")
          output_file.write("  Runtime,\n")
          output_file.write("};\n")
          output_file.write("\n")

    cancer = ""
    for line in file_handle:
      if line.find("Cancer site:") == 0:
        cancer = line.split()[2]
        with open(outputFileName, "a") as output_file:
          output_file.write("#[tauri::command]\n")
          output_file.write("fn " + cancer + "_" + absorptionType + "() -> HashMap<u8, [f32;6]> {\n")
          output_file.write("  let data = HashMap::from([\n")
      elif (line.split()[0] == "110"):
        with open(outputFileName, "a") as output_file:
          splitLine = line.split()
          output_file.write("    (" + splitLine[0] + ", [" + splitLine[1] + ", " + splitLine[2] + ", " + splitLine[3] + ", " + splitLine[4] + ", " + splitLine[5] + ", " + splitLine[6] + "]),\n")
          output_file.write("  ]);\n")
          output_file.write("  return data\n")
          output_file.write("}\n")
          output_file.write("\n")
      elif (len(line.split()) == 7):
        with open(outputFileName, "a") as output_file:
          splitLine = line.split()
          output_file.write("    (" + splitLine[0] + ", [" + splitLine[1] + ", " + splitLine[2] + ", " + splitLine[3] + ", " + splitLine[4] + ", " + splitLine[5] + ", " + splitLine[6] + "]),\n")



