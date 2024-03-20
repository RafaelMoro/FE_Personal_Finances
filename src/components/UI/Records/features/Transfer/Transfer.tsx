import dayjs from 'dayjs';
import { useState } from 'react';
import { Formik } from 'formik';
import { useAppSelector } from '../../../../../redux/hooks';
import { AccountUI } from '../../../Account/interface';
import { TransferSchema } from '../../../../../validationsSchemas/records.schema';
import { TransferAccountSelector } from '../TransferAccountSelector';
import { ActionButtonPanel } from '../../../../templates';
import { DASHBOARD_ROUTE } from '../../../../../pages/RoutesConstants';
import { scrollToTop } from '../../../../../utils/ScrollToTop';

const Transfer = ({ action }: { action: string }) => {
  const selectedAccount = useAppSelector((state) => state.accounts.accountSelected);
  const [initialValues, setInitialValues] = useState({
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
      {({ submitForm, errors }) => {
        const hasErrors = Object.keys(errors).length > 0;
        return (
          <>
            <TransferAccountSelector />
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
