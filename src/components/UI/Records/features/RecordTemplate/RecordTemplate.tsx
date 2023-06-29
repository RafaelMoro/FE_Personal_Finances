/* eslint-disable no-console */
import { Close } from '@mui/icons-material';
import { Formik, Field } from 'formik';

import { DASHBOARD_ROUTE } from '../../../../../pages/RoutesConstants';
import { RecordTemplateProps } from './interface';
import {
  ParagraphTitle, InputForm, PrimaryButton, InputAdornment,
  CancelButton, AnchorButton,
} from '../../../../../styles';
import { RecordTemplateMain, GoBackButton, FormContainer } from './RecordTemplate.styled';

const RecordTemplate = ({ edit = false }: RecordTemplateProps) => {
  const action = edit ? 'Edit' : 'Create';

  // Change the handle Submit
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <RecordTemplateMain>
      <GoBackButton to={DASHBOARD_ROUTE}>
        <Close sx={{ fontSize: '3.5rem' }} />
      </GoBackButton>
      <ParagraphTitle align="center">
        {' '}
        { action }
        {' '}
        Record
      </ParagraphTitle>
      <Formik
        initialValues={{ password: '', confirmPassword: '' }}
        onSubmit={(values) => handleSubmit(values)}
        validateOnMount
      >
        {({ submitForm }) => (
          <FormContainer>
            <Field
              component={InputForm}
              name="amount"
              type="number"
              variant="standard"
              label="Amount"
              InputProps={{
                startAdornment: <InputAdornment position="start">- $</InputAdornment>,
              }}
            />
            { /** Mising date and time picker */ }
            <Field
              component={InputForm}
              name="shortDescription"
              type="text"
              variant="standard"
              label="Short Description"
            />
            <Field
              component={InputForm}
              multiline
              rows={5}
              name="description"
              variant="standard"
              label="Description"
            />
            <AnchorButton to={DASHBOARD_ROUTE}>
              <CancelButton variant="contained" size="medium">Cancel</CancelButton>
            </AnchorButton>
            <PrimaryButton variant="contained" onClick={submitForm} size="medium">
              { action }
              {' '}
              Record
            </PrimaryButton>
          </FormContainer>
        )}
      </Formik>
    </RecordTemplateMain>
  );
};

export { RecordTemplate };
