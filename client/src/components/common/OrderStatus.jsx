import { Tag } from 'antd';
import PropTypes from 'prop-types';

// constants
import STATUSES_COLORS from '../../constants/STATUSES_COLORS';

const OrderStatus = ({ status }) => {
    const color = STATUSES_COLORS[status] ?? STATUSES_COLORS.DEFAULT;

    return (
        <Tag className="mx-0" color={color}>
            {status}
        </Tag>
    );
};

OrderStatus.propTypes = {
    status: PropTypes.string
};

export default OrderStatus;
