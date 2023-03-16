from pathlib import Path

directory = Path("src/data/inhalationCoefficients/")

files = list(directory.iterdir())
files.sort()

types = {}
for file in files:
  fileName = "".join(file.name[:-5].split("-")).lower()
  type = file.name[-5].lower()  

  if (fileName not in types):
    types[fileName] = type
  else:
    types[fileName] += "-" + type

keys = list(types.keys())
keys.sort()

for key in keys:
  print("(\"" + key + "\", " + "\"" + types[key] + "\"),")