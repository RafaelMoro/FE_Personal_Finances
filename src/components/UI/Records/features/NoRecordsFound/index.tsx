import { FlexContainer, Paragraph, PrimaryButton } from '../../../../../styles';
import noRecordsFoundImgWebp from '../../../../../assets/no_records_found_webp.webp';
import noRecordsFoundImgPng from '../../../../../assets/no_records_found_png.png';
import { NotRecordsFoundPicture } from './NoRecordsFound.styled';

// Le falta el onclick para que abra la pagina de crear record
const NoRecordsFound = () => (
  <FlexContainer gap="2" flexDirection="column" alignItems="center">
    <NotRecordsFoundPicture>
      <source srcSet={noRecordsFoundImgWebp} type="image/webp" />
      <img src={noRecordsFoundImgPng} alt="Budget Master logo" />
    </NotRecordsFoundPicture>
    <Paragraph align="center">
      You have not created records for this account yet.
    </Paragraph>
    <PrimaryButton>Create Record</PrimaryButton>
  </FlexContainer>
);

export { NoRecordsFound };
