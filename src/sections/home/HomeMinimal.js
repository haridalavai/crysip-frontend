import { m } from "framer-motion";
// @mui
import { alpha, useTheme, styled } from "@mui/material/styles";
import { Box, Card, Container, Typography } from "@mui/material";
// components
import Image from "../../components/Image";
import { MotionViewport, varFade } from "../../components/animate";

// ----------------------------------------------------------------------

const CARDS = [
  {
    icon: "https://minimal-assets-api.vercel.app/assets/icons/ic_design.svg",
    title: "Multi-Token Swap",
    description:
      "Swap multiple Tokens in one go. Be it one-to-one, one-to-many, many-to-one or many-to-many we got you covered.",
  },
  {
    icon: "/logo/logo_single.svg",
    title: "Crypots",
    description: "Diversify your portfolio with crypots. A crypot is basket of carefully selected crypto assets.",
  },
  {
    icon: "/balance.svg",
    title: "Asset Rebalancing",
    description:
      "Basket owner has the flexibility to rebalance assets based on market conditions and the  subscriber of that basket gets an option to rebalance or keep the assets as it is. ",
  },
  {
    icon: "notification.svg",
    title: "Reports and Notifications",
    description:
      "Crypot sends periodic notifications directly to users wallet, based on profit/loss report generated. ",
  },
  {
    icon: "tax-paper.svg",
    title: "Tax Calculator",
    description: "Based on profits made, Crypot estimates tax to the users according to Government norms.",
  },
  {
    icon: "lending.svg",
    title: "Lending and Staking",
    description: "Crypot smartly suggests other Lending and Stacking platforms to users based on their assets.",
  },
];

const shadowIcon = (color) => `drop-shadow(2px 2px 2px ${alpha(color, 0.48)})`;

const RootStyle = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up("md")]: {
    paddingBottom: theme.spacing(15),
  },
}));

const CardStyle = styled(Card)(({ theme }) => {
  const shadowCard = (opacity) =>
    theme.palette.mode === "light"
      ? alpha(theme.palette.grey[500], opacity)
      : alpha(theme.palette.common.black, opacity);

  return {
    border: 0,
    maxWidth: 380,
    minHeight: 440,
    margin: "auto",
    textAlign: "center",
    padding: theme.spacing(10, 5, 0),
    boxShadow: theme.customShadows.z12,
    [theme.breakpoints.up("md")]: {
      boxShadow: "none",
      backgroundColor: theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    "&.cardLeft": {
      [theme.breakpoints.up("md")]: { marginTop: -40 },
    },
    "&.cardCenter": {
      [theme.breakpoints.up("md")]: {
        marginTop: -80,
        backgroundColor: theme.palette.background.paper,
        boxShadow: `-40px 40px 80px 0 ${shadowCard(0.4)}`,
        "&:before": {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          content: "''",
          margin: "auto",
          position: "absolute",
          width: "calc(100% - 40px)",
          height: "calc(100% - 40px)",
          borderRadius: Number(theme.shape.borderRadius) * 2,
          backgroundColor: theme.palette.background.paper,
          boxShadow: `-20px 20px 40px 0 ${shadowCard(0.12)}`,
        },
      },
    },
  };
});

// ----------------------------------------------------------------------

export default function HomeMinimal() {
  const theme = useTheme();

  const isLight = theme.palette.mode === "light";

  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 10, md: 25 },
          }}
        >
          <m.div variants={varFade().inUp}>
            <Typography component="div" variant="overline" sx={{ mb: 2, color: "text.disabled" }}>
              Crypot
            </Typography>
          </m.div>
          <m.div variants={varFade().inDown}>
            <Typography variant="h2">How Crypot helps you?</Typography>
          </m.div>
        </Box>

        <Box
          sx={{
            display: "grid",
            gap: { xs: 5, lg: 10 },
            gridTemplateColumns: { xs: "repeat(1, 1fr)", md: "repeat(3, 1fr)" },
          }}
        >
          {CARDS.map((card, index) => (
            <m.div variants={varFade().inUp} key={card.title}>
              <CardStyle>
                <Image
                  src={card.icon}
                  alt={card.title}
                  sx={{
                    mb: 10,
                    mx: "auto",
                    width: 40,
                    height: 40,
                    filter: (theme) => shadowIcon(theme.palette.primary.main),
                    ...(index === 0 && {
                      filter: (theme) => shadowIcon(theme.palette.info.main),
                    }),
                    ...(index === 1 && {
                      filter: (theme) => shadowIcon(theme.palette.error.main),
                    }),
                  }}
                />
                <Typography variant="h5" paragraph>
                  {card.title}
                </Typography>
                <Typography sx={{ color: isLight ? "text.secondary" : "common.white" }}>{card.description}</Typography>
              </CardStyle>
            </m.div>
          ))}
        </Box>
      </Container>
    </RootStyle>
  );
}
