import * as React from 'react';
import { Outlet, useRoutes } from 'react-router-dom';
import ChatLayout from '../layout/chat/ChatLayout';
import CompilerPage from '~/pages/Compiler/CompilerPage';
import { CompilerLayout } from '~/layout/compiler/CompilerLayout';
import ChatIndexPage from '~/pages/Chat';
import NotFoundPage from '~/pages/Error/NotFoundPage';
import LoginPage from '~/pages/Login/LoginPage';
import LoginGit from '~/test/test';
import Chat from '~/test/chat';
import Excel from '~/test/excel';
import CompilerDetailPage from '~/pages/Compiler/_id';
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
      children: [{ element: <ChatIndexPage />, path: '/chat' }],
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
      path: 'chatgpt',
      element: <Chat />,
    },
    {
      path: 'excel',
      element: <Excel />,
    },
    {
      path: 'test',
      element: <LoginGit />,
    },
  ]);

  return element;
};
export default MainRoute;
