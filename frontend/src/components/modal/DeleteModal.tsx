import Button from "../ui/Button";

interface Props {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteModal = ({ open, onConfirm, onCancel }: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h2>Confirm Delete</h2>

        <p>Are you sure?</p>

        <div className="flex gap-2 mt-4">
          <Button color="red" text="Yes" onClick={onConfirm} />
          <Button color="gray" text="No" onClick={onCancel} />
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;