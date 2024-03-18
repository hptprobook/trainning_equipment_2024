
import * as React from 'react';
import { Outlet, useRoutes } from 'react-router-dom';
import ChatLayout from '../layout/chat/ChatLayout';
import CompilerPage from '~/pages/Compiler/CompilerPage';
import { CompilerLayout } from '~/layout/compiler/CompilerLayout';
import ChatIndexPage from '~/pages/Chat';
import NotFoundPage from '~/pages/Error/NotFoundPage';
import LoginPage from '~/pages/Login/LoginPage';


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
          path: 'compiler',
          element: <CompilerPage />,
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
    }
  ]);

  return element;
};
export default MainRoute;
