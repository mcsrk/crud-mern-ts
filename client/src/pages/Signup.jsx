import { Col, Row } from 'antd';

/** Components */
import LandingCard from '../components/auth/LandingCard';
import SignupForm from '../components/auth/SignupForm';

const Signup = () => {
    return (
        <div className="min-h-full flex items-center justify-center">
            <Row gutter={[16, 16]} className="max-w-screen-xl mx-10 p-12 bg-gray-50 shadow rounded-lg w-full">
                <Col xs={24} md={12} lg={16} xl={16} className="flex">
                    <LandingCard />
                </Col>
                <Col xs={24} md={12} lg={8} xl={8}>
                    <SignupForm />
                </Col>
            </Row>
        </div>
    );
};

export default Signup;
