import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ disabledLink = false, sx }) {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;

  const logo = (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      {/* <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 512 512">
        <defs>
          <linearGradient id="BG1" x1="100%" x2="50%" y1="9.946%" y2="50%">
            <stop offset="0%" stopColor={PRIMARY_DARK} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id="BG2" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id="BG3" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
        </defs>
        <g fill={PRIMARY_MAIN} fillRule="evenodd" stroke="none" strokeWidth="1">
          <path
            fill="url(#BG1)"
            d="M183.168 285.573l-2.918 5.298-2.973 5.363-2.846 5.095-2.274 4.043-2.186 3.857-2.506 4.383-1.6 2.774-2.294 3.939-1.099 1.869-1.416 2.388-1.025 1.713-1.317 2.18-.95 1.558-1.514 2.447-.866 1.38-.833 1.312-.802 1.246-.77 1.18-.739 1.111-.935 1.38-.664.956-.425.6-.41.572-.59.8-.376.497-.537.69-.171.214c-10.76 13.37-22.496 23.493-36.93 29.334-30.346 14.262-68.07 14.929-97.202-2.704l72.347-124.682 2.8-1.72c49.257-29.326 73.08 1.117 94.02 40.927z"
          />
          <path
            fill="url(#BG2)"
            d="M444.31 229.726c-46.27-80.956-94.1-157.228-149.043-45.344-7.516 14.384-12.995 42.337-25.267 42.337v-.142c-12.272 0-17.75-27.953-25.265-42.337C189.79 72.356 141.96 148.628 95.69 229.584c-3.483 6.106-6.828 11.932-9.69 16.996 106.038-67.127 97.11 135.667 184 137.278V384c86.891-1.611 77.962-204.405 184-137.28-2.86-5.062-6.206-10.888-9.69-16.994"
          />
          <path
            fill="url(#BG3)"
            d="M450 384c26.509 0 48-21.491 48-48s-21.491-48-48-48-48 21.491-48 48 21.491 48 48 48"
          />
        </g>
      </svg> */}
      <svg width="100%" height="100%" viewBox="0 0 326 371" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M139.756 43H296.357L324.762 0H117.289V8.98921L139.756 43Z" fill="url(#paint0_linear_34_10)" />
        <path
          d="M48.0194 170.106L121.211 59.1923L96.4709 18.7738L0.171339 164.705L6.35672 168.238L48.0194 170.106Z"
          fill="url(#paint1_linear_34_10)"
        />
        <path
          d="M142.659 327.524H299.643L325.376 370.524H120.506V364.541L142.659 327.524Z"
          fill="url(#paint2_linear_34_10)"
        />
        <path
          d="M47.0281 191.707L120.897 313.541L96.6999 356.566L0 197.076L5.36537 193.74L47.0281 191.707Z"
          fill="url(#paint3_linear_34_10)"
        />
        <defs>
          <linearGradient id="paint0_linear_34_10" x1="311" y1="10" x2="90" y2="359.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4CE2EC" />
            <stop offset="0.651042" stopColor="#843DB2" />
            <stop offset="1" stopColor="#853DB3" />
          </linearGradient>
          <linearGradient id="paint1_linear_34_10" x1="311" y1="10" x2="90" y2="359.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4CE2EC" />
            <stop offset="0.651042" stopColor="#843DB2" />
            <stop offset="1" stopColor="#853DB3" />
          </linearGradient>
          <linearGradient id="paint2_linear_34_10" x1="311" y1="10" x2="90" y2="359.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4CE2EC" />
            <stop offset="0.651042" stopColor="#843DB2" />
            <stop offset="1" stopColor="#853DB3" />
          </linearGradient>
          <linearGradient id="paint3_linear_34_10" x1="311" y1="10" x2="90" y2="359.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4CE2EC" />
            <stop offset="0.651042" stopColor="#843DB2" />
            <stop offset="1" stopColor="#853DB3" />
          </linearGradient>
        </defs>
      </svg>
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
