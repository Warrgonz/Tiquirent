import Phone from "../common/Phone";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="bg-dark flex-wrap d-flex justify-content-center align-items-center">
      <ul className="d-flex justify-content-center align-items-center p-3 m-0">
        <li>
          <Phone className="px-3" />
          <a href="tel:+1-855-861-1250">
            <span>US {t("header.freeCall")}: +1-855-861-1250</span>
          </a>
        </li>
        <li className="mx-3 text-light">|</li>
        <li>
          <Phone className="px-2" />
          <a href="tel:+506-72924188">
            <span>Costa Rica: +506 72924188</span>
          </a>
        </li>
      </ul>
    </header>
  );
};

export default Header;
