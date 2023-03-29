import classnames from "classnames";
import {
  AnimatePresence,
  ControlsAnimationDefinition,
  motion,
} from "framer-motion";
import { MouseEvent, useLayoutEffect, useMemo, useRef, useState } from "react";
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
  imageUrls: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  isOpen?: boolean;
  orientation?: "landscape" | "portrait";
  title?: string;
  to: string;
}

const MotionLink = motion(Link);

const imgVariants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeIn",
    },
  },
};

const PhotoCard = ({
  imageUrls,
  isOpen = false,
  orientation = "landscape",
  title,
  to,
}: Props) => {
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
  const srcSet = useMemo(() => {
    return orientation === "landscape"
      ? `${imageUrls.xs} 500w, ${imageUrls.sm} 800w, ${imageUrls.md} 1024w, ${imageUrls.lg} 1440w, ${imageUrls.xl} 1920w`
      : `${imageUrls.xs} 320w, ${imageUrls.sm} 400w, ${imageUrls.md} 533w, ${imageUrls.lg} 613w, ${imageUrls.xl} 720w`;
  }, [imageUrls, orientation]);
  const hasTouch = "ontouchstart" in window;

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
    <motion.div
      className={classnames("relative flex w-full overflow-hidden", {
        is_open: isOpen,
      })}
      ref={elRef}
      whileHover="hover"
    >
      <motion.img
        alt={title}
        className={classnames("h-full w-full object-cover", {
          invisible: status !== "closed",
        })}
        src={imageUrls.xs}
        srcSet={srcSet}
        variants={imgVariants}
      />
      <Link
        className="absolute top-0 left-0 h-full w-full"
        onClick={onLinkClick}
        title={title}
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
              className="fixed top-0 left-0 flex h-full w-full cursor-none items-center overflow-hidden bg-white"
              exit={{
                ...modalCloseStyles,
                transition: { delay: 0.1, ease: "easeInOut" },
              }}
              initial={{
                ...modalInitialStyles,
              }}
              onAnimationComplete={onAnimationComplete}
              onMouseMove={!hasTouch ? onModalMouseMove : undefined}
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
                      style={
                        !hasTouch
                          ? {
                              left: `${closeBtnPosition?.x}px`,
                              top: `${closeBtnPosition?.y}px`,
                            }
                          : {
                              right: 0,
                              top: 0,
                            }
                      }
                      title={`Close ${title}`}
                      to="/"
                    >
                      <div
                        className={classnames(
                          "absolute border border-slate-200 bg-white p-3",
                          {
                            "-translate-x-1/2 -translate-y-1/2": !hasTouch,
                            "-translate-x-full": hasTouch,
                          }
                        )}
                      >
                        <svg
                          width="24px"
                          height="24px"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-slate-700"
                        >
                          <path
                            className="stroke-slate-600"
                            d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"
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
                <motion.img
                  alt={title}
                  animate={{
                    scale: 1,
                    transition: {
                      delay: 0.05,
                      duration: 0.3,
                      ease: "easeInOut",
                    },
                  }}
                  className="h-full w-full object-contain"
                  exit={{
                    scale: 1,
                    transition: { delay: 0.1, ease: "easeInOut" },
                  }}
                  initial={{
                    scale: 1.1,
                  }}
                  src={imageUrls.xs}
                  srcSet={srcSet}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.querySelector("#portal")!
      )}
    </motion.div>
  );
};

export default PhotoCard;
