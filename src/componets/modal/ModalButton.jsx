import { LuEye } from 'react-icons/lu';

const ModalButton = ({ onOpen }) => {
  return (
    <button
      className="btn btn-outline btn-info leading-relaxed text-xl"
      onClick={onOpen}
    >
      <LuEye />
    </button>
  );
};

export default ModalButton;
