import React from "react";
import styles from "./IdeaTable.module.scss";
import IdeaRow from "./IdeaRow";

const IdeaTable = ({
  ideas,
  showCreate,
  toggleCreate,
  setFetchIdeasData,
  fetchIdeasData
}) => {
  return (
    <div className={styles.ideaTable__wrapper}>
      <table className={styles.ideaTable}>
        <thead>
          <tr>
            <th />
            <th />
            <th>Impact</th>
            <th>Ease</th>
            <th>Confidence</th>
            <th>Avg.</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {showCreate && (
            <IdeaRow
              setFetchIdeasData={setFetchIdeasData}
              fetchIdeasData={fetchIdeasData}
              idea={{}}
              isEditMode={true}
              showCreate={showCreate}
              toggleCreate={toggleCreate}
            />
          )}
          {ideas.map(idea => (
            <IdeaRow
              setFetchIdeasData={setFetchIdeasData}
              fetchIdeasData={fetchIdeasData}
              idea={idea}
              key={idea.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IdeaTable;
