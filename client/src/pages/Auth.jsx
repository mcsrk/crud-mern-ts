import PropTypes from 'prop-types';

/** Services */
import { getToken } from '../services/userService';

import Public from './Public';

const Auth = ({ children }) => {
    const token = getToken();

    return <>{!token ? <Public /> : <>{children}</>}</>;
};

Auth.propTypes = {
    colorBgContainer: PropTypes.string,
    children: PropTypes.node
};

export default Auth;
