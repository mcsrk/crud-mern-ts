import { LogoutOutlined } from '@ant-design/icons';
import { Menu, Layout, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

// Constants
import sidebar_menu from '../../constants/header-menu';

// Services
import { logOutUser } from '../../services/userService';

// Const
const { Header } = Layout;

const CustomHeader = () => {
    const navigate = useNavigate();
    return (
        <Header className="flex justify-between items-center px-4 sm:px-6">
            <div className="w-5/6 flex flex-row items-center">
                <Menu className="w-full" theme="dark" mode="horizontal" defaultSelectedKeys={[sidebar_menu.default]} items={sidebar_menu.items} />
            </div>
            <Button
                danger
                ghost
                onClick={() => {
                    logOutUser(navigate);
                }}
                icon={<LogoutOutlined />}
            />
        </Header>
    );
};

export default CustomHeader;
