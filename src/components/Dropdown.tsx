import { Autocomplete } from "@mui/material";
import React from "react";

const Dropdown = ({ options, width, value, setValue }: { options: string[], width: number, value: string | null, setValue: (newValue: string | null) => void }) => {
  return (
    <Autocomplete
      className="text-black"
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