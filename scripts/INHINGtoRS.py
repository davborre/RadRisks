from pathlib import Path

directory = Path("src/data/inhalationCoefficients/")

files = directory.iterdir()

for file in files:
  with file.open('r') as file_handle:
    fileName = file.name
    period = fileName.find(".")
    radionuclide = fileName[:(period - 1)]
    absorptionType = fileName[(period - 1):period]

    outputFileName = "src-tauri/src/data/" + radionuclide + ".rs"

    cancer = ""
    for line in file_handle:
      if line.find("Cancer site:") == 0:
        cancer = line.split()[2]
        with open(outputFileName, "a") as output_file:
          output_file.write("#[tauri::command]\n")
          output_file.write("pub fn " + radionuclide + absorptionType + cancer + "() -> HashMap<u8, [f32;7]> {\n")
          output_file.write("  let data = HashMap::from([\n")
      elif (line.split()[0] == "110"):
        with open(outputFileName, "a") as output_file:
          output_file.write("  ]);\n")
          output_file.write("  return data\n")
          output_file.write("}\n")
          output_file.write("\n")
      elif (len(line.split()) == 7):
        with open(outputFileName, "a") as output_file:
          splitLine = line.split()
          output_file.write("    (" + splitLine[0] + ", [" + splitLine[1] + ", " + splitLine[2] + ", " + splitLine[3] + ", " + splitLine[4] + ", " + splitLine[5] + ", " + splitLine[6] + "]),\n")



