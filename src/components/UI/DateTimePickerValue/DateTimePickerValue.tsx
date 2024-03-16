import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { pickersLayoutClasses } from '@mui/x-date-pickers';
import { DateTimePicker, globalConfiguration } from '../../../styles';
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
  console.log('pickersLayoutClasses', pickersLayoutClasses);

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
        slotProps={{
          layout: {
            sx: {
              [`& .${pickersLayoutClasses.toolbar} > span`]: {
                fontSize: globalConfiguration.mobile.fontSizes.P,
              },
              '& .MuiDateTimePickerTabs-root .MuiSvgIcon-root': {
                fontSize: '2rem',
              },
              // Time picker hour size
              '& .MuiTimeClock-root': {
                fontSize: globalConfiguration.mobile.fontSizes.P,
              },
              // Days of the week
              '& .MuiDayCalendar-header > span': {
                fontSize: globalConfiguration.mobile.fontSizes.P,
              },
              // Button to change year.
              '& .MuiPickersYear-root > button': {
                fontSize: globalConfiguration.mobile.fontSizes.P,
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
}

export { DateTimePickerValue };
