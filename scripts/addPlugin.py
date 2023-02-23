from pathlib import Path

directory = Path("src-tauri/src/inhalation_coefficients/")

files = directory.iterdir()

for file in files:
  functionNames = []
  with file.open('r') as file_handle:
    for line in file_handle:
      if line.find("HashMap<u8,") != -1:
        functionName = line.split()[1]
        functionName = functionName[:-2]
        functionNames.append(functionName)

  with file.open('a') as file_handle:
    file_handle.write("pub fn init<R: Runtime>() -> TauriPlugin<R> {\n")
    file_handle.write("  Builder::new(\"" + file.name[:-3] +"\")\n")
    file_handle.write("    .invoke_handler(tauri::generate_handler![\n")
    for functionName in functionNames:
      file_handle.write("      " + functionName + ",\n")
    file_handle.write("      ])\n")
    file_handle.write("    .build()\n")
    file_handle.write("}")
        