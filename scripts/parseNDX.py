data = open("RskIND.NDX", "r")

lines = data.readlines()

for line in lines
  print(line[:line.find(" ")] + ",")

data.close