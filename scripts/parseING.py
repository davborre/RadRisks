with open("scripts/FGR13ING.RSK", "r") as input_file:
  lines = input_file.readlines()

currentRadionuclide = ""
currentType = ""

for index, line in enumerate(lines):
  if lines[index + 1].find("Cancer site: esophagus") == 0:
    currentRadionuclide = line.split()[0]
    currentType = line.split()[1]

  if (currentRadionuclide[0:2] == "Hg" or currentRadionuclide[0:2] == "S-" or currentRadionuclide[0:2] == "Po" or currentRadionuclide[0:2] == "H-"):
    outputFileName = "src/data/ingestionCoefficients/" + currentRadionuclide + currentType + ".txt"
  else:
    outputFileName = "src/data/ingestionCoefficients/" + currentRadionuclide + ".txt"

  with open(outputFileName, "a") as output_file:
    output_file.write(line)


