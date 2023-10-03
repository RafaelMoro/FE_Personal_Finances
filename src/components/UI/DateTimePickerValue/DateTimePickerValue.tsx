import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { DateTimePicker } from '../../../styles';
import { SelectFormikFieldProps } from '../SelectInput/interface';

interface DateTimePickerProps {
  field: SelectFormikFieldProps;
}

function DateTimePickerValue({ field }: DateTimePickerProps) {
  const { value } = field;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        value={value}
      />
    </LocalizationProvider>
  );
}

export { DateTimePickerValue };
