import { useEffect, useState } from 'react';
import { Divider, List, Space } from 'antd';
import { ShopOutlined, ReloadOutlined } from '@ant-design/icons';

// Components
import TableTitle from '../../common/TableTitle';

// Services
import { getProducts } from '../../../services/productService';

//Utils
import { openNotification } from '../../../utils/utils';

import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';
import SelectCategory from './SelectCategory';

const Products = () => {
    const [productsLoading, setProductsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [queryCategory, setQueryCategory] = useState('');

    const handleGetProducts = async () => {
        setProductsLoading(true);
        try {
            const res = await getProducts(queryCategory);
            const updatedRes = res.map((product) => ({
                key: product.id,
                interest: product.price * 0.15,
                total: product.price * 1.15,
                ...product
            }));
            setProducts(updatedRes);
            if (!updatedRes.length) {
                openNotification('info', 'Sin productos');
            }
        } catch (e) {
            console.log('[ProductList] - Error obteniendo productos', e.response?.data?.message);
            openNotification('error', 'Error obteniendo Productos.', e.response?.data?.message);
        } finally {
            setProductsLoading(false);
        }
    };

    const reloadProducts = () => {
        handleGetProducts();
    };

    useEffect(() => {
        handleGetProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryCategory]);

    return (
        <>
            <TableTitle
                content={{
                    title: 'Productos',
                    icon: <ShopOutlined />
                }}
                action={{
                    title: 'Actualizar',
                    icon: <ReloadOutlined />,
                    callback: reloadProducts
                }}
            />
            <Divider />
            <Space
                style={{
                    width: '100%'
                }}
                direction="vertical"
            >
                <SelectCategory setQueryCategory={setQueryCategory} />
            </Space>

            <List
                className="mt-8 mx-auto p-4 bg-gray-50 rounded-md"
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 2,
                    lg: 3,
                    xl: 4,
                    xxl: 4
                }}
                loading={productsLoading}
                dataSource={productsLoading ? Array(12).fill(0) : products}
                renderItem={(product) => <List.Item>{productsLoading ? <ProductSkeleton /> : <ProductCard productData={product} />}</List.Item>}
            />
        </>
    );
};

export default Products;
