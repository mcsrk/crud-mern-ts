import { Row, Skeleton, Space } from 'antd';

const OrderSummarySkeleton = () => {
    return (
        <Space direction="vertical" className="w-full p-1 text-center rounded">
            <Row justify="space-between">
                <Skeleton.Input size="small" active />
                <Skeleton.Input size="small" active />
            </Row>
            <Skeleton paragraph={{ rows: 4 }} />
            <Row className="text-right">
                <Skeleton.Button active className="ml-auto mr-2" />
                <Skeleton.Button active />
            </Row>
        </Space>
    );
};

export default OrderSummarySkeleton;
