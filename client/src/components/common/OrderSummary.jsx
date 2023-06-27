import { Button, Card, Divider, Row, Space } from 'antd';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

// Zustand
import { useBoundStore } from '../../store/useBoundStore';

// Components
import OrderStatus from './OrderStatus';
import OrderSummarySkeleton from './OrderSummarySkeleton';

const OrderSummary = ({ loading = false, actions }) => {
    const { _id, status, products, total, createdAt, updatedAt } = useBoundStore((state) => state.order);
    const { primary, secondary, actionsLoading } = actions;

    return (
        <Card bordered={false} className="border-solid border border-gray-200 ml-auto shadow-sm" title={<div className="text-lg font-bold"> Resumen de la orden</div>}>
            {loading ? (
                <OrderSummarySkeleton />
            ) : (
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

                        <h4 className="text-gray-600 my-2">${parseFloat(total.toFixed(2))}</h4>
                    </Row>
                    <Divider className="my-2" />
                    <Space>
                        <Button loading={actionsLoading} disabled={products?.length === 0} type="text" danger onClick={secondary.callback}>
                            {secondary.name}
                        </Button>
                        <Button loading={actionsLoading} disabled={products?.length === 0} type="primary" onClick={primary.callback}>
                            {primary.name}
                        </Button>
                    </Space>
                </div>
            )}
        </Card>
    );
};

OrderSummary.propTypes = {
    loading: PropTypes.bool,

    actions: PropTypes.shape({
        actionsLoading: PropTypes.bool,
        primary: PropTypes.shape({
            name: PropTypes.string.isRequired,
            callback: PropTypes.func.isRequired
        }),
        secondary: PropTypes.shape({
            name: PropTypes.string.isRequired,
            callback: PropTypes.func.isRequired
        })
    }).isRequired
};

export default OrderSummary;
