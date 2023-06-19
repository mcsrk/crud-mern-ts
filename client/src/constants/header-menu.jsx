import { ShopOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const sidebar_menu = {
    default: '2',
    items: [
        { key: 2, label: <Link to="/products">Productos</Link>, icon: <ShopOutlined /> },
        { key: 1, label: <Link to="/orders">Ordenes</Link>, icon: <ShoppingCartOutlined /> }
    ]
};

export default sidebar_menu;
