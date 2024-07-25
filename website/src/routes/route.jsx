import * as React from 'react';
import { Outlet, useRoutes } from 'react-router-dom';
import ChatLayout from '../layout/chat/ChatLayout';
import CompilerPage from '~/pages/Compiler/CompilerPage';
import { CompilerLayout } from '~/layout/compiler/CompilerLayout';
import ChatIndexPage from '~/pages/Chat/ChatIndexPage';
import NotFoundPage from '~/pages/Error/NotFoundPage';
import LoginPage from '~/pages/Login/LoginPage';
import ChatDetailPage from '~/pages/Chat/ChatDetailPage';
import CompilerDetailPage from '~/pages/Compiler/_id';
import CompilerPublicDetailPage from '~/pages/Compiler/public/_id';
import Prompts from '~/test/prompts';
import AuthLayout from '~/auth/authLayout';
import PlanPage from '~/pages/Plan/PlanPage';

const MainRoute = () => {
  let element = useRoutes([
    // {
    //   element: (
    //     <ChatLayout>
    //       <React.Suspense>
    //         <AuthLayout />
    //       </React.Suspense>
    //     </ChatLayout>
    //   ),
    //   children: [
    //     { element: <ChatIndexPage />, path: '/chat' },
    //     { element: <ChatDetailPage />, path: '/chat/:id' },
    //   ],
    // },
    // {
    //   element: (
    //     <CompilerLayout>
    //       <React.Suspense>
    //         <AuthLayout />
    //       </React.Suspense>
    //     </CompilerLayout>
    //   ),
    //   children: [
    //     { path: '/compiler', element: <CompilerPage />, index: true },
    //     {
    //       path: '/compiler/:id',
    //       element: <CompilerDetailPage />,
    //     },
    //     {
    //       path: '/compiler/public/:id',
    //       element: <CompilerPublicDetailPage />,
    //     },
    //   ],
    // },
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      path: '/compiler',
      element: <AuthLayout><CompilerLayout><CompilerPage /></CompilerLayout></AuthLayout>
    },
    {
      path: '/compiler/:id',
      element: <AuthLayout><CompilerLayout><CompilerDetailPage /></CompilerLayout></AuthLayout>,
    },
    { element: <AuthLayout><ChatLayout><ChatIndexPage /></ChatLayout></AuthLayout>, path: '/chat' },
    { element: <AuthLayout><ChatLayout><ChatDetailPage /></ChatLayout></AuthLayout>, path: '/chat/:id' },
    {
      path: '/compiler/public/:id',
      element: <CompilerPublicDetailPage />,
    },
    {
      path: 'plan',
      element: <PlanPage />,
    },
    {
      // path: 'getPrompts',
      element: <Prompts />,
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]);
  console.log(element);
  return element;
};
export default MainRoute;
