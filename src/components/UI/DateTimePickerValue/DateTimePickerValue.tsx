import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { DateTimePicker } from '../../../styles';
import { SelectFormikFieldProps } from '../SelectInput/interface';
import {
  ArrowDropDownIcon, CalendarMonthIcon, ChevronLeftIcon, ChevronRightIcon,
} from '../Icons';

interface DateTimePickerProps {
  field: SelectFormikFieldProps;
  // To update the value of the form.
  setFieldValueCb: (fieldName: string, newDate: unknown) => void;
}

function DateTimePickerValue({ field, setFieldValueCb }: DateTimePickerProps) {
  const { value } = field;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        value={value}
        // Setting onChangeValue as it was not updating the value form.
        onChange={(newValue) => setFieldValueCb('date', newValue)}
        // Changing icons and size of the date picker.
        slots={{
          switchViewIcon: ArrowDropDownIcon,
          leftArrowIcon: ChevronLeftIcon,
          rightArrowIcon: ChevronRightIcon,
          openPickerIcon: CalendarMonthIcon,
        }}
      />
    </LocalizationProvider>
  );
}

export { DateTimePickerValue };
