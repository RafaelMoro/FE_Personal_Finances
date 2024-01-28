import { useNavigate } from 'react-router-dom';

import { Paragraph, PrimaryButton } from '../../../../../styles';
import { NotRecordsFoundPicture } from './NoRecordsFound.styled';
import noRecordsFoundImgWebp from '../../../../../assets/no_records_found_webp.webp';
import noRecordsFoundImgPng from '../../../../../assets/no_records_found_png.png';
import { CREATE_RECORD_ROUTE } from '../../../../../pages/RoutesConstants';
import { NoRecordsFoundContainer } from '../Features.styled';

// Le falta el onclick para que abra la pagina de crear record
const NoRecordsFound = () => {
  const navigate = useNavigate();
  const navigateToCreateRecord = () => navigate(CREATE_RECORD_ROUTE);
  return (
    <NoRecordsFoundContainer>
      <NotRecordsFoundPicture>
        <source srcSet={noRecordsFoundImgWebp} type="image/webp" />
        <img src={noRecordsFoundImgPng} alt="No Records Found" />
      </NotRecordsFoundPicture>
      <Paragraph align="center">
        You have not created records for this account yet.
      </Paragraph>
      <PrimaryButton onClick={navigateToCreateRecord}>Create Record</PrimaryButton>
    </NoRecordsFoundContainer>
  );
};

export { NoRecordsFound };