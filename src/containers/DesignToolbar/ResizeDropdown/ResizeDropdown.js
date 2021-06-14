import React from 'react';
import styles from './ResizeDropdown.module.css';

const ResizeDropdown = () => {
  return (
    <div className={styles.Dropdown}>
      <ul className={styles.SizeOptions}>
        <li className={styles.SizeOption}>Slide 16:9</li>
        <li className={styles.SizeOption}>A4</li>
        <li className={styles.SizeOption}>Facebook post</li>
        <li className={styles.SizeOption}>Linkedin cover</li>
        <li className={styles.SizeOption}>Video thumbnail</li>
        <li className={styles.CustomSizeOption}>
          <p className={styles.CustomSizeText}>Custom size</p>
          <div className={styles.InputsContainer}>
            <input
              className={styles.InputWidth}
              type='number'
              placeholder='Width'
            />
            <input
              className={styles.InputHeight}
              type='number'
              placeholder='Height'
            />
            <p className={styles.PxText}>px</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ResizeDropdown;
