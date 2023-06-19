import { Row, Skeleton, Space } from 'antd';

const ProductSkeleton = () => {
    return (
        <Space direction="vertical" className="w-full bg-gray-100  p-2 text-center rounded">
            <Skeleton.Image active className="mx-auto my-4" />

            <Skeleton paragraph={{ rows: 5 }} />
            <Row justify="space-between">
                <Skeleton.Input active />
                <Skeleton.Button active />
            </Row>
        </Space>
    );
};

export default ProductSkeleton;
