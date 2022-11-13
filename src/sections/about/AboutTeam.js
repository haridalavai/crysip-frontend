import PropTypes from "prop-types";
import { m } from "framer-motion";
import { useRef } from "react";
import Slider from "react-slick";
// @mui
import { useTheme } from "@mui/material/styles";
import { Box, Stack, Card, Button, Container, Typography } from "@mui/material";
// _mock_
import { _carouselsMembers } from "../../_mock";
// components
import Image from "../../components/Image";
import Iconify from "../../components/Iconify";
import { CarouselArrows } from "../../components/carousel";
import SocialsButton from "../../components/SocialsButton";
import { MotionViewport, varFade } from "../../components/animate";

// ----------------------------------------------------------------------

export default function AboutTeam() {
  const carouselRef = useRef(null);

  const theme = useTheme();

  const settings = {
    arrows: false,
    slidesToShow: 4,
    centerMode: true,
    centerPadding: "0px",
    rtl: Boolean(theme.direction === "rtl"),
    responsive: [
      {
        breakpoint: 1279,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 959,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  const teamMembers = [
    {
      name: "Srihari D R",
      role: "Co-Founder & CTO",
      avatar: "/hari.png",
    },
    {
      name: "Srihari D R",
      role: "Co-Founder & CEO",
      avatar: "/santhosh.png",
    },
    {
      name: "Srihari D R",
      role: "Co-Founder & CPO",
      avatar: "/chinmai.png",
    },
  ];

  return (
    <Container>
      <Box sx={{ position: "relative" }}>
        {teamMembers.map((member) => (
          <Box key={member.id} component={m.div} variants={varFade().in} sx={{ px: 1.5, py: 10 }}>
            <MemberCard member={member} />
          </Box>
        ))}
      </Box>
    </Container>
  );
}

// ----------------------------------------------------------------------

MemberCard.propTypes = {
  member: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
  }),
};

function MemberCard({ member }) {
  const { name, role, avatar } = member;

  return (
    <Card key={name} sx={{ p: 1 }}>
      <Typography variant="subtitle1" sx={{ mt: 2, mb: 0.5 }}>
        {name}
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
        {role}
      </Typography>
      <Image alt={name} src={avatar} ratio="1/1" sx={{ borderRadius: 1.5 }} />
      <Stack alignItems="center" sx={{ mt: 2, mb: 1 }}>
        <SocialsButton sx={{ color: "action.active" }} />
      </Stack>
    </Card>
  );
}
