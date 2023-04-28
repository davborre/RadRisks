import SettingsMenu from "../components/SettingsMenu"

const SettingsScreen = () => {
  return (
    <>
      <SettingsMenu />
      <div className="grow h-screen flex justify-center items-center">
        <img className="w-auto h-auto" src="public/logo.png" alt="RadRisks logo" />
      </div>
    </>
  )
}

export default SettingsScreen