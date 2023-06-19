import { useState } from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';

// Components
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';

// Services
import { getToken } from '../services/userService';

// Constants
const { Content } = Layout;

const Auth = ({ children }) => {
    const token = getToken();
    const [currentTab, setCurrentTab] = useState('LOGIN');

    return (
        <Content>
            <div className="min-h-screen ">{token ? <>{children}</> : <>{currentTab === 'LOGIN' ? <Login setCurrentTab={setCurrentTab} /> : <Signup setCurrentTab={setCurrentTab} />}</>}</div>
        </Content>
    );
};

Auth.propTypes = {
    children: PropTypes.node
};

export default Auth;
