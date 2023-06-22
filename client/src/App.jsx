import './App.css';

import { Layout, theme, ConfigProvider } from 'antd';
import es_ES from 'antd/es/locale/es_ES';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';

// Components
import CustomHeader from './components/header/CustomHeader';
import CustomFooter from './components/footer/CustomFooter';
import Auth from './pages/Auth';
import Main from './pages/Main';

const { Content } = Layout;

function App() {
    const {
        token: { colorBgContainer }
    } = theme.useToken();

    return (
        <ConfigProvider locale={es_ES}>
            <BrowserRouter history={createBrowserHistory()}>
                <div className="min-h-screen bg-blue-100 flex items-center justify-center">
                    <Layout className="layout max-w-screen-2xl">
                        <CustomHeader />
                        <Content className="px-6 py-6 sm:px-6">
                            <div
                                className="min-h-screen p-4 sm:p-6 "
                                style={{
                                    background: colorBgContainer
                                }}
                            >
                                <Auth colorBgContainer={colorBgContainer}>
                                    <Main colorBgContainer={colorBgContainer} />
                                </Auth>
                            </div>
                        </Content>
                        <CustomFooter />
                    </Layout>
                </div>
            </BrowserRouter>
        </ConfigProvider>
    );
}

export default App;
