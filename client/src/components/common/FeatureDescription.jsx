import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
import { CheckCircleTwoTone } from '@ant-design/icons';

const FeatureDescription = ({ title, description, icon = null }) => {
    return (
        <Row className="flex pt-8">
            <Col flex="20px">{icon ?? <CheckCircleTwoTone className="flex-shrink-0 mr-4 text-xl block" />}</Col>
            <Col flex="auto">
                <h4 className="m-0 mb-2 text-xl font-bold leading-4">{title}</h4>
                <p className="m-0 mb-2">{description}</p>
            </Col>
        </Row>
    );
};

FeatureDescription.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    icon: PropTypes.node
};

export default FeatureDescription;
