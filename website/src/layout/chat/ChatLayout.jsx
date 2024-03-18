import React from 'react';
import PropTypes from 'prop-types';

const ChatLayout = ({ children }) => {
    return (
        <div>{children}</div>
    )
}
ChatLayout.propTypes = {
    children: PropTypes.node.isRequired
}
export default ChatLayout;

