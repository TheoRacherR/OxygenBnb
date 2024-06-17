import React from 'react'
import Input from "@mui/joy/Input";

const InputComponent = ({label, value, disabled, onChange}) => {
  return (
    <Input
      variant="outlined"
      value={value}
      startDecorator={<label>{label}</label>}
      sx={{width: "100%"}}
      disabled={disabled}
      onChange={onChange}
    />
  )
}

export default InputComponent