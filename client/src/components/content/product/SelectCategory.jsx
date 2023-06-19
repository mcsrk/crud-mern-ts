import { Select } from 'antd';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Utils
import { openNotification } from '../../../utils/utils';

// Services
import { getCategories } from '../../../services/productService';

const SelectCategory = ({ setQueryCategory }) => {
    const [categoriesLoading, setCategoriesLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    const handleGetCategories = async () => {
        setCategoriesLoading(true);
        try {
            const res = await getCategories();

            const categoriesOptions = res.map((name) => ({ label: name.charAt(0).toUpperCase() + name.slice(1), value: name }));

            setCategories(categoriesOptions);
            if (!res.length) {
                openNotification('info', 'Sin categorias');
            }
        } catch (e) {
            console.log('[Select Categorias] - Error obteniendo categorias', e.response?.data?.message);
            openNotification('error', 'Error obteniendo categorias.', e.response?.data?.message);
        } finally {
            setCategoriesLoading(false);
        }
    };

    useEffect(() => {
        handleGetCategories();
    }, []);

    return (
        <Select
            allowClear
            placeholder="Filtra por categoría"
            className="w-48 mt-4 mr-auto"
            style={{
                width: 200
            }}
            loading={categoriesLoading}
            disabled={categoriesLoading}
            onChange={setQueryCategory}
            options={categories}
        />
    );
};

SelectCategory.propTypes = {
    setQueryCategory: PropTypes.func.isRequired
};
export default SelectCategory;
