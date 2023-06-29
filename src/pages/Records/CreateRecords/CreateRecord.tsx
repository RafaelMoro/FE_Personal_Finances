import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DASHBOARD_ROUTE } from '../../RoutesConstants';

const CreateRecord = () => {
  const navigate = useNavigate();
  const returnToDashboard = () => navigate(DASHBOARD_ROUTE);
  const [miEstado, setMiEstado] = useState('');

  return (
    <>
      <div>Create Record</div>
      <a href={DASHBOARD_ROUTE}>Go Back</a>
    </>
  );
};

export { CreateRecord };
