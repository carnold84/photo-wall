import classnames from "classnames";
import {
  AnimatePresence,
  ControlsAnimationDefinition,
  motion,
} from "framer-motion";
import { MouseEvent, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

interface ModalStyles {
  height: number;
  opacity: number;
  x: number;
  y: number;
  width: number;
}

interface CloseBtnPosition {
  x: number;
  y: number;
}

interface Props {
  imageUrl: string;
  isOpen?: boolean;
  to: string;
}

const MotionLink = motion(Link);

const PhotoCard = ({ imageUrl, isOpen = false, to }: Props) => {
  const elRef = useRef<HTMLDivElement | null>(null);
  const [modalInitialStyles, setModalInitialStyles] =
    useState<ModalStyles | null>(null);
  const [modalCloseStyles, setModalCloseStyles] = useState<ModalStyles | null>(
    null
  );
  const [closeBtnPosition, setCloseBtnPosition] =
    useState<CloseBtnPosition | null>(null);
  const [status, setStatus] = useState<"closed" | "open">(
    isOpen ? "open" : "closed"
  );

  useLayoutEffect(() => {
    if (elRef.current) {
      if (isOpen) {
        const { height, x, y, width } = elRef.current.getBoundingClientRect();
        setStatus("open");
        setModalInitialStyles({
          height,
          opacity: 1,
          x,
          y,
          width,
        });
      } else {
        setModalInitialStyles(null);
      }
    }
  }, [elRef.current, isOpen]);

  const onModalClose = () => {
    if (elRef.current) {
      const { height, x, y, width } = elRef.current.getBoundingClientRect();
      setStatus("closed");
      setCloseBtnPosition(null);
      setModalCloseStyles({
        height,
        opacity: 1,
        x,
        y,
        width,
      });
    }
  };

  const onModalMouseMove = (evt: MouseEvent<HTMLDivElement>) => {
    setCloseBtnPosition({
      x: evt.clientX,
      y: evt.clientY,
    });
  };

  const onLinkClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    setCloseBtnPosition({
      x: evt.clientX,
      y: evt.clientY,
    });
  };

  const onAnimationComplete = (evt: ControlsAnimationDefinition) => {
    setStatus("closed");
  };

  return (
    <div
      className={classnames("relative flex w-full overflow-hidden", {
        is_open: isOpen,
      })}
      ref={elRef}
    >
      <img
        className={classnames("h-full w-full object-cover", {
          invisible: status !== "closed",
        })}
        src={imageUrl}
      />
      <Link
        className="absolute top-0 left-0 h-full w-full"
        onClick={onLinkClick}
        to={to}
      />
      {createPortal(
        <AnimatePresence>
          {modalInitialStyles && (
            <motion.div
              animate={{
                height: "100%",
                transition: { delay: 0.05, duration: 0.3, ease: "easeInOut" },
                x: 0,
                y: 0,
                width: "100%",
              }}
              className="fixed top-0 left-0 h-full w-full cursor-none overflow-hidden"
              exit={{
                ...modalCloseStyles,
                transition: { delay: 0.1, ease: "easeInOut" },
              }}
              initial={modalInitialStyles}
              onAnimationComplete={onAnimationComplete}
              onMouseMove={onModalMouseMove}
            >
              <div className="absolute left-0 top-0 h-full w-full">
                <AnimatePresence>
                  {closeBtnPosition && (
                    <MotionLink
                      animate={{
                        opacity: 1,
                        scale: 1,
                        transition: {
                          duration: 0.2,
                          ease: "easeInOut",
                        },
                      }}
                      className="pointer-events-none absolute cursor-none"
                      exit={{
                        opacity: 0,
                        scale: 0,
                        transition: { duration: 0.1 },
                      }}
                      initial={{
                        opacity: 0,
                        scale: 0,
                      }}
                      style={{
                        left: `${closeBtnPosition?.x}px`,
                        top: `${closeBtnPosition?.y}px`,
                      }}
                      to="/"
                    >
                      <div className="absolute -translate-x-1/2 -translate-y-1/2 bg-white p-3">
                        <svg
                          width="24px"
                          height="24px"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          color="#000000"
                        >
                          <path
                            d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"
                            stroke="#000000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </div>
                    </MotionLink>
                  )}
                </AnimatePresence>
                <Link
                  className="absolute left-0 top-0 h-full w-full cursor-none"
                  onClick={onModalClose}
                  to="/"
                />
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
