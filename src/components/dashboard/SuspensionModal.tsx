import { useState, type FC } from "react";
import Modal from "../ui/Modal";
import { AlertCircle, X } from "lucide-react";
import Button from "../ui/Button";

export type SuspensionModalProps = {
  open: boolean;
  onClose: () => void;
  driverName: string;
  onSubmit?: (payload: {
    type: "temporary" | "permanent";
    days?: number;
    date?: string;
    reason: string;
  }) => void;
};

const TabButton: FC<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ active, onClick, children }) => (
  <button
    className={`w-1/2 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer  ${
      active ? "bg-white shadow" : "bg-gray-100 text-gray-600"
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

export const SuspensionModal: FC<SuspensionModalProps> = ({
  open,
  onClose,
  driverName,
  onSubmit,
}) => {
  const [tab, setTab] = useState<"temporary" | "permanent">("temporary");
  const [days, setDays] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [reason, setReason] = useState<string>("");

  const submit = () => {
    const payload = {
      type: tab,
      days: days ? Number(days) : undefined,
      date: date || undefined,
      reason,
    } as const;
    onSubmit?.(payload);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} widthClassName="w-[720px]">
      <div className="">
        <div className="text-lg font-semibold bg-gray-200 p-4">
          Create new Suspension Issue
        </div>
      </div>
      <div className="px-5">
        {/* Banner */}
        <div className="mt-4 bg-blue-50 text-blue-700 rounded-xl flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">You're Sending a suspension for:</span>
            <div className="flex items-center gap-2  rounded-full px-2 py-1">
              <img
                src="https://i.pravatar.cc/32?img=11"
                className="w-6 h-6 rounded-full"
              />
              <span className="text-sm font-medium">{driverName}</span>
            </div>
          </div>
          <button className="text-blue-700 hover:opacity-80" onClick={onClose}>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="mt-4 bg-gray-100 rounded-xl p-1 flex">
          <TabButton
            active={tab === "temporary"}
            onClick={() => setTab("temporary")}
          >
            Temporary Suspension
          </TabButton>
          <TabButton
            active={tab === "permanent"}
            onClick={() => setTab("permanent")}
          >
            Permanent Suspension
          </TabButton>
        </div>

        {/* Tab content */}
        {tab === "temporary" ? (
          <div className="mt-4 rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-blue-600" />
              <span>Suspended for</span>
              <input
                type="number"
                min={1}
                className="w-16 border border-primary focus:outline-primary rounded-md px-2 py-1 text-center "
                value={days}
                onChange={(e) => setDays(e.target.value)}
              />
              <span>Days</span>
            </div>
            <input
              type="date"
              className="mt-3 w-full border rounded-md px-3 py-2 text-sm"
              placeholder="Enter Suspension date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        ) : (
          <div className="mt-4" />
        )}

        {/* Reason */}
        <div className="mt-4">
          <div className="text-sm font-medium mb-2">
            What makes you to suspend the user
          </div>
          <div className="relative">
            <textarea
              className="w-full h-32 border rounded-xl px-3 py-2 text-sm resize-none"
              placeholder="Enter the suspension reason here"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <div className="absolute bottom-2 right-3 text-xs text-gray-400">
              120/200
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between gap-x-2 bg-gray-50 rounded-b-2xl -mx-5 px-5 py-4">
          <button
            className="w-full px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 cursor-pointer text-gray-700"
            onClick={onClose}
          >
            Cancel
          </button>

          <Button className="w-full" onClick={submit}>
            Suspend
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SuspensionModal;
