import img1 from "../../assets/image1.jpg";
import img2 from "../../assets/image2.jpg";
import img3 from "../../assets/image3.jpg";
import img4 from "../../assets/image4.jpg";
import img5 from "../../assets/image5.jpg";
import img6 from "../../assets/image6.jpg";
import img7 from "../../assets/image7.jpg";
import img8 from "../../assets/image8.jpg";
import img9 from "../../assets/image9.jpg";
import img10 from "../../assets/image10.jpg";
import img11 from "../../assets/image11.jpg";
import styles from "./gallerystyles.module.css";

import { useState } from "react";
const Gallery = () => {
  const images = [
    { src: img1, description: "Dandiya Dhvani" },
    { src: img2, description: "Dandiya Dhvani" },
    { src: img4, description: "Orientation Day" },
    { src: img5, description: "Orientation Day" },
    { src: img6, description: "Girl child day" },
    { src: img7, description: "Blood Donation Camp" },
    { src: img9, description: "Dandiya Dhvani" },
    { src: img10, description: "Girl child day" },
    { src: img3, description: "Dandiya Dhvani" },
    { src: img8, description: "Dandiya Dhvani" },
    { src: img11, description: "Dandiya Dhvani" },
    { src: img8, description: "Dandiya Dhvani" },
  ];

  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div style={{ padding: "1rem" }}>
      <h1 className={styles.title}>Gallery</h1>
      <div className={styles.grid}>
        {images.map((img, index) => (
          <img
            key={index}
            src={img.src}
            alt={`Gallery ${index}`}
            className={styles.image}
            onClick={() => setSelectedImage(img)}
            loading="lazy"
          />
        ))}
      </div>
      {selectedImage && (
        <div
          className={styles.modalOverlay}
          onClick={() => setSelectedImage(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt="Zoomed"
              className={styles.modalImage}
              loading="lazy"
            />
            <p>{selectedImage.description}</p>
            <button
              className={styles.closeButton}
              onClick={() => setSelectedImage(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <br />
      <br /> <br /> <br /> <br /> <br />
    </div>
  );
};

export default Gallery;
