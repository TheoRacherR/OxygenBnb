import Input from "@mui/joy/Input";

const InputComponent = ({label, value, disabled}) => {

  return (
    <Input
      variant="outlined"
      value={value}
      startDecorator={<label>{label}</label>}
      sx={{width: "100%"}}
      disabled={disabled}
    />
  )
}

export default InputComponent