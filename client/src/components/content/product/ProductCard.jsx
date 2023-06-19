import { Card, Col, Row, Button, Image, Rate, Tag } from 'antd';
import PropTypes from 'prop-types';
import { DeleteOutlined } from '@ant-design/icons';

// Redux
import { add, remove } from '../../../redux/slices/cartSlice';
import { useSelector, useDispatch } from 'react-redux';

// Utils
import { openNotification } from '../../../utils/utils';

const ProductCard = ({ productData }) => {
    const { cart } = useSelector((state) => state);
    const dispatch = useDispatch();

    const { id, title, price, description, category, image, rating } = productData;

    const addToCart = () => {
        dispatch(add(productData));
        openNotification('success', `${title} añadido a tu carrito`);
    };

    const removeFromCart = () => {
        dispatch(remove(id));
        openNotification('info', `Producto eliminado de tu carrito!`);
    };

    return (
        <Card
            key={`product-card-${id}`}
            hoverable
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
                    <Button title="Añadir al carrito" disabled={cart.some((product) => product.id === id)} onClick={addToCart} type="primary">
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
