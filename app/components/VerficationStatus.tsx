import { FaCheckCircle, FaTimesCircle, FaQuestionCircle, FaDraft2Digital } from "react-icons/fa";

const VerificationStatus = ({
  verification_type,
  message,
  className,
}: {
  verification_type: string;
  message?: string;
  className?: string;
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "auto-approved":
      case "manual-approved":
        return <FaCheckCircle style={{ color: "green" }} />; // Approved icon (green)
      case "auto-rejected":
      case "manual-rejected":
        return <FaTimesCircle style={{ color: "red" }} />; // Rejected icon (red)
      case "pending":
        return <FaQuestionCircle style={{ color: "blue" }} />; // Pending icon (blue)
      case null:
        return <FaQuestionCircle style={{ color: "blue" }} />;
      case "re-review":
        return <FaQuestionCircle style={{ color: "orange" }} />; // Re-review icon (orange)
      case "draft":
        return <FaDraft2Digital className=" text-blue-500 w-4 h-4" />;

      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "auto-approved":
        return "Auto Approved";
      case "manual-approved":
        return "Manual Approved";
      case "auto-rejected":
        return "Auto Rejected";
      case "manual-rejected":
        return "Manual Rejected";
      case "pending":
        return "Pending";
      case null:
        return "Pending";
      case "re-review":
        return "Re-review";

      default:
        return "";
    }
  };

  return (
    <div className={` ${className} flex  w-full bg-light rounded-xl py-2 px-4 my-2 items-center gap-3`}>
      {message ? (
        <p>{message}</p>
      ) : (
        <h3 className="text-main2  font-semibold text-sm lg:text-base">
          Account Status: {getStatusLabel(verification_type)}
        </h3>
      )}
      <div>{getStatusIcon(verification_type)}</div>
    </div>
  );
};

export default VerificationStatus;
