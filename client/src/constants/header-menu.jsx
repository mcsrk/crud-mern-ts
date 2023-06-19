import { ShopOutlined, ShoppingCartOutlined, BookOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const sidebar_menu = {
    default: '2',
    items: [
        { key: 2, label: <Link to="/products">Productos</Link>, icon: <ShopOutlined /> },
        { key: 1, label: <Link to="/orders">Ordenes</Link>, icon: <BookOutlined /> },
        { key: 3, label: <Link to="/cart">Carrito</Link>, icon: <ShoppingCartOutlined /> }
    ]
};

export default sidebar_menu;
