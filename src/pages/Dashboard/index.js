import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "@reach/router";

import styles from "./Dashboard.module.scss";
import createIcon from "./assets/btn_addanidea.png";
import bulbIcon from "./assets/bulb.png";
import IdeaTable from "../../components/IdeaTable";
import AuthContext from "../../context/AuthContext";
import { AuthHelpers } from "../../helpers";
import axios from "axios";

const Dashboard = () => {
  const [content, setContent] = useState([]);
  const [showCreate, toggleShowCreate] = useState(false);
  const [fetchIdeasData, setFetchIdeasData] = useState(false);

  const [auth] = useContext(AuthContext);
  const { token } = AuthHelpers.getToken();

  const handleToggleCreate = e => {
    if (e.keyCode === 13) {
      toggleShowCreate(true);
    }
  };

  useEffect(() => {
    async function fetchIdeas() {
      try {
        const { data } = await axios({
          method: "get",
          url: "https://small-project-api.herokuapp.com/ideas",
          headers: { "X-Access-Token": token }
        });

        console.log(data, "+++");
        setContent(data.reverse());
        // toggleCreate(!showCreate);
      } catch (error) {
        console.error(error.response);
      }
    }

    if (auth) {
      fetchIdeas();
    }
  }, [token, fetchIdeasData, auth]);

  if (!auth) {
    return <Redirect to="/login" noThrow />;
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboard__header}>
        <h2 className={styles.dashboard__headerText}>My Ideas</h2>
        <div
          className={styles.dashboard__headerIcon}
          onClick={() => toggleShowCreate(true)}
          onKeyDown={handleToggleCreate}
          role="button"
          tabIndex="0"
        >
          <img src={createIcon} alt="create icon" />
        </div>
      </div>

      {!showCreate && content.length < 1 ? (
        <div className={styles.dashboard__noIdeaSection}>
          <div className={styles.dashboard__bulbIcon}>
            <img src={bulbIcon} alt="bulb icon" />
          </div>
          <p>Got Ideas?</p>
        </div>
      ) : (
        <IdeaTable
          showCreate={showCreate}
          toggleCreate={toggleShowCreate}
          updateContent={setContent}
          ideas={content}
          setFetchIdeasData={setFetchIdeasData}
          fetchIdeasData={fetchIdeasData}
        />
      )}
    </div>
  );
};

export default Dashboard;
