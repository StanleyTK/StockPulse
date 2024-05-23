import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Option from './Options';
const NotificationButton = ({ icon, header, context, link }) => {
  return (
    <Option
      icon={icon}
      header={header}
      context={context}
      link={link}
    />
  );
};

export default NotificationButton;
