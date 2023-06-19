import { Tag } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.locale('es');
dayjs.extend(relativeTime);

const orders_table_cols = [
    {
        title: 'Id',
        dataIndex: '_id',
        key: '_id'
    },
    {
        title: 'Estado',
        dataIndex: 'status',
        key: 'status',
        render: (_, record) => {
            return <Tag color={record.status === 'ACTIVE' ? 'green' : 'geekblue'}>{record.status}</Tag>;
        }
    },

    {
        title: 'Fecha creación',
        dataIndex: 'createdAt',
        key: 'createdAt',
        responsive: ['sm'],
        render: (_, record) => {
            if (record?.createdAt) {
                const formattedDate = dayjs(record.createdAt).locale('es').format('DD/MMM/YYYY hh:mm:ss A');
                return <span>{formattedDate}</span>;
            } else {
                return <p className="italic text-gray-400 m-0">Sin datos</p>;
            }
        }
    },
    {
        title: 'Última actualización',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        responsive: ['sm'],
        render: (_, record) => {
            if (record?.updatedAt) {
                const formattedDate = dayjs(record.updatedAt).fromNow();
                return <span>{formattedDate}</span>;
            } else {
                return <p className="italic text-gray-400 m-0">Sin datos</p>;
            }
        }
    },
    {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
        responsive: ['md'],
        render: (_, record) => {
            return record?.total ? record.total : <p className="italic text-gray-400 m-0">Sin total</p>;
        }
    }
];

export default orders_table_cols;
