data = open("", "r")

lines = data.readlines()

newFile = ""

for line in lines
  if line.find("Mortality") != -1 //Mortality only appears once so search for "Cancer site" and look at the line above
    newFile = ""
  
  with open(newFile, "a") as f:
    f.write(line)

data.close