import { HomeOutlined, ShopOutlined, ShoppingCartOutlined, BookOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const sidebar_menu = {
    default: '1',
    public_nav: [
        { key: 1, label: <Link to="/" />, icon: <HomeOutlined /> },
        { key: 2, label: <Link to="/login">Ordenes</Link>, icon: <BookOutlined /> },
        { key: 3, label: <Link to="/login">Carrito</Link>, icon: <ShoppingCartOutlined /> }
    ],
    auth_nav: [
        { key: 1, label: <Link to="/products">Productos</Link>, icon: <ShopOutlined /> },
        { key: 2, label: <Link to="/orders">Ordenes</Link>, icon: <BookOutlined /> },
        { key: 3, label: <Link to="/cart">Carrito</Link>, icon: <ShoppingCartOutlined /> }
    ]
};

export default sidebar_menu;
