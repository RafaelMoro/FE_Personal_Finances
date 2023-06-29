import { useNavigate } from 'react-router-dom';
import { Close } from '@mui/icons-material';

import { DASHBOARD_ROUTE } from '../../../../../pages/RoutesConstants';
import { RecordTemplateProps } from './interface';
import { ParagraphTitle } from '../../../../../styles';
import { RecordTemplateMain, GoBackButton } from './RecordTemplate.styled';

const RecordTemplate = ({ edit = false }: RecordTemplateProps) => {
  const navigate = useNavigate();
  const returnToDashboard = () => navigate(DASHBOARD_ROUTE);

  return (
    <RecordTemplateMain>
      <GoBackButton onClick={returnToDashboard}>
        <Close sx={{ fontSize: '3.5rem' }} />
      </GoBackButton>
      <ParagraphTitle align="center">
        {' '}
        { (edit) ? 'Edit' : 'Create' }
        {' '}
        Record
      </ParagraphTitle>
    </RecordTemplateMain>
  );
};

export { RecordTemplate };
