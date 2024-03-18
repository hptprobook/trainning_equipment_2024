
import * as React from 'react';
import { Outlet, useRoutes } from 'react-router-dom';
import ChatLayout from '../layout/chat/ChatLayout';
import { ChatIndex } from '../pages/ChatIndex';
import CompilerPage from '~/pages/Compiler/CompilerPage';
import { CompilerLayout } from '~/layout/compiler/CompilerLayout';


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
        { element: <ChatIndex />, index: true },
      ],
    },
    {
      element: (
        <ChatLayout>
          <React.Suspense>
            <Outlet />
          </React.Suspense>
        </ChatLayout>
      ),
      children: [
        { element: <ChatIndex />, index: true },
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
      ],
    },
  ]);

  return element;
};
export default MainRoute;
