import { useState } from 'react';
import { Col, Divider, Layout, Row } from 'antd';
import { SafetyCertificateTwoTone } from '@ant-design/icons';

import PropTypes from 'prop-types';

// Components
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';

// Services
import { getToken } from '../services/userService';
import FeatureDescription from '../components/common/FeatureDescription';

// Constants
const { Content } = Layout;

const Auth = ({ children }) => {
    const token = getToken();
    const [currentTab, setCurrentTab] = useState('LOGIN');

    return (
        <Content>
            <div className="min-h-screen bg-slate-200 flex items-center justify-center">
                {token ? (
                    <>{children}</>
                ) : (
                    <Row gutter={[16, 16]} className="max-w-screen-xl mx-10 p-12 bg-gray-50 shadow rounded-lg w-full">
                        <Col xs={24} md={12} lg={16} xl={16} className="flex">
                            <div className="w-full text-left px-12 py-6 bg-white rounded-lg border-solid border border-gray-200 text-gray-700">
                                <a href="#" className="flex pt-8 items-center w-fit">
                                    <img alt="Shopping cart icon" className="mr-4 block flex-shrink-0" width="40px" src="shop-logo.png" />
                                    <h4 className="m-0 mb-2 text-2xl font-semibold leading-6">Shop</h4>
                                </a>
                                <FeatureDescription title={'Tus productos favoritos'} description={'Encuentra los productos que te gustan por nombre, o filtralos por categoria.'} />
                                <FeatureDescription title={'Añadelos a tu carrito'} description={'Añade tus productos favoritos al carrito y revisa los impuestos de cada uno.'} />
                                <FeatureDescription title={'Analiza tus ordenes'} description={'Haz seguimiento de tus ordenes realizadas por estado y fecha de creación.'} />
                                <Divider className="mb-1" />
                                <FeatureDescription
                                    title={'Credenciales con almacenamiento encriptado'}
                                    icon={<SafetyCertificateTwoTone className="flex-shrink-0 mr-4 text-xl block" twoToneColor={'#52c41a'} />}
                                />
                            </div>
                        </Col>
                        <Col xs={24} md={12} lg={8} xl={8}>
                            {currentTab === 'LOGIN' ? <Login setCurrentTab={setCurrentTab} /> : <Signup setCurrentTab={setCurrentTab} />}
                        </Col>
                    </Row>
                )}
            </div>
        </Content>
    );
};

Auth.propTypes = {
    children: PropTypes.node
};

export default Auth;
