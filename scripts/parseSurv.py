data = open("scripts/Surv90e.dat", "r")

lines = data.readlines()

for line in lines:
  splitLine = line.split()
  print("(" + splitLine[0] + ", [" + splitLine[1] + ", " + splitLine[2] + ", " + splitLine[3] + ", " + splitLine[4] + ", " + splitLine[5] + ", " + splitLine[6] + ", " + splitLine[7] + "]),")

data.close