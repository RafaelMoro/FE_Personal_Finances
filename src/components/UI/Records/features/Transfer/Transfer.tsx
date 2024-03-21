import dayjs from 'dayjs';
import { useState } from 'react';
import { Formik } from 'formik';

import { DASHBOARD_ROUTE } from '../../../../../pages/RoutesConstants';
import { useAppSelector } from '../../../../../redux/hooks';
import { AccountUI } from '../../../Account/interface';
import { CreateTransferValues } from '../../interface';
import { TypeOfRecord } from '../RecordTemplate/interface';
import { TransferSchema } from '../../../../../validationsSchemas/records.schema';
import { scrollToTop } from '../../../../../utils/ScrollToTop';

import { TransferAccountSelector } from '../TransferAccountSelector';
import { TransactionFormFields } from '../TransactionFormFields';
import { ActionButtonPanel } from '../../../../templates';

interface TransferProps {
  action: string;
  typeOfRecord: TypeOfRecord;
}

const Transfer = ({ action, typeOfRecord }: TransferProps) => {
  const selectedAccount = useAppSelector((state) => state.accounts.accountSelected);
  const [initialValues, setInitialValues] = useState<CreateTransferValues>({
    originAccount: (selectedAccount as AccountUI).title,
    destinationAccount: '',
    amount: '',
    shortName: '',
    description: '',
    category: '',
    subCategory: '',
    // If is credit, the prop is false, otherwise it's true because only credit is paid later.
    isPaid: true,
    date: dayjs(new Date()),
    budgets: [],
    tag: [],
  });

  const updateTags = (newChips: string[]) => {
    setInitialValues({ ...initialValues, tag: newChips });
  };

  const updateBudgets = (newBudgets: string[]) => {
    setInitialValues({ ...initialValues, budgets: newBudgets });
  };

  const buttonText = `${action} transfer`;
  // @TODO: Change this to the real values.
  const loadingMutation = false;
  const successMutation = false;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (values: any) => {};

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => handleSubmit(values)}
      validationSchema={TransferSchema}
      enableReinitialize
      validateOnMount
    >
      {({
        submitForm, errors, touched, setFieldValue,
      }) => {
        const hasErrors = Object.keys(errors).length > 0;
        return (
          <>
            <TransferAccountSelector />
            <TransactionFormFields
              typeOfRecord={typeOfRecord}
              setFieldValue={setFieldValue}
              errors={errors}
              touched={touched}
              // @TODO Change this to the real value.
              categoryToBeEdited={null}
              updateBudgets={updateBudgets}
              updateTags={updateTags}
              tags={initialValues.tag}
              budgets={initialValues.budgets}
            />
            <ActionButtonPanel
              routeCancelButton={DASHBOARD_ROUTE}
              minWidthNumber="18"
              actionDataTestId="create-edit-transfer-button"
              submitButtonText={buttonText}
              loading={loadingMutation}
              success={successMutation}
              disableSubmitButton={loadingMutation || successMutation}
              submitForm={() => {
                if (hasErrors) {
                  scrollToTop();
                  submitForm();
                  return;
                }
                submitForm();
              }}
            />
          </>
        );
      }}
    </Formik>
  );
};

export { Transfer };
