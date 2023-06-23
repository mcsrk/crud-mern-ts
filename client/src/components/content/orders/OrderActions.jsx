import { useState } from 'react';
import { Button, Popconfirm, Rate, Space } from 'antd';
import PropTypes from 'prop-types';

import { DeleteOutlined, QuestionCircleOutlined, DollarOutlined, EditOutlined } from '@ant-design/icons';

// Services
import { deleteOrder, payOrder, rateOrder } from '../../../services/ordersSerivce';

// Utils
import { openNotification } from '../../../utils/utils';
import { useShoppingCartStore } from '../../../store/shoppingCartStore';
import { useNavigate } from 'react-router-dom';

const OrderActions = ({ order, handleGetOrders }) => {
    const { status, rate } = order;
    const navigate = useNavigate();

    /** Global state methods */
    const { editOrder } = useShoppingCartStore();

    const [deletingKey, setDeletingKey] = useState(null);
    const [loadingDelete, setLoadingDelete] = useState(false);

    const [payingKey, setPayingKey] = useState(null);
    const [loadingPay, setLoadingPay] = useState(false);

    const [loadingRate, setLoadingRate] = useState(false);

    // const handleUpdateOrder = async (orderId, rate) => {
    //     setLoadingRate(true);
    //     try {
    //         await rateOrder(orderId, rate);
    //         openNotification('success', 'Orden calificada!');
    //         // hot reload
    //         handleGetOrders();
    //     } catch (e) {
    //         console.log('[Order] - Error calificando orden', e.response?.data?.message);
    //         openNotification('error', 'Error calificando orden.', e.response?.data?.message);
    //     } finally {
    //         setLoadingRate(null);
    //     }
    // };

    const handleOnEditOrder = async (_order) => {
        const { _id, products, total } = _order;
        /** Store the orden in global state */
        editOrder(_id, products, total);

        /** Redirect to edit page */
        navigate(`/orders/${_id}`);
    };

    const handleDeteleOrder = async ({ _id }) => {
        setDeletingKey(_id);
        setLoadingDelete(true);
        try {
            await deleteOrder(_id);
            openNotification('success', 'Orden eliminada!', 'La orden se ha eliminado correctamente');
            // hot reload
            handleGetOrders();
        } catch (e) {
            console.log('[Order] - Error eliminando orden', e.response?.data?.message);
            openNotification('error', 'Error eliminando orden.', e.response?.data?.message);
        } finally {
            setLoadingDelete(false);
            setDeletingKey(null);
        }
    };

    const handlePayOrder = async ({ _id }) => {
        setPayingKey(_id);
        setLoadingPay(true);
        try {
            await payOrder(_id);

            openNotification('success', 'Orden pagada!', 'El estado de la orden ha sido actualizado');
            // hot reload
            handleGetOrders();
        } catch (e) {
            console.log('[Order] - Error pagando orde', e.response?.data?.message);
            openNotification('error', 'Error pagando orden.', e.response?.data?.message);
        } finally {
            setPayingKey(false);
            setLoadingPay(null);
        }
    };

    const handleRateOrder = async (orderId, rate) => {
        setLoadingRate(true);
        try {
            await rateOrder(orderId, rate);
            openNotification('success', 'Orden calificada!');
            // hot reload
            handleGetOrders();
        } catch (e) {
            console.log('[Order] - Error calificando orden', e.response?.data?.message);
            openNotification('error', 'Error calificando orden.', e.response?.data?.message);
        } finally {
            setLoadingRate(null);
        }
    };

    return (
        <Space>
            {status === 'COMPLETED' ? (
                <>
                    <span
                        onClick={(e) => {
                            // Stops "Selected order row -> show products" interaction
                            e.stopPropagation();
                        }}
                    >
                        <Rate
                            defaultValue={rate}
                            allowClear={true}
                            onChange={(val) => {
                                console.log(val);
                                handleRateOrder(order._id, val);
                            }}
                            disabled={loadingRate || rate !== 0}
                        />
                    </span>
                </>
            ) : (
                <>
                    <Button
                        onClick={(e) => {
                            // Stops "Selected order row -> show products" interaction
                            e.stopPropagation();
                            handleOnEditOrder(order);
                        }}
                        type="text"
                        shape="circle"
                        icon={<EditOutlined />}
                        disabled={loadingDelete || status === 'COMPLETED'}
                        size="small"
                        title={'Edit order'}
                    />
                    <Popconfirm
                        title="Borrar orden"
                        description="Seguro que quieres borrar esta orden?"
                        onConfirm={(e) => {
                            // Stops "Selected order row -> show products" interaction
                            e.stopPropagation();
                            handleDeteleOrder(order);
                        }}
                        onCancel={(e) => e.stopPropagation()}
                        okButtonProps={{ loading: loadingDelete }}
                        icon={
                            <QuestionCircleOutlined
                                style={{
                                    color: 'red'
                                }}
                            />
                        }
                        okText="Sí"
                        cancelText="No"
                        placement="bottom"
                    >
                        <Button
                            title={'Delet order'}
                            onClick={(e) => e.stopPropagation()}
                            danger
                            type="text"
                            shape="circle"
                            icon={<DeleteOutlined />}
                            disabled={loadingDelete || status === 'COMPLETED'}
                            loading={
                                // Only displays loading animation to the icon of the row that's being deleted
                                loadingDelete && deletingKey === order?._id
                            }
                            size="small"
                        />
                    </Popconfirm>
                    {status === 'ACTIVE' && (
                        <Button
                            title={'Pay order'}
                            onClick={(e) => {
                                // Stops "Selected order row -> show products" interaction
                                e.stopPropagation();
                                handlePayOrder(order);
                            }}
                            type="primary"
                            icon={<DollarOutlined />}
                            disabled={loadingPay || status === 'COMPLETED'}
                            size="small"
                            loading={
                                // Only displays loading animation to the icon of the row that's being deleted
                                loadingPay && payingKey === order?._id
                            }
                        >
                            Pagar
                        </Button>
                    )}
                </>
            )}
        </Space>
    );
};

OrderActions.propTypes = {
    order: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        user: PropTypes.string.isRequired,
        rate: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired
    }),
    handleGetOrders: PropTypes.func.isRequired
};

export default OrderActions;
