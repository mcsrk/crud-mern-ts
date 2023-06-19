import { Button, Row } from 'antd';
import PropTypes from 'prop-types';

const TableTitle = ({ content, action }) => {
    const { title, icon } = content;
    return (
        <Row justify="space-between" className="align-top">
            <div className="text-xl sm:text-2xl font-bold ">
                <span className="text-teal-500 mr-2">{icon}</span>
                {title}
            </div>
            {action?.title && action?.icon && action?.callback && (
                <Button type={action.primary ? 'primary' : 'default'} onClick={action.callback} icon={action.icon}>
                    {action.title}
                </Button>
            )}
        </Row>
    );
};

TableTitle.propTypes = {
    content: PropTypes.shape({
        title: PropTypes.string.isRequired,
        icon: PropTypes.node.isRequired
    }).isRequired,
    action: PropTypes.shape({
        title: PropTypes.string,
        icon: PropTypes.node,
        primary: PropTypes.bool,
        callback: PropTypes.func
    })
};

export default TableTitle;
