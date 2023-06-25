import { LogoutOutlined, LoginOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Menu, Layout, Button, Space, Tooltip, Badge, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
// Constants
import sidebar_menu from '../../constants/header-menu';
// Zustand
import { useBoundStore } from '../../store/useBoundStore';

// Services
import { logOutUser } from '../../services/userService';

import { getToken } from '../../services/userService';

// Const
const { Header } = Layout;

const CustomHeader = () => {
    const token = getToken();
    const navigate = useNavigate();

    const { cart } = useBoundStore();

    return (
        <Header className="flex justify-between items-center px-4 sm:px-6">
            <div className="w-5/6 flex flex-row items-center">
                <Menu className="w-full" theme="dark" mode="horizontal" defaultSelectedKeys={[sidebar_menu.default]} items={token ? sidebar_menu.auth_nav : sidebar_menu.public_nav} />
            </div>
            <Space>
                <Tooltip title={`${cart.length} Productos en tu carrito`}>
                    <Badge count={cart.length} size="small">
                        <Button
                            shape="circle"
                            loading={false}
                            ghost
                            onClick={() => navigate('/cart', { replace: true })}
                            icon={
                                <ShoppingOutlined
                                    style={{
                                        fontSize: 18,
                                        cursor: 'pointer'
                                    }}
                                />
                            }
                        />
                    </Badge>
                </Tooltip>
                <Divider className="bg-gray-400" type="vertical" />
                {token ? (
                    <Button
                        danger
                        ghost
                        onClick={() => {
                            logOutUser(navigate);
                        }}
                        icon={<LogoutOutlined />}
                    >
                        Logout
                    </Button>
                ) : (
                    <Button
                        type="primary"
                        onClick={() => {
                            navigate('/login', { replace: true });
                        }}
                        icon={<LoginOutlined />}
                    >
                        Login
                    </Button>
                )}
            </Space>
        </Header>
    );
};

export default CustomHeader;
