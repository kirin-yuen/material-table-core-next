import { TextField } from '@mui/material';

export default function OverrideTextField(props) {
  const { onChange, size, fullWidth, helperText, error, value } = props;

  let label = '';

  // 校验信息放 label 位置
  if (error) {
    label = helperText;
  }

  return (
    <TextField
      {...{ value, label, size, fullWidth, error }}
      onChange={(e) => onChange(e.target.value)}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}
