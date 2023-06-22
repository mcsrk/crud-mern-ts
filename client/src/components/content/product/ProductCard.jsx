import { Card, Col, Row, Button, Image, Rate, Tag } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

// Zustand Storage
import { useShoppingCartStore } from '../../../store/shoppingCartStore';

// Utils
import { openNotification } from '../../../utils/utils';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ publicAccess, productData }) => {
    const navigate = useNavigate();
    const { id, title, price, description, category, image, rating } = productData;

    /** Global state */
    // Methods
    const { addProductToCart, removeProductFromCart, isProductInCart } = useShoppingCartStore();

    // Variables
    const { cart } = useShoppingCartStore();

    const addToCart = () => {
        if (publicAccess) {
            navigate('/login', { replace: true });
        } else {
            addProductToCart(productData);
            openNotification('success', `Producto añadido a tu carrito`, title);
        }
    };

    const removeFromCart = () => {
        removeProductFromCart(id);
        openNotification('info', `Producto eliminado de tu carrito!`);
    };

    return (
        <Card
            key={`product-card-${id}`}
            className="p-2 text-center rounded max-w-xs group hover:scale-105 transition duration-200 ease-in hover:shadow-lg"
            cover={<Image className="object-contain" height={150} src={image} />}
        >
            <h4 className="text-xs text-ellipsis line-clamp-1 overflow-hidden ">{title}</h4>
            <Tag className="mr-auto" color="blue">
                {category}
            </Tag>
            <p className="text-xs text-ellipsis line-clamp-4 text-justify text-gray-500">{description}</p>
            <Row justify="space-between">
                <Rate className="max-h-3" disabled defaultValue={rating.rate} allowHalf />
                <p className="text-right font-bold text-md border-2">$ {parseFloat(price).toFixed(2)}</p>
            </Row>

            <Row gutter={[16, 16]} className="add-cart-btn-row" justify="space-between">
                <Col>
                    <Button title="Añadir al carrito" disabled={isProductInCart(id)} onClick={addToCart} type={`${publicAccess ? 'default' : 'primary'}`}>
                        Añadir al carrito
                    </Button>
                </Col>
                <Col>
                    <Button title="Eliminar del carrito" disabled={!cart.some((product) => product.id === id)} onClick={removeFromCart} danger>
                        <DeleteOutlined />
                    </Button>
                </Col>
            </Row>
        </Card>
    );
};

ProductCard.propTypes = {
    publicAccess: PropTypes.bool,
    productData: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        rating: PropTypes.shape({
            rate: PropTypes.number.isRequired,
            count: PropTypes.number.isRequired
        })
    }).isRequired
};
export default ProductCard;
