import { Autocomplete } from "@mui/material";

const Dropdown = ({ options, width, value, setValue }: { options: string[], width: number, value: string | null, setValue: React.Dispatch<React.SetStateAction<string | null>> }) => {
  return (
    <Autocomplete
      value={value}
      onChange={(event: any, newValue: string | null) => {
        setValue(newValue);
      }}
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