import { useEffect, useState } from 'react';
import { Divider, List, Space } from 'antd';
import { ShopOutlined, ReloadOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

// Components
import TableTitle from '../../common/TableTitle';
import SelectCategory from './filters/SelectCategory';
import SearchProduct from './filters/SearchProduct';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';

// Services
import { getProducts } from '../../../services/productService';

//Utils
import { openNotification } from '../../../utils/utils';

const Products = ({ publicAccess = false }) => {
    const [productsLoading, setProductsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [queryName, setQueryName] = useState('');
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
            setFilteredProducts(updatedRes);
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

    useEffect(() => {
        console.log({ queryName });
        if (!queryName) {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter((product) => product.title.toLowerCase().includes(queryName)));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryName]);

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

            <Space className=" w-4/5 rounded-md" direction="vertical">
                <SearchProduct setQueryName={setQueryName} />

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
                dataSource={productsLoading ? Array(12).fill(0) : filteredProducts}
                renderItem={(product) => <List.Item>{productsLoading ? <ProductSkeleton /> : <ProductCard publicAccess={publicAccess} productData={product} />}</List.Item>}
            />
        </>
    );
};
Products.propTypes = {
    publicAccess: PropTypes.bool
};

export default Products;
