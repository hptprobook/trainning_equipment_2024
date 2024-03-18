import * as React from "react";
import { Outlet, useRoutes } from "react-router-dom";
import  ChatLayout  from "../layout/chat/ChatLayout";
import { ChatIndex } from "../pages/ChatIndex";

const MainRoute = () => {
    let element = useRoutes([
        {
            element:
                <ChatLayout>
                    <React.Suspense>
                        <Outlet />
                    </React.Suspense>
                </ChatLayout>,
            children: [
                { element: <ChatIndex />, index: true }
            ],
        },
    ]);

    return element;
}
export default MainRoute;