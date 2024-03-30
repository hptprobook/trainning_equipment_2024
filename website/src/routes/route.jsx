import * as React from 'react';
import { Outlet, useRoutes } from 'react-router-dom';
import ChatLayout from '../layout/chat/ChatLayout';
import CompilerPage from '~/pages/Compiler/CompilerPage';
import { CompilerLayout } from '~/layout/compiler/CompilerLayout';
import ChatIndexPage from '~/pages/Chat/ChatIndexPage';
import NotFoundPage from '~/pages/Error/NotFoundPage';
import LoginPage from '~/pages/Login/LoginPage';
import LoginGit from '~/test/test';
import ChatDetailPage from '~/pages/Chat/ChatDetailPage';
import Excel from '~/test/excel';
import CompilerDetailPage from '~/pages/Compiler/_id';
import CompilerPublicDetailPage from '~/pages/Compiler/public/_id';
import Prompts from '~/test/prompts';

const MainRoute = () => {
  let element = useRoutes([
    {
      element: (
        <ChatLayout>
          <React.Suspense>
            <Outlet />
          </React.Suspense>
        </ChatLayout>
      ),
      children: [
        { element: <ChatIndexPage />, path: '/chat' },
        { element: <ChatDetailPage />, path: '/chat/:id' },
      ],
    },
    {
      element: (
        <CompilerLayout>
          <React.Suspense>
            <Outlet />
          </React.Suspense>
        </CompilerLayout>
      ),
      children: [
        {
          element: <CompilerPage />,
          index: true,
        },
        {
          path: '/compiler/:id',
          element: <CompilerDetailPage />,
        },
        {
          path: '/compiler/public/:id',
          element: <CompilerPublicDetailPage />,
        },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
    {
      path: 'excel',
      element: <Excel />,
    },
    {
      path: 'getPrompts',
      element: <Prompts />,
    },
    {
      path: 'test',
      element: <LoginGit />,
    },
  ]);

  return element;
};
export default MainRoute;
