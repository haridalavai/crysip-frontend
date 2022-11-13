import { m } from "framer-motion";
// @mui
import { styled } from "@mui/material/styles";
import { Box, Grid, Container, Typography, Button } from "@mui/material";
// components
import Image from "../../components/Image";
import { MotionViewport, varFade } from "../../components/animate";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  padding: theme.spacing(10, 0),
  marginBottom: theme.spacing(10),
  backgroundColor: theme.palette.grey[900],
}));

const ContentStyle = styled("div")(({ theme }) => ({
  textAlign: "center",
  position: "relative",
  marginTop: theme.spacing(10),
  [theme.breakpoints.up("md")]: {
    height: "100%",
    marginBottom: 10,
    textAlign: "left",
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
}));

// ----------------------------------------------------------------------

export default function HomeDarkMode() {
  return (
    <RootStyle>
      <Container component={MotionViewport} sx={{ position: "relative" }}>
        <Image
          visibleByDefault
          disabledEffect
          alt="image shape"
          src="https://minimal-assets-api.vercel.app/assets/images/home/shape.svg"
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            width: 720,
            height: 720,
            opacity: 0.48,
            my: "auto",
            position: "absolute",
            display: { xs: "none", md: "block" },
          }}
        />

        <Grid container spacing={5} direction="row" justifyContent="space-between">
          <Grid item xs={12} md={4}>
            <ContentStyle>
              <m.div variants={varFade().inUp}>
                <Typography component="div" variant="overline" sx={{ mb: 2, color: "text.disabled" }}>
                  Easy Token Swap
                </Typography>
              </m.div>

              <m.div variants={varFade().inUp}>
                <Typography variant="h2" sx={{ mb: 3, color: "common.white" }}>
                  Multi-Token Swap
                </Typography>
              </m.div>

              <m.div variants={varFade().inUp}>
                <Typography sx={{ color: "common.white", mb: 5 }}>
                  Swap multiple tokens at once with a single transaction.
                </Typography>
              </m.div>
              <m.div variants={varFade().inUp}>
                <Button variant="contained" color="primary" href="/dashboard/swap">
                  Try Now
                </Button>
              </m.div>
            </ContentStyle>
          </Grid>
          <Grid item xs={12} md={7} sx={{ position: "relative" }}>
            <m.div variants={varFade().inUp}>
              <Image
                sx={{
                  backgroundColor: "common.white",
                  padding: 4,
                  borderRadius: 2,
                  border: (theme) => `solid 4px ${theme.palette.padding}`,
                }}
                alt="light mode"
                src="/multi_token_swap_flow.png"
              />
            </m.div>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
