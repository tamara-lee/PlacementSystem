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
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import TextField from "@mui/material/TextField";
import Axios from "axios";

// for pop-ups
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// for edit menu
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import IconButton from "@mui/material/IconButton";
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

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

function FAQ({ authorized, access }) {
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
  const [openSubmitConfirmation, setOpenSubmitConfirmation] = useState(false);
  const [openSubmitSuccess, setOpenSubmitSuccess] = useState(false); // successfully submit faq
  const [openSubmitFail, setOpenSubmitFail] = useState(false); // failed to submit aq
  const [openSubmitError, setOpenSubmitError] = useState(false); // empty fields in faq

  const [deleteFaqId, setDeleteFaqId] = useState(null);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [openDeleteSuccess, setOpenDeleteSuccess] = useState(false);
  const [openDeleteFail, setOpenDeleteFail] = useState(false);

  const [submitSuccessMsg, setSubmitSuccessMsg] = useState("");
  const [submitFailMsg, setSubmitFailMsg] = useState("");

  const [deleteSuccessMsg, setDeleteSuccessMsg] = useState("");
  const [deleteFailMsg, setDeleteFailMsg] = useState("");

  // edit faq pop-up
  const [openEditFaq, setOpenEditFaq] = useState(false);
  const [openEditConfirmation, setOpenEditConfirmation] = useState(false);
  const [openEditError, setOpenEditError] = useState(false); // field(s) cannot be empty
  const [openEditSuccess, setOpenEditSuccess] = useState(false);
  const [openEditFail, setOpenEditFail] = useState(false);

  const [editSuccessMsg, setEditSuccessMsg] = useState("");
  const [editFailMsg, setEditFailMsg] = useState("");

  const [editQuestion, setEditQuestion] = useState(null);
  const [editAnswer, setEditAnswer] = useState(null);
  const [editCat, setEditCat] = useState(undefined);
  const [editFaqId, setEditFaqId] = useState(null);

  // pop-up handlers
  const handleCloseSubmitConfirmation = () => {
    setOpenSubmitConfirmation(false);
  };

  const handleCloseSubmitError = () => {
    setOpenSubmitError(false);
  };

  const handleCloseSubmitSuccess = () => {
    setOpenSubmitSuccess(false);
  };

  const handleCloseSubmitFail = () => {
    setOpenSubmitFail(false);
  };

  const handleCloseDeleteConfirmation = () => {
    setOpenDeleteConfirmation(false);
  };

  const handleCloseDeleteSuccess = () => {
    setOpenDeleteSuccess(false);
  };

  const handleCloseDeleteFail = () => {
    setOpenDeleteFail(false);
  };

  const handleCloseEditFaq = () => {
    // make sure when closed, the edited fields will be reset
    setOpenEditFaq(false);
  };

  const handleCloseEditConfirmation = () => {
    setOpenEditConfirmation(false);
  };

  const handleCloseEditError = () => {
    setOpenEditError(false);
  };

  const handleCloseEditSuccess = () => {
    setOpenEditSuccess(false);
  };

  const handleCloseEditFail = () => {
    setOpenEditFail(false);
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAccordionChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const IsolatedMenu = (val) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const handleClickMenu = (e, val) => {
      e.stopPropagation();
      console.log("clickmenu: " + val);
      setAnchorEl(e.currentTarget);
    };
    const handleCloseMenu = (e, val) => {
      e.stopPropagation();
      console.log("close menu: " + val);
      setAnchorEl(null);
    };

    const handleDelete = (e, val) => {
      e.stopPropagation();
      setAnchorEl(null);

      setDeleteFaqId(val);
      setOpenDeleteConfirmation(true);
    };

    const handleEdit = (e, val) => {
      e.stopPropagation();
      setAnchorEl(null);

      const editFaq = faqList.filter(function (element) {
        return element.faq_id === val;
      })[0];

      setEditFaqId(parseInt(editFaq.faq_id));
      setEditQuestion(editFaq.questions);
      setEditAnswer(editFaq.answers);
      setEditCat(editFaq.cat);

      setOpenEditFaq(true);
    };

    return (
      <React.Fragment>
        <IconButton
          aria-label={val.faq_id + "more"}
          id={val.faq_id + "-more-button"}
          aria-controls={openMenu ? val.faq_id + "-more-menu" : undefined}
          aria-expanded={openMenu ? "true" : undefined}
          aria-haspopup="true"
          onClick={(e) => handleClickMenu(e, val.faq_id)}
          sx={{
            height: "1.5rem",
            marginLeft: "auto",
            marginRight: "0px",
          }}
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
        <StyledMenu
          key={val.faq_id}
          id={val.faq_id + "-more-menu"}
          MenuListProps={{
            "aria-labelledby": val.faq_id + "-more-menu-button",
          }}
          anchorEl={anchorEl}
          open={openMenu}
          onClose={(e) => handleCloseMenu(e, val.faq_id)}
        >
          <MenuItem onClick={(e) => handleEdit(e, val.faq_id)} disableRipple>
            <EditIcon />
            Edit
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              handleDelete(e, val.faq_id);
            }}
            disableRipple
          >
            <DeleteIcon />
            Delete
          </MenuItem>
        </StyledMenu>
      </React.Fragment>
    );
  };

  const confirmHandleDeleteFaq = () => {
    handleCloseDeleteConfirmation();

    Axios.delete("http://localhost:3001/faq/admin", {
      data: { faq_id: deleteFaqId },
    })
      .then((res) => {
        setDeleteSuccessMsg(res.data.message);
        setOpenDeleteSuccess(true);
        getFAQ();
      })
      .catch((error) => {
        setDeleteFailMsg(error.response.data.message);
        setOpenDeleteFail(true);
      });
  };

  const handleEditFaq = () => {
    if (!editQuestion && !editAnswer && !editCat) {
      setOpenEditError(true);
    } else {
      setOpenEditConfirmation(true);
    }
  };

  const confirmHandleEditFaq = () => {
    handleCloseEditConfirmation();

    Axios.put("http://localhost:3001/faq/admin", {
      username: username,
      faq_id: editFaqId,
      questions: editQuestion,
      answers: editAnswer,
      cat: editCat,
    })
      .then((res) => {
        setEditSuccessMsg(res.data.message);
        setOpenEditFaq(false);
        setOpenEditSuccess(true);
        getFAQ();
      })
      .catch((error) => {
        setEditFailMsg(error.response.data.message);
        setOpenEditFail(true);
      });
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

  const submitFAQ = () => {
    if (newQuestion && newAnswer && newCat) {
      setOpenSubmitConfirmation(true);
    } else {
      setOpenSubmitError(true);
    }
  };

  const confirmSubmitFAQ = () => {
    handleCloseSubmitConfirmation();

    Axios.post("http://localhost:3001/faq/admin", {
      username: username,
      questions: newQuestion,
      answers: newAnswer,
      cat: newCat,
    })
      .then((res) => {
        setSubmitSuccessMsg(res.data.message);
        setOpenSubmitSuccess(true);
        setNewQuestion(null);
        setNewAnswer(null);
        setNewCat("0");
        setShow(false);
        getFAQ();
      })
      .catch((error) => {
        setSubmitFailMsg(error.response.data.message);
        setOpenSubmitFail(true);
      });
  };

  if (authorized === false) {
    console.log(authorized);
    return <Redirect to="/" />;
  }

  if (access !== "0000000000") {
    console.log(authorized);
    return <Redirect to="/student/mainpage" />;
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
            {/* information about students; arrangment requirements... */}
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
                            <IsolatedMenu faq_id={val.faq_id} />
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
                            <IsolatedMenu faq_id={val.faq_id} />
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
                            <IsolatedMenu faq_id={val.faq_id} />
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
                  marginRight: "auto",
                  fontSize: "14px",
                  marginTop: "10px",
                  marginBottom: "auto",
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
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
                        <option value="0">General</option>
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
                            <IsolatedMenu faq_id={val.faq_id} />
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
                            <IsolatedMenu faq_id={val.faq_id} />
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
                            <IsolatedMenu faq_id={val.faq_id} />
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
          open={openSubmitConfirmation}
          onClose={handleCloseSubmitConfirmation}
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
            <Button type="button" onClick={handleCloseSubmitConfirmation}>
              No
            </Button>
            <Button type="button" onClick={confirmSubmitFAQ} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openSubmitError}
          onClose={handleCloseSubmitError}
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
            <Button type="button" onClick={handleCloseSubmitError} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openSubmitSuccess}
          onClose={handleCloseSubmitSuccess}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{submitSuccessMsg}</DialogTitle>
          <DialogActions>
            <Button type="button" onClick={handleCloseSubmitSuccess} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openSubmitFail}
          onClose={handleCloseSubmitFail}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{submitFailMsg}</DialogTitle>
          <DialogActions>
            <Button type="button" onClick={handleCloseSubmitFail} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openDeleteConfirmation}
          onClose={handleCloseDeleteConfirmation}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This FAQ will be deleted after confirmation.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick={handleCloseDeleteConfirmation}>
              No
            </Button>
            <Button type="button" onClick={confirmHandleDeleteFaq} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openDeleteSuccess}
          onClose={handleCloseDeleteSuccess}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{deleteSuccessMsg}</DialogTitle>
          <DialogActions>
            <Button type="button" onClick={handleCloseDeleteSuccess} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openDeleteFail}
          onClose={handleCloseDeleteFail}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{deleteFailMsg}</DialogTitle>
          <DialogActions>
            <Button type="button" onClick={handleCloseDeleteFail} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openEditFaq}
          onClose={handleCloseEditFaq}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Edit FAQ</DialogTitle>
          <DialogContent sx={{ minWidth: "350px" }}>
            <div className="container">
              <label htmlFor="question">QUESTION</label>
              <textarea
                className="input"
                type="text"
                id="question"
                defaultValue={editQuestion}
                maxLength="200"
                onChange={(e) => {
                  setEditQuestion(e.target.value);
                }}
              />
              <label htmlFor="answer">ANSWER</label>
              <textarea
                className="input"
                type="text"
                id="answer"
                defaultValue={editAnswer}
                maxLength="200"
                onChange={(e) => {
                  setEditAnswer(e.target.value);
                }}
              />
              <label htmlFor="category">CATEGORY</label>
              <select
                className="input"
                type="text"
                id="category"
                value={editCat}
                onChange={(e) => {
                  setEditCat(e.target.value);
                }}
              >
                <option value="0">General</option>
                <option value="1">Uploading Documents</option>
                <option value="2">Placement Supervisor</option>
              </select>
            </div>
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick={handleCloseEditFaq} autoFocus>
              Cancel
            </Button>
            <Button type="button" onClick={handleEditFaq} autoFocus>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openEditConfirmation}
          onClose={handleCloseEditConfirmation}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This FAQ will be updated after submission.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick={handleCloseEditConfirmation}>
              No
            </Button>
            <Button type="button" onClick={confirmHandleEditFaq} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openEditError}
          onClose={handleCloseEditError}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            All fields must be completed!
          </DialogTitle>
          <DialogActions>
            <Button type="button" onClick={handleCloseEditError} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openEditSuccess}
          onClose={handleCloseEditSuccess}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{editSuccessMsg}</DialogTitle>
          <DialogActions>
            <Button type="button" onClick={handleCloseEditSuccess} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openEditFail}
          onClose={handleCloseEditFail}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{editFailMsg}</DialogTitle>
          <DialogActions>
            <Button type="button" onClick={handleCloseEditFail} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default FAQ;
