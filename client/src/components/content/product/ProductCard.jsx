import { Card, Col, Row, Button, Image, Rate, Tag } from 'antd';
import PropTypes from 'prop-types';

import { DeleteOutlined } from '@ant-design/icons';

// import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';

const ProductCard = ({ productData }) => {
    const { id, title, price, description, category, image, rating } = productData;
    // const addCart = (item) => {
    //     props.add_cart(item);
    //     openNotification();
    // };

    // const openNotification = () => {
    //     notification.open({
    //         style: {
    //             color: '#1DA57A',
    //             fontWeight: 'bold',
    //             opacity: 0.9,
    //             cursor: 'pointer'
    //         },
    //         placement: 'bottomRight',
    //         message: 'Item Added',
    //         description: `${props.itemName} is added to your cart.`,
    //         duration: 4
    //     });
    // };

    return (
        <Card key={`product-card-${id}`} hoverable className="p-2 text-center rounded max-w-xs hover:shadow-md" cover={<Image className="object-contain" height={150} src={image} />}>
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
                    <Button
                        title="Añadir al carrito"
                        // disabled={props.cart ? props.cart.filter((elem) => elem.itemId === props.itemId).length : false}
                        // onClick={() =>
                        //     addCart({
                        //         itemId: props.itemId,
                        //         itemName: props.itemName,
                        //         itemPrice: props.itemPrice,
                        //         itemDescription: props.itemDescription
                        //     })
                        // }
                        type="primary"
                    >
                        Añadir al carrito
                    </Button>
                </Col>
                <Col>
                    <Button
                        title="Eliminar del carrito"
                        // disabled={!(props.cart ? props.cart.filter((elem) => elem.itemId === props.itemId).length : false)}
                        // onClick={() => props.remove_single(props.itemId)}

                        danger
                    >
                        <DeleteOutlined />
                    </Button>
                </Col>
            </Row>
        </Card>
    );
};

// const mapStateToProps = (state) => ({
//     cart: state.cart,
//     url_key: state.url_key
// });

// const mapDispatchToProps = (dispatch) => ({
//     add_cart: (item) => dispatch({ type: 'ADD_PRODUCT', payload: item }),
//     remove_single: (itemId) => dispatch({ type: 'REMOVE_SINGLE', payload: itemId }),
//     setUrl: (urlKey) => dispatch({ type: 'SET_URL', payload: urlKey })
// });

// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductCard));
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
