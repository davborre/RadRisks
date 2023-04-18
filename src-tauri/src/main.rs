#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use bincode::deserialize_from;
use serde_json::json;
use std::collections::HashMap;
use std::fs::File;
use std::io::BufReader;
use std::path::PathBuf;
use tauri::Manager;
use tauri::Wry;
use tauri_plugin_store::StoreCollection;
use tauri_plugin_store::with_store;

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
        .plugin(tauri_plugin_store::Builder::default().build())
        .setup(|app| {
          let stores = app.state::<StoreCollection<Wry>>();
          let path = PathBuf::from(".settings.dat");
            
          with_store(app.handle(), stores, path, |store| {
            if !store.has("fileType") {
              store.insert("fileType".to_string(), json!("pdf"))
            } else {
              Ok(())
            }
          })?;

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
