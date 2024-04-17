// import React from 'react';
import { Helmet } from 'react-helmet-async';
import NotFoundView from './NotFoundView';

const NotFoundPage = () =>
  <>
    <Helmet>
      <title> 404 </title>
    </Helmet>
    <NotFoundView />
  </>

export default NotFoundPage;