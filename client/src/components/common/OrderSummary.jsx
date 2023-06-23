import { Button, Card, Divider, Row, Space } from 'antd';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

// Components
import OrderStatus from './OrderStatus';

const OrderSummary = ({ order }) => {
    const { _id, status, products, total, createdAt, updatedAt } = order;
    return (
        <Card bordered={false} className="border-solid border border-gray-200 ml-auto shadow-sm" title={<div className="text-lg font-bold"> Resumen de la orden</div>}>
            <div className="text-right">
                {_id && createdAt && (
                    <>
                        <Row justify={'space-between'} align={'middle'}>
                            <h5 className="text-gray-500 font-normal my-2 mt-0"># {_id}</h5>
                            <Divider type="vertical" className="bg-gray-200" />
                            <h5 className="text-gray-500 font-normal my-2 mt-0">{dayjs(createdAt).format('LLL')}</h5>
                        </Row>

                        <Divider className="my-2" />
                    </>
                )}

                {updatedAt && (
                    <Row justify={'space-between'} align={'middle'}>
                        <h4 className="text-gray-500 font-normal my-2">Última actualización</h4>

                        <h4 className="text-gray-500 font-normal my-2">{dayjs(updatedAt).fromNow()}</h4>
                    </Row>
                )}

                {status && (
                    <Row justify={'space-between'} align={'middle'}>
                        <h4 className="text-gray-500 font-normal my-2">Estado</h4>

                        <h4 className="text-gray-500 font-normal my-2">
                            <OrderStatus status={status} />
                        </h4>
                    </Row>
                )}

                {(updatedAt || status) && <Divider className="my-2" />}

                <Row justify={'space-between'} align={'middle'}>
                    <h4 className="text-gray-600 my-2">Productos</h4>

                    <h4 className="text-gray-600 my-2">{products?.length}</h4>
                </Row>
                <Row justify={'space-between'} align={'middle'}>
                    <h4 className="text-gray-600 my-2">Total</h4>

                    <h4 className="text-gray-600 my-2">${total}</h4>
                </Row>
                <Divider className="my-2" />
                <Space>
                    <Button disabled={products?.length === 0} type="text" danger>
                        Cancelar orden
                    </Button>
                    <Button disabled={products?.length === 0} type="primary">
                        Pagar
                    </Button>
                </Space>
            </div>
        </Card>
    );
};

OrderSummary.propTypes = {
    order: PropTypes.shape({
        _id: PropTypes.string,
        total: PropTypes.string.isRequired,
        createdAt: PropTypes.string,
        updatedAt: PropTypes.string,
        status: PropTypes.string,
        products: PropTypes.shape([
            {
                _id: PropTypes.string, // MongoDB Id
                id: PropTypes.number, // Products external API id
                price: PropTypes.number,
                interest: PropTypes.number,
                total: PropTypes.number
            }
        ]).isRequired
    }).isRequired
};

export default OrderSummary;
