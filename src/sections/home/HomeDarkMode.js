import { m } from "framer-motion";
// @mui
import { styled } from "@mui/material/styles";
import { Box, Grid, Container, Typography, Button } from "@mui/material";
// components
import Image from "../../components/Image";
import { MotionViewport, varFade } from "../../components/animate";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  padding: theme.spacing(28, 0, 0, 0),
  backgroundColor: theme.palette.grey[900],
}));

const ContentStyle = styled("div")(({ theme }) => ({
  textAlign: "center",
  position: "relative",
  marginBottom: theme.spacing(10),
  [theme.breakpoints.up("md")]: {
    height: "100%",
    marginBottom: 0,
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
            right: 0,
            bottom: 0,
            width: 720,
            height: 720,
            opacity: 0.48,
            my: "auto",
            position: "absolute",
            display: { xs: "none", md: "block" },
          }}
        />

        <Grid container spacing={5} direction="row-reverse" justifyContent="space-between">
          <Grid item xs={12} md={4}>
            <ContentStyle>
              <m.div variants={varFade().inUp}>
                <Typography component="div" variant="overline" sx={{ mb: 2, color: "text.disabled" }}>
                  Easy investments
                </Typography>
              </m.div>

              <m.div variants={varFade().inUp}>
                <Typography variant="h2" sx={{ mb: 3, color: "common.white" }}>
                  Crypots
                </Typography>
              </m.div>

              <m.div variants={varFade().inUp}>
                <Typography sx={{ color: "common.white", mb: 5 }}>
                  Create your crypot or invest in existing ones. We make it easy for you to invest in.
                </Typography>
              </m.div>
              <m.div variants={varFade().inUp}>
                <Button variant="contained" color="primary" href="/dashboard/crypots">
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
                src="/crypots_flow.png"
              />
            </m.div>

            {/* <Box component={m.div} variants={varFade().inDown} sx={{ top: 0, left: 0, position: "absolute" }}>
              <Image alt="dark mode" src="https://minimal-assets-api.vercel.app/assets/images/home/darkmode.png" />
            </Box> */}
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
