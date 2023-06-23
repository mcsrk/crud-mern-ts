import { useEffect, useState } from 'react';
import { BookOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Skeleton } from 'antd';

// Router
import { useNavigate, useParams } from 'react-router-dom';

// Components
import TableTitle from '../../common/TableTitle';

// Services
import { getOrderDetails } from '../../../services/ordersSerivce';

//Utils
import { openNotification } from '../../../utils/utils';

const OrderDetails = () => {
    const navigate = useNavigate();

    const params = useParams();
    const { order_id } = params;

    const [orderDetailsLoading, setOrderdetailsLoading] = useState(false);
    const [orderDetails, setOrderdetails] = useState([]);

    const handleGetOrderDetails = async (_order_id) => {
        setOrderdetailsLoading(true);
        try {
            const res = await getOrderDetails(_order_id);

            setOrderdetails(res);
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
    }, [order_id]);

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
            {orderDetailsLoading ? <Skeleton /> : <span>{JSON.stringify(orderDetails)} </span>}
        </>
    );
};

export default OrderDetails;
