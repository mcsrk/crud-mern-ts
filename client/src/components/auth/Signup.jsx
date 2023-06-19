import { useState } from 'react';
import { Button, Card, Form, Input, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

// Components
import LandingCardHeader from '../common/LandingCardHeader';

// Services
import { createUser } from '../../services/userService';

// Utils
import { openNotification } from '../../utils/utils';

// Constants
import loadingMessages from '../../constants/loading-messages';

const Signup = ({ setCurrentTab }) => {
    const [form] = Form.useForm();
    const [signupLoading, setSignupLoading] = useState(false);

    const handleCreateUser = async (newuserBody) => {
        setSignupLoading(true);
        try {
            await createUser(newuserBody);
            openNotification('success', 'Usuario creado!');
            form.resetFields();

            setCurrentTab('LOGIN');
        } catch (e) {
            console.log('[Signup] - Error creando usuario', e.response.data.message);
            openNotification('error', 'Error creando usuario.', e.response.data.message);
        } finally {
            setSignupLoading(false);
        }
    };

    const onFinish = (values) => {
        const newUserData = {
            username: btoa(values?.username.trim()),
            password: btoa(values?.password.trim())
        };

        handleCreateUser(newUserData);
    };

    return (
        <Card className="max-w-md mx-auto mt-16">
            <LandingCardHeader heading="Crea un usuario" paragraph="¿Ya tienes un usuario? " linkName="Ingresa" onClick={() => setCurrentTab('LOGIN')} />
            <Spin spinning={signupLoading} tip={loadingMessages.signup}>
                <Form form={form} layout="vertical" name="signup" className="w-full " onFinish={onFinish} autoComplete="off">
                    <Form.Item
                        name="username"
                        label="Nombre de usuario"
                        rules={[
                            {
                                required: true,
                                message: 'Ingrese su nombre de usuario!'
                            }
                        ]}
                    >
                        <Input placeholder="Username" prefix={<UserOutlined className="site-form-item-icon" />} />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Contraseña"
                        rules={[
                            {
                                required: true,
                                message: 'Ingrese su contraseña!'
                            }
                        ]}
                    >
                        <Input.Password placeholder="123456" prefix={<LockOutlined className="site-form-item-icon" />} />
                    </Form.Item>

                    <Form.Item>
                        <Button htmlType="submit" loading={signupLoading} className="w-full">
                            Registrarte
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
        </Card>
    );
};

export default Signup;
