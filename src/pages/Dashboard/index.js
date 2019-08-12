import React, { useState, useContext, useEffect } from "react";

import styles from "./Dashboard.module.scss";
import createIcon from "./assets/btn_addanidea.png";
import bulbIcon from "./assets/bulb.png";
import IdeaTable from "../../components/IdeaTable";
import AuthContext from "../../context/AuthContext";
import { AuthHelpers } from "../../helpers";

import axiosInstance from "../../Services/axiosInstance";
import Pagination from "../../components/Pagination";
import Spinner from "../../components/Spinner";

const Dashboard = () => {
  const [content, setContent] = useState([]);
  const [showCreate, toggleShowCreate] = useState(false);
  const [fetchIdeasData, setFetchIdeasData] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [auth] = useContext(AuthContext);
  const { token } = AuthHelpers.getToken();

  const handleToggleCreate = e => {
    if (e.keyCode === 13) {
      toggleShowCreate(true);
    }
  };

  useEffect(() => {
    setLoading(true);
    async function fetchIdeas() {
      try {
        const { data } = await axiosInstance({
          method: "get",
          url: `https://small-project-api.herokuapp.com/ideas?page=${currentPage}`,
          headers: { "X-Access-Token": token }
        });

        setLoading(false);
        setContent(data.reverse());
      } catch (error) {
        console.error(error.response);
      }
    }

    if (auth) {
      fetchIdeas();
    }
  }, [token, fetchIdeasData, auth, currentPage]);

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
        <>
          {loading ? (
            <Spinner />
          ) : (
            <div className={styles.dashboard__noIdeaSection}>
              <div className={styles.dashboard__bulbIcon}>
                <img src={bulbIcon} alt="bulb icon" />
              </div>
              {currentPage > 1 ? (
                <p>
                  No Ideas !{" "}
                  <button onClick={() => setCurrentPage(currentPage - 1)}>
                    Click to go back to page {currentPage - 1}
                  </button>
                </p>
              ) : (
                <p>Got Ideas?</p>
              )}
            </div>
          )}
        </>
      ) : (
        <>
          <IdeaTable
            showCreate={showCreate}
            toggleCreate={toggleShowCreate}
            updateContent={setContent}
            ideas={content}
            setFetchIdeasData={setFetchIdeasData}
            fetchIdeasData={fetchIdeasData}
          />
          {showCreate && content.length < 1 ? null : (
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              contentLength={content.length}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
