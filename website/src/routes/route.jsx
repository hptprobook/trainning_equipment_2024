import * as React from "react";
import { Outlet, useRoutes } from "react-router-dom";
import { ChatIndex } from "../pages/ChatIndex";
import ChatLayout from "../layout/chat/ChatLayout";

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