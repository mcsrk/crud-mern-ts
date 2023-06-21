import './App.css';

import { Layout, theme, ConfigProvider } from 'antd';
import es_ES from 'antd/es/locale/es_ES';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from './redux/store';

// Components
import CustomHeader from './components/header/CustomHeader';
import CustomFooter from './components/footer/CustomFooter';
import Auth from './pages/Auth';
import Main from './pages/Main';

function App() {
    const {
        token: { colorBgContainer }
    } = theme.useToken();

    return (
        <Provider store={store}>
            <ConfigProvider locale={es_ES}>
                <BrowserRouter history={createBrowserHistory()}>
                    <Auth>
                        <Layout className="layout max-w-screen-2xl">
                            <CustomHeader />
                            <Main colorBgContainer={colorBgContainer} />
                            <CustomFooter />
                        </Layout>
                    </Auth>
                </BrowserRouter>
            </ConfigProvider>{' '}
        </Provider>
    );
}

export default App;
