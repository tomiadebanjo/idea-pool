import React from 'react';
import styles from './IdeaTable.module.scss';
import editIcon from './assets/pen.png';
import deleteIcon from './assets/bin.png';
import confirmIcon from './assets/Confirm_V.png';
import cancelIcon from './assets/Cancel_X.png';

const IdeaTable = () => {
  const numbers = [...Array(10).keys()].map(i => i + 1);
  return (
    <div>
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
          <tr>
            <td>
              <div className={styles.ideaTable__circle} />
            </td>
            <td>
              <input type="text" name="name" id="name" />
            </td>
            <td>
              <select name="choice" defaultValue={10}>
                {numbers.map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <select name="choice" defaultValue={10}>
                {numbers.map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <select name="choice" defaultValue={10}>
                {numbers.map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
              </select>
            </td>
            <td>10</td>
            <td>
              <div className={styles.ideaTable__icon}>
                <img src={confirmIcon} alt="confirm icon" />
              </div>
              <div className={styles.ideaTable__icon}>
                <img src={cancelIcon} alt="cancel icon" />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className={styles.ideaTable__circle} />
            </td>
            <td>Berglunds snabbköp</td>
            <td>10</td>
            <td>20</td>
            <td>25</td>
            <td>10</td>
            <td>
              <div className={styles.ideaTable__icon}>
                <img src={editIcon} alt="edit icon" />
              </div>
              <div className={styles.ideaTable__icon}>
                <img src={deleteIcon} alt="delete icon" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default IdeaTable;
