import classnames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

interface ModalStyles {
  height: number;
  opacity: number;
  x: number;
  y: number;
  width: number;
}

interface Props {
  imageUrl: string;
  isOpen?: boolean;
  to: string;
}

const MotionLink = motion(Link);

const PhotoCard = ({ imageUrl, isOpen = false, to }: Props) => {
  const elRef = useRef<HTMLDivElement | null>(null);
  const [modalStyles, setModalStyles] = useState<ModalStyles>();

  const observer = useRef(
    new ResizeObserver((entries) => {
      const { height, x, y, width } = entries[0].target.getBoundingClientRect();

      setModalStyles({
        height,
        opacity: 1,
        x,
        y,
        width,
      });
    })
  );

  useLayoutEffect(() => {
    setTimeout(() => {
      if (elRef.current) {
        observer.current.observe(elRef.current);
      }
    }, 100);

    return () => {
      if (elRef.current) {
        observer.current.unobserve(elRef.current);
      }
    };
  }, [elRef, observer]);

  return (
    <div
      className={classnames("relative flex w-full overflow-hidden", {
        is_open: isOpen,
      })}
      ref={elRef}
    >
      <img
        className={classnames("h-full w-full object-cover", {
          invisible: isOpen,
        })}
        src={imageUrl}
      />
      <Link className="absolute top-0 left-0 h-full w-full" to={to} />
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              animate={{
                height: "100%",
                position: "fixed",
                x: 0,
                y: 0,
                width: "100%",
              }}
              className="absolute top-0 left-0 h-full w-full"
              exit={modalStyles}
              initial={modalStyles}
            >
              <div className="absolute left-0 top-0 h-full w-full">
                <MotionLink
                  animate={{
                    opacity: 1,
                  }}
                  className="absolute right-0 top-0 bg-white p-4"
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  to="/"
                >
                  Close
                </MotionLink>
                <img className="h-full w-full object-cover" src={imageUrl} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.querySelector("#portal")!
      )}
    </div>
  );
};

export default PhotoCard;
