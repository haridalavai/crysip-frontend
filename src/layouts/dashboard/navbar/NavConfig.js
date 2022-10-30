// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// components
import Label from "../../../components/Label";
import SvgIconStyle from "../../../components/SvgIconStyle";

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon("ic_blog"),
  cart: getIcon("ic_cart"),
  chat: getIcon("ic_chat"),
  mail: getIcon("ic_mail"),
  user: getIcon("ic_user"),
  kanban: getIcon("ic_kanban"),
  banking: getIcon("ic_banking"),
  booking: getIcon("ic_booking"),
  invoice: getIcon("ic_invoice"),
  calendar: getIcon("ic_calendar"),
  ecommerce: getIcon("ic_ecommerce"),
  analytics: getIcon("ic_analytics"),
  dashboard: getIcon("ic_dashboard"),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    items: [
      { title: "Dashboard", path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      { title: "Crypots", path: PATH_DASHBOARD.general.crypots, icon: ICONS.ecommerce },
      { title: "Swap", path: PATH_DASHBOARD.general.swap, icon: ICONS.banking },
      { title: "Tracker", path: PATH_DASHBOARD.general.tracker, icon: ICONS.analytics },
      { title: "Tax", path: PATH_DASHBOARD.general.tax, icon: ICONS.invoice },
    ],
  },
];

export default navConfig;
