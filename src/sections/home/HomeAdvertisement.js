import { m } from "framer-motion";
// @mui
import { styled } from "@mui/material/styles";
import { Button, Box, Container, Typography, TextField } from "@mui/material";
// components
import Image from "../../components/Image";
import { MotionViewport, varFade } from "../../components/animate";

// ----------------------------------------------------------------------

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 456,
  margin: "auto",
  overflow: "hidden",
  paddingBottom: theme.spacing(10),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  backgroundImage: `linear-gradient(135deg,
    ${theme.palette.primary.main} 0%,
    ${theme.palette.primary.dark} 100%)`,
  [theme.breakpoints.up("md")]: {
    display: "flex",
    maxWidth: "100%",
    paddingBottom: 0,
    alignItems: "center",
  },
}));

// ----------------------------------------------------------------------

export default function HomeAdvertisement() {
  return (
    <Container component={MotionViewport}>
      <ContentStyle>
        <Box
          component={m.div}
          variants={varFade().inUp}
          sx={{
            mb: { xs: 3, md: 0 },
          }}
        >
          <m.div animate={{ y: [-20, 0, -20] }} transition={{ duration: 4, repeat: Infinity }}>
            <Image
              visibleByDefault
              alt="rocket"
              src="https://minimal-assets-api.vercel.app/assets/images/home/rocket.png"
              disabledEffect
              sx={{ maxWidth: 460 }}
            />
          </m.div>
        </Box>

        <Box
          sx={{
            pl: { md: 10 },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Box component={m.div} variants={varFade().inDown} sx={{ color: "common.white", mb: 5 }}>
            <Typography variant="h3">
              Drop your Email and we will
              <br />
              let you know when we are live!
            </Typography>
          </Box>
          <m.div variants={varFade().inDown}>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-start" },
                alignItems: "center",
                mb: 5,
              }}
            >
              <TextField
                label="Email"
                variant="outlined"
                size="medium"
                sx={{
                  marginRight: 2,
                  color: "common.white",
                  borderColor: "common.white",
                }}
                InputLabelProps={{
                  style: {
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    width: "100%",
                    color: "white",
                  },
                }}
              />
              <Button
                size="large"
                variant="contained"
                target="_blank"
                rel="noopener"
                sx={{
                  whiteSpace: "nowrap",
                  boxShadow: (theme) => theme.customShadows.z8,
                  color: (theme) => theme.palette.getContrastText(theme.palette.common.white),
                  bgcolor: "common.white",
                  "&:hover": { bgcolor: "grey.300" },
                }}
              >
                Subscribe
              </Button>
            </Box>
          </m.div>
        </Box>
      </ContentStyle>
    </Container>
  );
}
