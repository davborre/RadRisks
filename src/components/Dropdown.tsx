import { TextField, Autocomplete } from "@mui/material";

const Dropdown = ({ options }: { options: string[] }) => {
  return (
    <Autocomplete
      className="bg-white"
      sx={{ width: 200 }}
      disablePortal
      options={options}
      renderInput={(params) => <TextField {...params} label="" />}
    />
  );
};

export default Dropdown;