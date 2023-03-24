with open("scripts/FGR13INH.RSK", "r") as input_file:
  lines = input_file.readlines()

currentRadionuclide = ""
currentType = ""

for index, line in enumerate(lines):
  if lines[index + 1].find("Cancer site: esophagus") == 0:
    currentRadionuclide = line.split()[0]
    currentType = line.split()[2]

  outputFileName = "src/data/inhalationCoefficients/" + currentRadionuclide + currentType + ".txt"

  with open(outputFileName, "a") as output_file:
    output_file.write(line)


