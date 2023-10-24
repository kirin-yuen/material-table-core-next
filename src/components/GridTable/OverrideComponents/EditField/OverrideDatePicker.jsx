import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';

const DEFAULT_FORMAT = 'DD/MM/YYYY';

const dateReg = /(\d{2})\/(\d{2})\/(\d{4}).*/;

// 后端格式
// 18/10/2023 00:00
const replaceDateTimeToDate = (str, format) => str.replace(dateReg, format);
const formatDateForEdit = (str) => replaceDateTimeToDate(str, '$2/$1/$3');
export const formatDateForRender = (str) =>
  replaceDateTimeToDate(str, '$1/$2/$3');

export default function OverrideDatePicker(props) {
  const { onChange, size, fullWidth, helperText, error, columnDef } = props;
  let value = props.value || '';

  if (columnDef.type === 'date') {
    value = formatDateForEdit(value);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        disableMaskedInput
        inputFormat={DEFAULT_FORMAT}
        value={value}
        onChange={(tValue) => {
          const changeValue =
            tValue === null ? '' : dayjs(tValue).format(DEFAULT_FORMAT);

          onChange(changeValue);
        }}
        renderInput={(params) => {
          if (error) {
            params.label = helperText;
          }

          return (
            <TextField
              {...params}
              {...{ size, fullWidth, error }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          );
        }}
      />
    </LocalizationProvider>
  );
}
