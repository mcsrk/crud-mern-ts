import { Tag } from 'antd';
import PropTypes from 'prop-types';

const OrderStatus = ({ status }) => {
    const colors = { COMPLETED: 'green', ACTIVE: 'geekblue' };

    return (
        <Tag className="mx-0" color={colors[status] ?? 'gray'}>
            {status}
        </Tag>
    );
};

OrderStatus.propTypes = {
    status: PropTypes.string
};

export default OrderStatus;
