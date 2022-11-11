// routes
import { PATH_AUTH, PATH_DOCS, PATH_PAGE } from "../../routes/paths";
// components
import { PATH_AFTER_LOGIN } from "../../config";
// components
import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
};

const menuConfig = [
  {
    title: "Home",
    icon: <Iconify icon={"eva:home-fill"} {...ICON_SIZE} />,
    path: "/",
  },
  {
    title: "About",
    icon: <Iconify icon={"eva:home-fill"} {...ICON_SIZE} />,
    path: PATH_PAGE.about,
  },
  {
    title: "Contact",
    icon: <Iconify icon={"eva:home-fill"} {...ICON_SIZE} />,
    path: PATH_PAGE.contact,
  },
  {
    title: "Docs",
    icon: <Iconify icon={"eva:book-open-fill"} {...ICON_SIZE} />,
    path: PATH_PAGE.comingSoon,
  },
  {
    title: "Roadmap",
    icon: <Iconify icon={"eva:book-open-fill"} {...ICON_SIZE} />,
    path: PATH_PAGE.roadmap,
  },
];

export default menuConfig;
