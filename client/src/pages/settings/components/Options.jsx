import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProtectedRoute from '../../../components/ProtectedRoute';

const Options = ({ icon, header, context, link, onClick, isToggle }) => {
  const IconComponent = (
    <FontAwesomeIcon icon={icon} className="text-white w-6 h-6" />
  );

  const ContentComponent = (
    <div className="flex-1 text-left ml-4">
      <h2 className="text-xl font-medium mb-1 text-white">{header}</h2>
      <p className="text-sm text-gray-300">{context}</p>
    </div>
  );

  const ContainerComponent = ({ children, onClick }) => (
    <div
      className="border p-4 rounded-lg shadow hover:bg-gray-700 transition duration-150 ease-in-out cursor-pointer flex items-center justify-between"
      onClick={onClick}
    >
      {children}
    </div>
  );

  if (isToggle) {
    return (
      <ProtectedRoute>

      
      <ContainerComponent onClick={onClick}>
        {IconComponent}
        {ContentComponent}
      </ContainerComponent>
      </ProtectedRoute>
    );
  } else {
    return (
      <ProtectedRoute>

      <Link href={link} passHref>
        
        <ContainerComponent>
          {IconComponent}
          {ContentComponent}
        </ContainerComponent>
      </Link>
      </ProtectedRoute>

    );
  }
};

export default Options;
