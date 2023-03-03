import { Link } from 'react-router-dom';
import classnames from 'classnames';
import './PhotoCard.css';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useLayoutEffect, useRef, useState } from 'react';

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
    <div className={classnames('photo_card', { is_open: isOpen })} ref={elRef}>
      <img className="photo_card_image" src={imageUrl} />
      <Link className="photo_card_link" to={to} />
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              animate={{
                height: '100%',
                position: 'fixed',
                x: 0,
                y: 0,
                width: '100%',
              }}
              className="photo_card_container"
              exit={modalStyles}
              initial={modalStyles}>
              <div className="photo_card_content">
                <Link className="photo_card_close_link" to="/">
                  Close
                </Link>
                <img className="photo_card_image" src={imageUrl} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.querySelector('#portal')!
      )}
    </div>
  );
};

export default PhotoCard;
