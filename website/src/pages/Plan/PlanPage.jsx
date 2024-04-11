import React from 'react';
import { Helmet } from 'react-helmet-async';
import PlanView from './PlanView';

const PlanPage = () => {
  return (
    <>
      <Helmet>
        <title>Kế hoạch</title>
      </Helmet>
      <PlanView />
    </>
  );
};

export default PlanPage;
