import { Button, Row } from 'antd';
import PropTypes from 'prop-types';

const LandingCardHeader = ({ heading, paragraph, linkName, onClick }) => {
    return (
        <div className="mb-10">
            <Row justify="center">
                <img alt="" className="h-14 w-14" src="https://miro.medium.com/max/300/1*JY-JZfN8GW_OsJoVrI7wBg.png" />
            </Row>
            <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">{heading}</h2>

            <p className="mt-2 text-center text-sm text-gray-600">
                {paragraph}
                <Button type="link" onClick={onClick}>
                    {linkName}
                </Button>
            </p>
        </div>
    );
};

LandingCardHeader.propTypes = {
    heading: PropTypes.string.isRequired,
    paragraph: PropTypes.string.isRequired,
    linkName: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default LandingCardHeader;
