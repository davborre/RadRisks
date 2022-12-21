import { TextField, Autocomplete, autocompleteClasses } from "@mui/material";

const Dropdown = ({ options, width }: { options: string[], width: number }) => {
  return (
    <Autocomplete
      sx={{
        display: 'inline-block',
        '& input': {
          width: { width },
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