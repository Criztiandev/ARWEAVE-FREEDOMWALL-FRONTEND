import { motion } from "framer-motion";
import { CSSProperties } from "react";

const LoadingBlob = () => {
  const variants = {
    span1: {
      initial: { height: 30 },
      animate: {
        height: [30, 60, 30, 30],
        transition: { duration: 1.3, repeat: Infinity },
      },
    },
    span2: {
      initial: { height: 30 },
      animate: {
        height: [30, 30, 60, 30, 30],
        transition: { duration: 1.3, repeat: Infinity },
      },
    },
    span3: {
      initial: { height: 30 },
      animate: {
        height: [30, 30, 30, 60, 30],
        transition: { duration: 1.3, repeat: Infinity },
      },
    },
  };

  return (
    <div style={styles.loadingBlob as CSSProperties}>
      <motion.span
        variants={variants.span1}
        initial="initial"
        animate="animate"
        style={styles.span as CSSProperties}
      />
      <motion.span
        variants={variants.span2}
        initial="initial"
        animate="animate"
        style={{ ...styles.span, left: 40 } as CSSProperties}
      />
      <motion.span
        variants={variants.span3}
        initial="initial"
        animate="animate"
        style={{ ...styles.span, left: 80 } as CSSProperties}
      />
    </div>
  );
};

const styles = {
  loadingBlob: {
    position: "relative",
    width: 110,
    display: "flex",
    alignItems: "center",
  },
  span: {
    display: "inline-block",
    width: 30,
    height: 30,
    backgroundColor: "#000",
    borderRadius: "50%",
    position: "absolute",
  },
};

export default LoadingBlob;
