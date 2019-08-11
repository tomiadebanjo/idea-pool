import React, { useState, createRef, useEffect } from "react";
import styles from "../IdeaTable.module.scss";
import editIcon from "../assets/pen.png";
import deleteIcon from "../assets/bin.png";
import confirmIcon from "../assets/Confirm_V.png";
import cancelIcon from "../assets/Cancel_X.png";

import axios from "axios";
import { AuthHelpers } from "../../../helpers";
import Modal from "../../Modal";

const numbers = [...Array(10).keys()].map(i => i + 1);

/*
To-do
- Fix onKeyDown methods
- remove console.log()
- add loader to mini methods
*/

const IdeaRow = ({
  setFetchIdeasData,
  fetchIdeasData,
  idea,
  isEditMode,
  toggleCreate
}) => {
  const contentRef = createRef();
  const impactRef = createRef();
  const easeRef = createRef();
  const confidenceRef = createRef();
  const [content, setContent] = useState(idea.content || "");
  const [impact, setImpact] = useState(idea.impact || 1);
  const [ease, setEase] = useState(idea.ease || 1);
  const [confidence, setConfidence] = useState(idea.confidence || 1);
  const [averageScore, setAverageScore] = useState(idea.average_score || 0);
  const [editMode, setEditMode] = useState(isEditMode || false);
  const [showModal, toggleModal] = useState(false);

  const { token } = AuthHelpers.getToken();

  useEffect(() => {
    const score = (Number(impact) + Number(ease) + Number(confidence)) / 3;
    setAverageScore(roundAverage(score));
  }, [impact, ease, confidence]);

  const handleCreateClick = async () => {
    const data = { content, impact, ease, confidence };

    if (idea.id) {
      return handleIdeaUpdate();
    }

    try {
      await axios({
        method: "post",
        url: "https://small-project-api.herokuapp.com/ideas",
        headers: { "X-Access-Token": token },
        data
      });
      setFetchIdeasData(!fetchIdeasData);
      toggleCreate(false);
    } catch (error) {
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
      // console.log(data, "update row Data");

      const { data: response } = await axios({
        method: "put",
        url: `https://small-project-api.herokuapp.com/ideas/${idea.id}`,
        headers: { "X-Access-Token": token },
        data
      });

      console.log(response, "response data");
      setFetchIdeasData(!fetchIdeasData);
      setEditMode(false);
    } catch (error) {
      console.error(error.response);
    }
  };

  const handleIdeaDelete = async () => {
    try {
      const { data: response } = await axios({
        method: "delete",
        url: `https://small-project-api.herokuapp.com/ideas/${idea.id}`,
        headers: { "X-Access-Token": token }
      });

      console.log(response, "delete response data");
      setFetchIdeasData(!fetchIdeasData);
    } catch (error) {
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
              ref={impactRef}
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
              ref={easeRef}
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
              ref={confidenceRef}
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
          {editMode ? (
            <>
              <div
                className={styles.ideaTable__icon}
                onClick={() => handleCreateClick()}
                onKeyDown={() => {}}
                role="button"
                tabIndex="0"
              >
                <img src={confirmIcon} alt="confirm icon" />
              </div>
              <div
                className={styles.ideaTable__icon}
                onClick={() => handleCancelClick()}
                onKeyDown={() => {}}
                role="button"
                tabIndex="0"
              >
                <img src={cancelIcon} alt="cancel icon" />
              </div>
            </>
          ) : (
            <>
              {" "}
              <div
                className={styles.ideaTable__icon}
                onClick={() => setEditMode(!editMode)}
                onKeyDown={() => {}}
                role="button"
                tabIndex="0"
              >
                <img src={editIcon} alt="edit icon" />
              </div>
              <div
                className={styles.ideaTable__icon}
                onClick={() => toggleModal(true)}
                onKeyDown={() => {}}
                role="button"
                tabIndex="0"
              >
                <img src={deleteIcon} alt="delete icon" />
              </div>{" "}
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
              <button onClick={() => toggleModal(false)}>CANCEL</button>
              <button onClick={() => handleIdeaDelete()}>OK</button>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default IdeaRow;
