#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use bincode::deserialize_from;
use std::collections::HashMap;
use std::fs::File;
use std::io::BufReader;
use tauri_plugin_store::StoreBuilder;

mod survival;
mod usage;
mod types;

#[tauri::command]
fn coefficients(intake_method: String, radionuclide: String, absorption_type: String, cancer: String, handle: tauri::AppHandle) -> HashMap<String, [f32;6]> {
  let path = format!("resources/{}/{}/{}/{}.bin", intake_method, radionuclide, absorption_type, cancer);
  let resource_path = handle.path_resolver()
    .resolve_resource(&path)
    .expect("failed to resolve resource");

  let output_file = File::open(&resource_path).unwrap();
  let reader = BufReader::new(output_file);
  
  let output_data: HashMap<String, [f32;6]> = deserialize_from(reader).unwrap();
  return output_data
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
          let default_settings = HashMap::from([
            ("fileType".to_string(), "pdf".into()),
            ("fractionalExposure".to_string(), true.into()),
          ]);

          let settings = StoreBuilder::new(app.handle(), ".settings.dat".parse()?)
            .defaults(default_settings)
            .build();
          
          let history = StoreBuilder::new(app.handle(), ".history.dat".parse()?)
            .build();

          let handle = app.handle();

          std::thread::spawn(move || {
            handle.plugin(
              tauri_plugin_store::Builder::default()
                .stores([settings, history])
                .freeze()
                .build(),
            )
          });

          Ok(())
        })
        .invoke_handler(tauri::generate_handler![
          coefficients,
          usage::usage, 
          survival::survival, 
          types::inhalation_types,
          types::ingestion_types,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
