import { FaCheckCircle, FaTimesCircle, FaQuestionCircle } from "react-icons/fa";

const VerificationStatus = ({ userSettings }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case "auto-approved":
      case "manual-approved":
        return <FaCheckCircle style={{ color: "green" }} />; // Approved icon (green)
      case "auto-rejected":
      case "manual-rejected":
        return <FaTimesCircle style={{ color: "red" }} />; // Rejected icon (red)
      case "pending":
        return <FaQuestionCircle style={{ color: "blue" }} />; // Pending icon (blue)
      case "re-review":
        return <FaQuestionCircle style={{ color: "orange" }} />; // Re-review icon (orange)
      default:
        return null;
    }
  };

  const getStatusLabel = (status) => {
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
      case "re-review":
        return "Re-review";
      default:
        return "";
    }
  };

  return (
    <div className="flex items-center gap-3">
      <h3 className="text-main2 font-semibold text-sm lg:text-base">
        Account Status: {getStatusLabel(userSettings.verification_type)}
      </h3>
      <div>{getStatusIcon(userSettings.verification_type)}</div>
    </div>
  );
};

export default VerificationStatus;
