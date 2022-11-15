import React from "react";
// @mui
import { styled } from "@mui/material/styles";
import { Card, Divider } from "@mui/material";
// components
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import Page from "../components/Page";

import "react-vertical-timeline-component/style.min.css";

const RootStyle = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up("md")]: {
    paddingTop: theme.spacing(11),
  },
}));

const RoadMap = () => {
  const a = 10;
  return (
    <Page title="About us">
      <RootStyle>
        <VerticalTimeline>
          <VerticalTimelineElement
            // className="vertical-timeline-element--work"
            contentStyle={{
              // background: "rgb(33, 150, 243)",
              // color: "#fff",
              padding: "0px 0px 0px 0px",
              borderRadius: "20px",
              border: "none",
              boxShadow: " 2px 2px 2px 2px rgba(0, 0, 0, 0.2)",
            }}
            // contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
            date="Q4-2022"
            // iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          >
            <Card
              sx={{
                padding: 2,
              }}
            >
              <p>
                1. Brainstorming and Ideation.
                <br /> 2. Crypot smart contracts on BSC testnet (POC).
                <br /> 3. Front end application for users to invest in Crypot.
              </p>
            </Card>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            // className="vertical-timeline-element--work"
            contentStyle={{
              // background: "rgb(33, 150, 243)",
              // color: "#fff",
              padding: "0px 0px 0px 0px",
              borderRadius: "20px",
              border: "none",
              boxShadow: " 2px 2px 2px 2px rgba(0, 0, 0, 0.2)",
            }}
            // contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
            date="Q1-2023"
            // iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          >
            <Card
              sx={{
                padding: 2,
              }}
            >
              <p>1. Investment workshop, certification courses and crypto trading tips to build community.</p>
            </Card>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            // className="vertical-timeline-element--work"
            contentStyle={{
              // background: "rgb(33, 150, 243)",
              // color: "#fff",
              padding: "0px 0px 0px 0px",
              borderRadius: "20px",
              border: "none",
              boxShadow: " 2px 2px 2px 2px rgba(0, 0, 0, 0.2)",
            }}
            // contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
            date="Q2-2023"
            // iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          >
            <Card
              sx={{
                padding: 2,
              }}
            >
              <p>
                1. Mainnet Beta launch on BSC, Matic and Etherium chain.
                <br />
                2. P/L and Notification Engine.
                <br /> 3. Public Sale and TGE (based on market conditions).
              </p>
            </Card>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            // className="vertical-timeline-element--work"
            contentStyle={{
              // background: "rgb(33, 150, 243)",
              // color: "#fff",
              padding: "0px 0px 0px 0px",
              borderRadius: "20px",
              border: "none",
              boxShadow: " 2px 2px 2px 2px rgba(0, 0, 0, 0.2)",
            }}
            // contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
            date="Q3-2023"
            // iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          >
            <Card
              sx={{
                padding: 2,
              }}
            >
              <p>
                1. Crypot Launch on BSC, Matic and Ethereum chains.
                <br /> 2. Tax Estimation Feature according to govt Norms.
                <br /> 3. Integrate with Lending and staking Platfrom.
              </p>
            </Card>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            // className="vertical-timeline-element--work"
            contentStyle={{
              // background: "rgb(33, 150, 243)",
              // color: "#fff",
              padding: "0px 0px 0px 0px",
              borderRadius: "20px",
              border: "none",
              boxShadow: " 2px 2px 2px 2px rgba(0, 0, 0, 0.2)",
            }}
            // contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
            date="Q4-2023"
            // iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          >
            <Card
              sx={{
                padding: 2,
              }}
            >
              <p>
                1. Support other Chains including Non-EVM.
                <br /> 2. Add Support for ETFs.
                <br /> 3. Inhouse LP Pool.
              </p>
            </Card>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </RootStyle>
    </Page>
  );
};

export default RoadMap;
