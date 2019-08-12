import React, { useState, createRef, useEffect } from "react";
import styles from "../IdeaTable.module.scss";
import editIcon from "../assets/pen.png";
import deleteIcon from "../assets/bin.png";
import confirmIcon from "../assets/Confirm_V.png";
import cancelIcon from "../assets/Cancel_X.png";
import loadingIcon from "../assets/spinner.svg";

import { AuthHelpers } from "../../../helpers";
import Modal from "../../Modal";

import axiosInstance from "../../../Services/axiosInstance";

const numbers = [...Array(10).keys()].map(i => i + 1);

const SmallSpinner = () => {
  return (
    <span className={styles.spinner__wrapper}>
      <img src={loadingIcon} alt="button spinner" className={styles.spinner} />
    </span>
  );
};

const IdeaRow = ({
  setFetchIdeasData,
  fetchIdeasData,
  idea,
  isEditMode,
  toggleCreate,
  showCreate
}) => {
  const contentRef = createRef();
  const [content, setContent] = useState(idea.content || "");
  const [impact, setImpact] = useState(idea.impact || 1);
  const [ease, setEase] = useState(idea.ease || 1);
  const [confidence, setConfidence] = useState(idea.confidence || 1);
  const [averageScore, setAverageScore] = useState(idea.average_score || 0);
  const [editMode, setEditMode] = useState(isEditMode || false);
  const [showModal, toggleModal] = useState(false);
  const [showLoading, toggleShowLoading] = useState(false);
  // const [showEditIcons, toggleShowEditIcons] = useState(false);

  const { token } = AuthHelpers.getToken();

  useEffect(() => {
    const score = (Number(impact) + Number(ease) + Number(confidence)) / 3;
    setAverageScore(roundAverage(score));
  }, [impact, ease, confidence]);

  const validateString = str => {
    if (!str || str.trim().length < 1) {
      return false;
    }
    return true;
  };

  const handleCreateClick = async () => {
    const data = { content, impact, ease, confidence };

    if (!validateString(content)) {
      contentRef.current.setCustomValidity("Valid string required");
      contentRef.current.reportValidity();
      return;
    }

    if (idea.id) {
      return handleIdeaUpdate();
    }
    toggleShowLoading(true);
    try {
      await axiosInstance({
        method: "post",
        url: "https://small-project-api.herokuapp.com/ideas",
        headers: { "X-Access-Token": token },
        data
      });
      setFetchIdeasData(!fetchIdeasData);
      toggleShowLoading(false);
      toggleCreate(false);
    } catch (error) {
      toggleShowLoading(false);
      console.error(error.response);
    }
  };

  const handleCancelClick = () => {
    if (idea.id) {
      setEditMode(false);
    } else {
      toggleCreate(false);
    }
  };

  const handleIdeaUpdate = async () => {
    try {
      const data = { content, impact, ease, confidence };

      if (!validateString(content)) {
        contentRef.current.setCustomValidity("Valid string required");
        contentRef.current.reportValidity();
        return;
      }

      toggleShowLoading(true);
      await axiosInstance({
        method: "put",
        url: `https://small-project-api.herokuapp.com/ideas/${idea.id}`,
        headers: { "X-Access-Token": token },
        data
      });

      setFetchIdeasData(!fetchIdeasData);
      toggleShowLoading(false);
      setEditMode(false);
    } catch (error) {
      toggleShowLoading(false);
      console.error(error.response);
    }
  };

  const handleIdeaDelete = async () => {
    try {
      toggleShowLoading(true);

      await axiosInstance({
        method: "delete",
        url: `https://small-project-api.herokuapp.com/ideas/${idea.id}`,
        headers: { "X-Access-Token": token }
      });

      toggleShowLoading(false);
      setFetchIdeasData(!fetchIdeasData);
    } catch (error) {
      toggleShowLoading(false);
      console.error(error.response);
    }
  };

  const roundAverage = num => Math.round(num * 100) / 100;

  return (
    <>
      <tr>
        <td>
          <div className={styles.ideaTable__circle} />
        </td>
        <td>
          {editMode ? (
            <input
              type="text"
              name="content"
              id="content"
              minLength={1}
              maxLength={255}
              required
              value={content}
              ref={contentRef}
              onChange={e => setContent(e.target.value)}
              onFocus={e => e.target.setCustomValidity("")}
            />
          ) : (
            content
          )}
        </td>
        <td>
          {editMode ? (
            <select
              name="impact"
              value={impact}
              onChange={e => setImpact(e.target.value)}
              onBlur={e => setImpact(e.target.value)}
            >
              {numbers.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
          ) : (
            impact
          )}
        </td>
        <td>
          {editMode ? (
            <select
              name="ease"
              value={ease}
              onChange={e => setEase(e.target.value)}
              onBlur={e => setEase(e.target.value)}
            >
              {numbers.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
          ) : (
            ease
          )}
        </td>
        <td>
          {editMode ? (
            <select
              name="confidence"
              value={confidence}
              onChange={e => setConfidence(e.target.value)}
              onBlur={e => setConfidence(e.target.value)}
            >
              {numbers.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
          ) : (
            confidence
          )}
        </td>
        <td>{averageScore}</td>
        <td>
          {showLoading ? (
            <SmallSpinner />
          ) : editMode ? (
            <>
              <button
                onClick={() => handleCreateClick()}
                className={styles.ideaTable__icon}
              >
                <img src={confirmIcon} alt="confirm icon" />
              </button>
              <button
                onClick={() => handleCancelClick()}
                className={styles.ideaTable__icon}
              >
                <img src={cancelIcon} alt="cancel icon" />
              </button>
            </>
          ) : (
            <>
              {" "}
              <button
                className={`${styles.ideaTable__icon} ${
                  styles.ideaTable__iconHover
                } `}
                onClick={() => setEditMode(!editMode)}
              >
                <img src={editIcon} alt="edit icon" />
              </button>
              <button
                className={`${styles.ideaTable__icon} ${
                  styles.ideaTable__iconHover
                }`}
                onClick={() => toggleModal(true)}
              >
                <img src={deleteIcon} alt="delete icon" />
              </button>{" "}
            </>
          )}
        </td>
      </tr>
      {showModal ? (
        <Modal className={styles.modal}>
          <div className={styles.modal__content}>
            <h2>Are you sure ?</h2>
            <p>This idea will be permanently deleted.</p>

            <div>
              {showLoading ? (
                <SmallSpinner />
              ) : (
                <>
                  <button onClick={() => toggleModal(false)}>CANCEL</button>
                  <button onClick={() => handleIdeaDelete()}>OK</button>
                </>
              )}
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default IdeaRow;
