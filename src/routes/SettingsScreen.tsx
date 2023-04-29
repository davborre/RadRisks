import SettingsMenu from "../components/SettingsMenu"

const SettingsScreen = () => {
  return (
    <>
      <SettingsMenu />
      <div className="grow h-screen flex justify-center items-center dark:bg-neutral-900">
        <img className="w-auto h-auto" src="/logo.png" alt="RadRisks logo" />
      </div>
    </>
  )
}

export default SettingsScreen