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
        },
        filters: [
            {
                text: 'Activas',
                value: 'ACTIVE'
            },
            {
                text: 'Completadas',
                value: 'COMPLETED'
            }
        ],
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        onFilter: (value, record) => record.status.indexOf(value) === 0,
        sorter: (a, b) => a.status.length - b.status.length,
        sortDirections: ['descend']
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
