import { useEffect, useState } from 'react';
import { Result, Table } from 'antd';
import { BookOutlined, ReloadOutlined } from '@ant-design/icons';

// Router
import { useNavigate } from 'react-router';

// Componets
import TableTitle from '../../common/TableTitle';

// Services
import { getUserData } from '../../../services/userService';
import { getOrders } from '../../../services/ordersSerivce';

//Utils
import { openNotification } from '../../../utils/utils';

// Costansts
import orders_table_cols from '../../../constants/orders-table';
import OrderActions from './OrderActions';

const OrdersTable = () => {
    const navigate = useNavigate();

    const userData = getUserData();

    const [ordersLoading, setOrdersLoading] = useState(false);
    const [orders, setOrders] = useState([]);

    let columns = [...orders_table_cols];

    const handleGetOrders = async () => {
        setOrdersLoading(true);
        try {
            const res = await getOrders(userData.id);

            const updatedRes = res.orders.map((order) => ({
                key: order._id,
                ...order
            }));

            setOrders(updatedRes);
        } catch (e) {
            console.log('[Order] - Error obteniendo ordenes', e.response?.data?.message);
            openNotification('error', 'Error obteniendo ordenes.', e.response?.data?.message);
        } finally {
            setOrdersLoading(false);
        }
    };

    const reloadCompanies = () => {
        handleGetOrders();
    };

    /** Pushing here the new column because of the handleGetOrder context */
    columns.push({
        title: 'Acción',
        key: 'action',
        width: '5%',
        render: (_, record) => <OrderActions order={record} handleGetOrders={handleGetOrders} />
    });

    useEffect(() => {
        handleGetOrders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClickRow = (row) => {
        const { key } = row;
        navigate(`/orders/${key}/products`);
    };

    return (
        <>
            <TableTitle
                content={{
                    title: 'Tus ordenes',
                    icon: <BookOutlined />
                }}
                action={{
                    title: 'Actualizar',
                    icon: <ReloadOutlined />,
                    primary: false,
                    callback: reloadCompanies
                }}
            />

            {orders.length > 0 ? (
                <Table
                    bordered
                    onRow={(row) => {
                        return {
                            onClick: () => {
                                handleClickRow(row);
                            }
                        };
                    }}
                    loading={ordersLoading}
                    className="mt-8"
                    columns={columns}
                    dataSource={orders}
                    rowClassName="cursor-pointer"
                />
            ) : (
                <Result status="403" title="Sin ordenes!" subTitle="No has creado ordenes todavía." />
            )}
        </>
    );
};

export default OrdersTable;
