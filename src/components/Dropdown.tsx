import { TextField, Autocomplete, autocompleteClasses } from "@mui/material";

const Dropdown = ({ options }: { options: string[] }) => {
  return (
    <Autocomplete
      sx={{
        display: 'inline-block',
        '& input': {
          width: 100,
        },
      }}
      options={options}
      renderInput={(params) => (
        <div ref={params.InputProps.ref}>
          <input type="text" {...params.inputProps} />
        </div>
      )}
    />
  );
};

export default Dropdown;