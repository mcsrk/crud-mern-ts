import { useEffect, useState } from 'react';
import { BookOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Col, Result, Row, Skeleton, Table } from 'antd';

// Router
import { useNavigate, useParams } from 'react-router-dom';

// Components
import TableTitle from '../../common/TableTitle';
import OrderSummary from '../../common/OrderSummary';

// Services
import { deleteOrder, getOrderDetails, payOrder, updateOrder } from '../../../services/ordersSerivce';

// Utils
import { openNotification } from '../../../utils/utils';

// Constants
import CART_TABLE_COLUMNS from '../../../constants/CART_TABLE_COLUMNS';

const OrderDetails = () => {
    const navigate = useNavigate();

    const params = useParams();
    const { order_id } = params;

    const [orderDetails, setOrderdetails] = useState({});

    const [getOrderLoading, setGetOrderLoading] = useState(false);
    const [updateOrderLoading, setUpdateOrderLoading] = useState(false);
    const [actionOnOrderLoading, setActionOnOrderLoading] = useState(false);

    const handleGetOrderDetails = async (_order_id) => {
        setGetOrderLoading(true);
        try {
            const res = await getOrderDetails(_order_id);
            setOrderdetails(res.order);
            console.log('[OrderDetails] - Detalles de orden obtenidos');
        } catch (e) {
            console.log('[OrderDetails] - Error obteniendo detalles de orden', e.response?.data?.message);
            openNotification('error', 'Error obteniendo detalles de orden.', e.response?.data?.message);
        } finally {
            setGetOrderLoading(false);
        }
    };

    const handlePayOrder = async ({ _id }) => {
        setActionOnOrderLoading(true);
        try {
            await payOrder(_id);

            openNotification('success', 'Orden pagada!', 'El estado de la orden ha sido actualizado');
            // hot reload
            handleGetOrderDetails(_id);
        } catch (e) {
            console.log('[Order details] - Error pagando orden', e.response?.data?.message);
            openNotification('error', 'Error pagando orden.', e.response?.data?.message);
        } finally {
            setActionOnOrderLoading(null);
        }
    };
    const handleUpdateOrder = async (_id, orderBody) => {
        setUpdateOrderLoading(true);
        try {
            await updateOrder(_id, orderBody);

            openNotification('success', 'Orden pagada!', 'El estado de la orden ha sido actualizado');
            // hot reload
            handleGetOrderDetails(_id);
        } catch (e) {
            console.log('[Order details] - Error pagando orden', e.response?.data?.message);
            openNotification('error', 'Error pagando orden.', e.response?.data?.message);
        } finally {
            setUpdateOrderLoading(null);
        }
    };

    const handleDeteleOrder = async ({ _id }) => {
        setActionOnOrderLoading(true);
        try {
            await deleteOrder(_id);
            const res = await getOrderDetails(_id);
            setOrderdetails(res.order);
            console.log('[OrderDetails] - Detalles de orden obtenidos');
        } catch (e) {
            console.log('[OrderDetails] - Error borrando orden', e.response?.data?.message);
            openNotification('error', 'Error borrando orden.', e.response?.data?.message);
        } finally {
            setActionOnOrderLoading(false);
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
            <Row gutter={[16, 16]} justify="space-between" className="min-h-[80vh] mt-8 mx-auto">
                <Col xs={24} md={16}>
                    {getOrderLoading ? (
                        <Skeleton />
                    ) : (
                        <>
                            {orderDetails?.products?.length > 0 ? (
                                <Table bordered columns={CART_TABLE_COLUMNS} dataSource={orderDetails?.products} pagination={false} />
                            ) : (
                                <Result className="border-solid border border-gray-200 rounded-lg" status="403" title="Carrito vacío!" subTitle="No has añadido productos todavía." />
                            )}
                        </>
                    )}
                </Col>
                <Col xs={24} md={8} className="justify-center px-8">
                    <OrderSummary
                        loading={getOrderLoading || updateOrderLoading}
                        order={orderDetails}
                        actions={{
                            actionsLoading: actionOnOrderLoading,
                            primary: { name: 'Pagar', callback: () => handlePayOrder(orderDetails) },
                            secondary: { name: 'Cancelar orden', callback: () => handleDeteleOrder(orderDetails) }
                        }}
                    />
                </Col>
            </Row>
        </>
    );
};

export default OrderDetails;
