import type { FC } from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

type ActivateModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
};

export const ActivateModal: FC<ActivateModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const reason = String(formData.get("reason") || "").trim();
    onSubmit(reason || "Activated by admin");
  };

  return (
    <Modal open={open} onClose={onClose} widthClassName="w-[520px]">
      <div className="text-lg font-semibold bg-gray-200 p-4">Activate User</div>
      <form onSubmit={handleSubmit} className="p-5">
        <label className="text-sm font-medium">Reason</label>
        <textarea
          name="reason"
          className="w-full h-28 border rounded-xl px-3 py-2 text-sm mt-1"
          placeholder="Reason for activation"
        ></textarea>
        <div className="mt-4 flex gap-2 justify-end">
          <button
            type="button"
            className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700"
            onClick={onClose}
          >
            Cancel
          </button>
          <Button size="md">Activate</Button>
        </div>
      </form>
    </Modal>
  );
};

export default ActivateModal;
