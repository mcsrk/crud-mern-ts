import './App.css';

import { Layout, theme, ConfigProvider } from 'antd';
import es_ES from 'antd/es/locale/es_ES';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Auth from './pages/Auth';

function App() {
    const {
        token: { colorBgContainer }
    } = theme.useToken();

    return (
        <ConfigProvider locale={es_ES}>
            <BrowserRouter history={createBrowserHistory()}>
                <Auth>
                </Auth>
            </BrowserRouter>
        </ConfigProvider>
    );
}

export default App;
