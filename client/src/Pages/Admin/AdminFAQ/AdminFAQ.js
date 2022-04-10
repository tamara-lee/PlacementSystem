import React, { useState, useEffect } from "react";
import NavigationBar from "../../../components/NavBarAdmin/NavBarAdmin";
import "./style.css";
import { Tab, Tabs, Typography, Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { MdExpandMore } from "react-icons/md";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
// import faqList from "../../../mock data/MOCK_DATA.json";
import TextField from "@mui/material/TextField";
import Axios from "axios";

// for pop-ups
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// for edit popover
import Popover from "@mui/material/Popover";
import MoreVertIcon from "@mui/icons-material/MoreVert";

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

  const [value, setValue] = useState(0);
  const [expanded, setExpanded] = useState("panel1");
  const [searchTerm, setSearchTerm] = useState("");
  const [show, setShow] = useState(false);

  const [faqList, setFaqList] = useState([]);
  const username = localStorage.getItem("username");

  const [newQuestion, setNewQuestion] = useState(null);
  const [newAnswer, setNewAnswer] = useState(null);
  const [newCat, setNewCat] = useState("0");

  // pop-ups
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false); // successfully submit faq
  const [openFail, setOpenFail] = useState(false); // failed to submit aq
  const [openError, setOpenError] = useState(false); // empty fields in faq

  // pop-up handlers
  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  const handleCloseError = () => {
    setOpenError(false);
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  const handleCloseFail = () => {
    setOpenFail(false);
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAccordionChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  // for popover
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickPopover = (e) => {
    console.log(e.currentTarget);
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const popover_id = openPopover ? "simple-popover" : undefined;

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

  const submitFAQ = () => {
    if (newQuestion && newAnswer && newCat) {
      setOpenConfirmation(true);
    } else {
      setOpenError(true);
    }
  };

  const confirmSubmitFAQ = () => {
    handleCloseConfirmation();

    try {
      Axios.post("http://localhost:3001/faq/admin", {
        username: username,
        questions: newQuestion,
        answers: newAnswer,
        cat: newCat,
      })
        .then((res) => {
          setOpenSuccess(true);
          setNewQuestion(null);
          setNewAnswer(null);
          setNewCat("0");
          getFAQ();
        })
        .catch((error) => {
          // console.log(error.response);
        });
    } catch (error) {
      // handle error
      setOpenFail(true);
    }
  };

  if (authorized === false) {
    console.log(authorized);
    return <Redirect to="/" />;
  }

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
            <StyledTab label="Placement Documents" {...a11yProps(1)} />
            <StyledTab label="Placement Supervisor" {...a11yProps(2)} />
          </StyledTabs>
          <div>
            <div className="faq-header">
              <p>Frequently Asked Questions</p>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                style={{
                  marginLeft: "20px",
                  marginRight: "20px",
                  width: "170px",
                  height: "2.5rem",
                  backgroundColor: "#f2f2f2",
                  borderStyle: "none",
                  color: "#333333",
                  boxShadow: "1px 1px 1px rgba(34, 48, 15, 0.4)",
                  fontSize: "14px",
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
                onClick={() => setShow(!show)}
              >
                New Question
              </Button>
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
              {show ? (
                <Card
                  sx={{
                    minWidth: 275,
                    marginLeft: "20px",
                    marginRight: "20px",
                    paddingBottom: "8px",
                  }}
                >
                  <CardContent
                    sx={{
                      paddingBottom: "0px",
                    }}
                  >
                    <div className="container">
                      <label htmlFor="question">QUESTION</label>
                      <textarea
                        className="input"
                        type="text"
                        id="question"
                        // value="{supervisorName}"
                        placeholder="Enter question here..."
                        maxLength="200"
                        onChange={(e) => {
                          setNewQuestion(e.target.value);
                        }}
                      />
                      <label htmlFor="answer">ANSWER</label>
                      <textarea
                        className="input"
                        type="text"
                        id="answer"
                        // value="{supervisorName}"
                        placeholder="Enter answer here..."
                        maxLength="200"
                        onChange={(e) => {
                          setNewAnswer(e.target.value);
                        }}
                      />
                      <label htmlFor="category">CATEGORY</label>
                      <select
                        className="input"
                        type="text"
                        id="category"
                        onChange={(e) => {
                          setNewCat(e.target.value);
                        }}
                      >
                        <option value="0" default>
                          General
                        </option>
                        <option value="1">Uploading Documents</option>
                        <option value="2">Placement Supervisor</option>
                      </select>
                    </div>
                  </CardContent>
                  <CardActions>
                    <Button
                      type="submit"
                      style={{
                        width: "80px",
                        height: "2rem",
                        backgroundColor: "#257F2F",
                        borderStyle: "none",
                        color: "white",
                        marginLeft: "10px",
                        boxShadow: "1px 1px 1px rgba(34, 48, 15, 0.4)",
                        fontSize: "0.8rem",
                        "&:hover": {
                          color: "#257F2F",
                          borderColor: "#257F2F",
                        },
                        "&:active": {
                          color: "#257F2F",
                          borderColor: "#257F2F",
                        },
                      }}
                      onClick={submitFAQ}
                    >
                      Submit
                    </Button>
                  </CardActions>
                </Card>
              ) : null}
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
                    while (val.cat === "0") {
                      return (
                        <Accordion
                          key={key}
                          expanded={expanded === val.faq_id}
                          onChange={handleAccordionChange(val.faq_id)}
                          sx={{ width: "700px" }}
                        >
                          <AccordionSummary
                            aria-controls={val.faq_id + "-content"}
                            id={val.faq_id + "-header"}
                          >
                            <Typography>{val.questions}</Typography>
                            <Button
                              aria-describedby={popover_id + val.faq_id}
                              variant="contained"
                              onClick={(e) => {
                                // e.stopPropagation();
                                handleClickPopover();
                              }}
                            >
                              <MoreVertIcon />
                            </Button>
                            <Popover
                              id={popover_id + val.faq_id}
                              open={openPopover}
                              anchorEl={anchorEl}
                              onClose={handleClosePopover}
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                              }}
                            >
                              <Typography sx={{ p: 2 }}>
                                Edit, Delete
                              </Typography>
                            </Popover>
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
                    while (val.cat === "1") {
                      return (
                        <Accordion
                          key={key}
                          expanded={expanded === val.faq_id}
                          onChange={handleAccordionChange(val.faq_id)}
                          sx={{ width: "700px" }}
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
                    while (val.cat === "2") {
                      return (
                        <Accordion
                          key={key}
                          expanded={expanded === val.faq_id}
                          onChange={handleAccordionChange(val.faq_id)}
                          sx={{ width: "700px" }}
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
              <input
                type="text"
                className="search-bar-mobile"
                placeholder="Search..."
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
            </div>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              sx={{
                width: "auto",
                color: "black",
                borderColor: "black",
                "&:hover": {
                  color: "#257F2F",
                  borderColor: "#257F2F",
                },
                "&:active": {
                  color: "#257F2F",
                  borderColor: "#257F2F",
                },
              }}
              onClick={() => setShow(!show)}
            >
              New Question
            </Button>
            <div>
              {show ? (
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <div className="container">
                      <label htmlFor="question">QUESION</label>
                      <textarea
                        className="input"
                        type="text"
                        id="question"
                        // value="{supervisorName}"
                        placeholder="Enter question here..."
                        maxLength="200"
                        // onChange={(e) => {
                        //   setSupervisorName(e.target.value);
                        // }}
                      />
                      <label htmlFor="answer">ANSWER</label>
                      <textarea
                        className="input"
                        type="text"
                        id="answer"
                        // value="{supervisorName}"
                        placeholder="Enter answer here..."
                        maxLength="200"
                        // onChange={(e) => {
                        //   setSupervisorName(e.target.value);
                        // }}
                      />
                      <label htmlFor="category">CATEGORY</label>
                      <select
                        className="input"
                        type="text"
                        id="category"
                        // value="{supervisorName}"
                        // onChange={(e) => {
                        //   setSupervisorName(e.target.value);
                        // }}
                      >
                        <option value="0">General</option>
                        <option value="1">Uploading Documents</option>
                        <option value="2">Placement Supervisor</option>
                      </select>
                    </div>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={submitFAQ}>
                      Submit
                    </Button>
                  </CardActions>
                </Card>
              ) : null}
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
                    while (val.cat === 0) {
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
                    while (val.cat === 1) {
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
                    while (val.cat === 2) {
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
        <Dialog
          open={openConfirmation}
          onClose={handleCloseConfirmation}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This new FAQ will be added to this page after submitting.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick={handleCloseConfirmation}>
              No
            </Button>
            <Button type="button" onClick={confirmSubmitFAQ} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openError}
          onClose={handleCloseError}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"FAQ form is incomplete!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please ensure all fields are completed before submitting.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick={handleCloseError} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openSuccess}
          onClose={handleCloseSuccess}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Successfully submitted new FAQ!"}
          </DialogTitle>
          <DialogActions>
            <Button type="button" onClick={handleCloseSuccess} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openFail}
          onClose={handleCloseFail}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Failed to submit new FAQ!"}
          </DialogTitle>
          <DialogActions>
            <Button type="button" onClick={handleCloseFail} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default FAQ;
