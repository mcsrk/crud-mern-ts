import { Image } from 'antd';

const CART_TABLE_COLUMNS = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: 'Imagen',
        dataIndex: 'image',
        key: 'image',
        render: (_, record) => {
            return <Image preview={false} className="object-contain" height={80} src={record.image} />;
        }
    },
    {
        title: 'Producto',
        dataIndex: 'title',
        key: 'title'
    },
    {
        title: 'Precio',
        dataIndex: 'price',
        key: 'price',
        render: (_, record) => {
            return '$ ' + parseFloat(record.price.toFixed(2));
        }
    },
    {
        title: 'Interes',
        dataIndex: 'interest',
        key: 'interest',
        render: (_, record) => {
            return '$ ' + parseFloat(record.interest.toFixed(2));
        }
    },
    {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',

        render: (_, record) => {
            return <span className="font-bold text-right">{'$ ' + parseFloat(record.total.toFixed(2))}</span>;
        }
    }
];

export default CART_TABLE_COLUMNS;
