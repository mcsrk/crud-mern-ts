import { useState, useEffect } from 'react';
import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Card, Col, Result, Row, Space, Table } from 'antd';

import { useDispatch, useSelector } from 'react-redux';

// Constants
import cart_table_cols from '../../../constants/cart-table';

// Components
import TableTitle from '../../common/TableTitle';

// Redux
import { remove } from '../../../redux/slices/cartSlice';

// Utils
import { openNotification } from '../../../utils/utils';

const Cart = () => {
    const [totalAmount, setTotalAmount] = useState(0);
    const { cart } = useSelector((state) => state);

    const dispatch = useDispatch();

    const removeItemFromCart = (id) => {
        dispatch(remove(id));
        openNotification('info', `Productoeliminado de tu carrito!`);
    };

    const handleDeleteAll = () => {
        cart.forEach((product) => {
            dispatch(remove(product.id));
        });
        openNotification('info', `Productos eliminados`);
    };
    /** Pushing here the new column because of the handleGetOrder context */
    if (!cart_table_cols.find((col) => col.key === 'action')) {
        cart_table_cols.push({
            title: 'Acción',
            key: 'action',
            width: '5%',
            render: (_, record) => (
                <Button
                    onClick={(e) => {
                        e.stopPropagation();
                        removeItemFromCart(record.id);
                    }}
                    danger
                    type="text"
                    shape="circle"
                    icon={<DeleteOutlined />}
                    size="small"
                />
            )
        });
    }

    useEffect(() => {
        setTotalAmount(parseFloat(cart.reduce((acc, curr) => acc + curr.total, 0)).toFixed(2));
    }, [cart]);

    return (
        <>
            <TableTitle
                content={{
                    title: 'Tu Carrito',
                    icon: <ShoppingCartOutlined />
                }}
            />
            {cart.length > 0 ? (
                <>
                    <Row gutter={[16, 16]} justify="space-between" className="min-h-[80vh] mt-8 mx-auto">
                        <Col xs={24} md={16}>
                            <Table bordered columns={cart_table_cols} dataSource={cart} pagination={false} />
                        </Col>
                        <Col xs={24} md={8} className="justify-center px-8">
                            <Card className="ml-auto" title="Resumen de tu carrtio">
                                <div className="text-right">
                                    <p>
                                        <span className="text-gray-700 font-semibold">Total Items</span> : {cart.length}
                                    </p>
                                    <p>
                                        <span className="text-gray-700 font-bold">Total Amount : ${totalAmount}</span>
                                    </p>

                                    <Space>
                                        <Button type="text" danger onClick={handleDeleteAll}>
                                            Borrar carrito
                                        </Button>
                                        <Button type="primary">Ordenar</Button>
                                    </Space>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </>
            ) : (
                <Result status="403" title="Carrito vacío!" subTitle="No has añadido productos todavía." />
            )}
        </>
    );
};

export default Cart;
