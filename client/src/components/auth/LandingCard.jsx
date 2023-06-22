import { SafetyCertificateTwoTone } from '@ant-design/icons';
import FeatureDescription from '../common/FeatureDescription';
import { Divider } from 'antd';

const LandingCard = () => {
    return (
        <div className="w-full text-left px-12 py-6 bg-white rounded-lg border-solid border border-gray-200 text-gray-700">
            <a href="#" className="flex pt-8 items-center w-fit">
                <img alt="Shopping cart icon" className="mr-4 block flex-shrink-0" width="40px" src="shop-logo.png" />
                <h4 className="m-0 mb-2 text-2xl font-semibold leading-6">Shop</h4>
            </a>
            <FeatureDescription title={'Tus productos favoritos'} description={'Encuentra los productos que te gustan por nombre, o filtralos por categoria.'} />
            <FeatureDescription title={'Añadelos a tu carrito'} description={'Añade tus productos favoritos al carrito y revisa los impuestos de cada uno.'} />
            <FeatureDescription title={'Analiza tus ordenes'} description={'Haz seguimiento de tus ordenes realizadas por estado y fecha de creación.'} />
            <Divider className="mb-1" />
            <FeatureDescription title={'Credenciales con almacenamiento encriptado'} icon={<SafetyCertificateTwoTone className="flex-shrink-0 mr-4 text-xl block" twoToneColor={'#52c41a'} />} />
        </div>
    );
};

export default LandingCard;
