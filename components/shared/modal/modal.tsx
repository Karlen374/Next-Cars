import { CSSTransition } from 'react-transition-group';
import { ModalProps } from './modal.interface';
import styles from './modal.module.scss';
import { changeViewedModal } from '../../../models/modal/modal';

const Modal = ({ active, children }:ModalProps) => {
  const close = () => {
    changeViewedModal();
  };

  const ModalClass = active ? `${styles.Modal} ${styles.active__Modal}` : `${styles.Modal}`;
  const ModalContentClass = active ? `${styles.Modal__content} ${styles.active__Modal}` : `${styles.Modal__content}`;
  return (
    <CSSTransition
      in={active}
      timeout={1000}
      classNames="alert"
      unmountOnExit
    >
      <div className={ModalClass} onClick={close} aria-hidden="true">
        <div className={ModalContentClass} onClick={(e) => e.stopPropagation()} aria-hidden="true">
          {children}
        </div>
      </div>
    </CSSTransition>
  );
};
export default Modal;
