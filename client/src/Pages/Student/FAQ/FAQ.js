import React, { useState, useEffect } from "react";
import NavigationBar from "../../../components/NavBar/NavBar";
import "./style.css";
import { Tab, Tabs, Typography, Box } from "@mui/material";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { MdExpandMore } from "react-icons/md";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import faqList from "../../../mock data/MOCK_DATA.json";
import TextField from "@mui/material/TextField";
import Axios from "axios";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      className="panel-div"
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const StyledTab = styled(Tab)(({ theme }) => ({
  minWidth: "15rem",
  "&.Mui-selected": {
    color: "#257F2F",
    fontWeight: theme.typography.fontWeightBold,
  },
  "&.Mui-focusVisible": {
    backgroundColor: "#D1FFE6",
  },
}));

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: "#257F2F",
  },
});

const StyledTabMobile = styled(Tab)(({ theme }) => ({
  "&.Mui-selected": {
    color: "#257F2F",
    fontWeight: theme.typography.fontWeightBold,
  },
  "&.Mui-focusVisible": {
    backgroundColor: "#D1FFE6",
  },
}));

const StyledTabsMobile = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: "#257F2F",
  },
});

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

function FAQ({ authorized }) {
  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get("http://localhost:3001/auth/login")
      .then((response) => {})
      .catch((error) => {
        console.log(error.response);
        if (
          error.response.data.error ===
          "User is not authenticated!\nPlease log in."
        ) {
          console.log("logged out.");
          localStorage.setItem("userState", false);
          alert("You have been logged out. Please refresh and log in again.");
        }
      });
    getFAQ();
  }, []);

  const [value, setValue] = React.useState(0);
  const [expanded, setExpanded] = React.useState("panel1");
  const [searchTerm, setSearchTerm] = useState("");
  // const faqList = [{}];

  // handle search

  const [faqList, setFaqList] = useState([]);
  const username = localStorage.getItem("username");
  const account_id = localStorage.getItem("userId");

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAccordionChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const getFAQ = () => {
    Axios.get("http://localhost:3001/faq")
      .then((res) => {
        setFaqList(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (authorized === false) {
    console.log(authorized);
    return <Redirect to="/" />;
  }
  console.log(faqList);
  return (
    <>
      <div>
        <NavigationBar />
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
            display: { xs: "none", md: "flex" },
            height: 260,
            marginTop: "25px",
            justifyContent: "center",
          }}
        >
          <StyledTabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleTabChange}
            aria-label="Vertical tabs"
            sx={{
              borderRight: 1,
              borderColor: "divider",
              minWidth: "15rem",
              marginTop: "7rem",
            }}
          >
            <StyledTab label="General" {...a11yProps(0)} />
            <StyledTab label="Uploading Documents" {...a11yProps(1)} />
            <StyledTab label="Placement Supervisor" {...a11yProps(2)} />
          </StyledTabs>
          <div>
            <div className="faq-header">
              <p>Frequently Asked Questions</p>
              <TextField
                id="filled-search"
                label="Search..."
                type="search"
                variant="filled"
                style={{
                  marginLeft: "auto",
                  marginRight: "20px",
                  fontSize: "14px",
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <TabPanel value={value} index={0}>
                {faqList
                  .filter((val) => {
                    if (searchTerm == "") {
                      return val;
                    } else if (
                      val.questions
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      val.answers
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .map((val, key) => {
                    //faqList must be sorted in the backend
                    while (val.cat === "0") {
                      return (
                        <Accordion
                          key={key}
                          expanded={expanded === val.faq_id}
                          onChange={handleAccordionChange(val.faq_id)}
                        >
                          <AccordionSummary
                            aria-controls={val.faq_id + "-content"}
                            id={val.faq_id + "-header"}
                          >
                            <Typography>{val.questions}</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>{val.answers}</Typography>
                          </AccordionDetails>
                        </Accordion>
                      );
                    }
                  })}
              </TabPanel>
              <TabPanel value={value} index={1}>
                {faqList
                  .filter((val) => {
                    if (searchTerm == "") {
                      return val;
                    } else if (
                      val.questions
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      val.answers
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .map((val, key) => {
                    //faqList must be sorted in the backend
                    while (val.cat === "1") {
                      return (
                        <Accordion
                          key={key}
                          expanded={expanded === val.faq_id}
                          onChange={handleAccordionChange(val.faq_id)}
                        >
                          <AccordionSummary
                            aria-controls={val.faq_id + "-content"}
                            id={val.faq_id + "-header"}
                          >
                            <Typography>{val.questions}</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>{val.answers}</Typography>
                          </AccordionDetails>
                        </Accordion>
                      );
                    }
                  })}
              </TabPanel>
              <TabPanel value={value} index={2}>
                {faqList
                  .filter((val) => {
                    if (searchTerm == "") {
                      return val;
                    } else if (
                      val.questions
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      val.answers
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .map((val, key) => {
                    //faqList must be sorted in the backend
                    while (val.cat === "2") {
                      return (
                        <Accordion
                          key={key}
                          expanded={expanded === val.faq_id}
                          onChange={handleAccordionChange(val.faq_id)}
                        >
                          <AccordionSummary
                            aria-controls={val.faq_id + "-content"}
                            id={val.faq_id + "-header"}
                          >
                            <Typography>{val.questions}</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>{val.answers}</Typography>
                          </AccordionDetails>
                        </Accordion>
                      );
                    }
                  })}
              </TabPanel>
            </div>
          </div>
        </Box>
        <Box
          sx={{
            flexGrow: 0,
            bgcolor: "background.paper",
            display: { xs: "flex", md: "none" },
            height: 260,
            marginTop: "25px",
            width: "100%",
          }}
        >
          <div className="mobile-container">
            <div className="faq-header-mobile">
              <p>Frequently Asked Questions</p>
              <TextField
                id="filled-search"
                label="Search..."
                type="search"
                variant="filled"
                style={{
                  marginLeft: "auto",
                  marginRight: "20px",
                  fontSize: "14px",
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <StyledTabsMobile value={value} onChange={handleTabChange} centered>
              <StyledTabMobile label="General" {...a11yProps(0)} />
              <StyledTabMobile label="Uploading Documents" {...a11yProps(1)} />
              <StyledTabMobile label="Placement Supervisor" {...a11yProps(2)} />
            </StyledTabsMobile>
            <div>
              <TabPanel value={value} index={0}>
                {faqList
                  .filter((val) => {
                    if (searchTerm == "") {
                      return val;
                    } else if (
                      val.questions
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      val.answers
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .map((val, key) => {
                    //faqList must be sorted in the backend
                    while (val.cat === "0") {
                      return (
                        <Accordion
                          key={key}
                          expanded={expanded === val.faq_id}
                          onChange={handleAccordionChange(val.faq_id)}
                        >
                          <AccordionSummary
                            aria-controls={val.faq_id + "-content"}
                            id={val.faq_id + "-header"}
                          >
                            <Typography>{val.questions}</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>{val.answers}</Typography>
                          </AccordionDetails>
                        </Accordion>
                      );
                    }
                  })}
              </TabPanel>
              <TabPanel value={value} index={1}>
                {faqList
                  .filter((val) => {
                    if (searchTerm == "") {
                      return val;
                    } else if (
                      val.questions
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      val.answers
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .map((val, key) => {
                    //faqList must be sorted in the backend
                    while (val.cat === "1") {
                      return (
                        <Accordion
                          key={key}
                          expanded={expanded === val.faq_id}
                          onChange={handleAccordionChange(val.faq_id)}
                        >
                          <AccordionSummary
                            aria-controls={val.faq_id + "-content"}
                            id={val.faq_id + "-header"}
                          >
                            <Typography>{val.questions}</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>{val.answers}</Typography>
                          </AccordionDetails>
                        </Accordion>
                      );
                    }
                  })}
              </TabPanel>
              <TabPanel value={value} index={2}>
                {faqList
                  .filter((val) => {
                    if (searchTerm == "") {
                      return val;
                    } else if (
                      val.questions
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      val.answers
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .map((val, key) => {
                    //faqList must be sorted in the backend
                    while (val.cat === "2") {
                      return (
                        <Accordion
                          key={key}
                          expanded={expanded === val.faq_id}
                          onChange={handleAccordionChange(val.faq_id)}
                        >
                          <AccordionSummary
                            aria-controls={val.faq_id + "-content"}
                            id={val.faq_id + "-header"}
                          >
                            <Typography>{val.questions}</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>{val.answers}</Typography>
                          </AccordionDetails>
                        </Accordion>
                      );
                    }
                  })}
              </TabPanel>
            </div>
          </div>
        </Box>
      </div>
    </>
  );
}

export default FAQ;
