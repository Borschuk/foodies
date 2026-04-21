'use client';

import { useRef, useState } from 'react';
import classes from './image-picker.module.css';
import Image from 'next/image';

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState(null);
  const inputRef = useRef();

  function handleButtonClick() {
    inputRef.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image chosen</p>}
          {pickedImage && <Image src={pickedImage} alt="Preview" fill />}
        </div>

        <input
          type="file"
          id={name}
          name={name}
          accept="image/jpeg, image/png"
          className={classes.input}
          ref={inputRef}
          onChange={handleImageChange}
        />
        <button type="button" className={classes.button} onClick={handleButtonClick}>
          Choose Image
        </button>
      </div>
    </div>
  );
}
