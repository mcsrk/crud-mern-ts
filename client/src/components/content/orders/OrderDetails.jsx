import { useEffect, useState } from 'react';
import { BookOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Col, Result, Row, Skeleton, Table } from 'antd';

// Router
import { useNavigate, useParams } from 'react-router-dom';

// Components
import TableTitle from '../../common/TableTitle';

// Services
import { getOrderDetails } from '../../../services/ordersSerivce';

//Utils
import { openNotification } from '../../../utils/utils';

// constants
import cart_table_cols from '../../../constants/cart-table';
import OrderSummary from '../../common/OrderSummary';

const OrderDetails = () => {
    const navigate = useNavigate();

    const params = useParams();
    const { order_id } = params;
    const [orderDetailsLoading, setOrderdetailsLoading] = useState(false);
    const [orderDetails, setOrderdetails] = useState({});

    const handleGetOrderDetails = async (_order_id) => {
        console.log({ _order_id });
        setOrderdetailsLoading(true);
        try {
            const res = await getOrderDetails(_order_id);
            setOrderdetails(res.order);
            console.log('[OrderDetails] - Detalles de orden obtenidos');
        } catch (e) {
            console.log('[OrderDetails] - Error obteniendo detalles de orden', e.response?.data?.message);
            openNotification('error', 'Error obteniendo detalles de orden.', e.response?.data?.message);
        } finally {
            setOrderdetailsLoading(false);
        }
    };

    useEffect(() => {
        handleGetOrderDetails(order_id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <TableTitle
                content={{
                    title: 'Detalles de la orden',
                    icon: <BookOutlined />
                }}
                action={{
                    title: 'Regresar',
                    icon: <ArrowLeftOutlined />,
                    primary: false,
                    callback: () => navigate(`/orders`)
                }}
            />
            {orderDetailsLoading ? (
                <Skeleton />
            ) : (
                <Row gutter={[16, 16]} justify="space-between" className="min-h-[80vh] mt-8 mx-auto">
                    <Col xs={24} md={16}>
                        {orderDetails?.products?.length > 0 ? (
                            <Table bordered columns={cart_table_cols} dataSource={orderDetails?.products} pagination={false} />
                        ) : (
                            <Result className="border-solid border border-gray-200 rounded-lg" status="403" title="Carrito vacío!" subTitle="No has añadido productos todavía." />
                        )}
                    </Col>
                    <Col xs={24} md={8} className="justify-center px-8">
                        <OrderSummary order={orderDetails} />
                    </Col>
                </Row>
            )}
        </>
    );
};

export default OrderDetails;
