import { Input } from 'antd';
import PropTypes from 'prop-types';

const { Search } = Input;

const SearchProduct = ({ setQueryName }) => {
    return <Search className="w-96" size="large" placeholder="Search product" onSearch={setQueryName} onChange={(e) => setQueryName(e.target.value)} enterButton />;
};

SearchProduct.propTypes = {
    setQueryName: PropTypes.func.isRequired
};

export default SearchProduct;
