import { notification } from 'antd';

export const openNotification = (type, title, description = null) => {
    notification[type]({
        message: <span className="text-base">{title}</span>,
        description: <span className="text-sm">{description}</span>,
        duration: 4,
        placement: 'bottomRight',
    });
};
