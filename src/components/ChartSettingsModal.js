import React from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";
import { SecondaryText } from "./typeComponents";
import Button, { PrimaryButton } from "./Button";

const ChartSettingsModal = ({
  open,
  monthsToCompare,
  onClose,
  onDecrementMonths,
  onIncrementMonths
}) => (
  <Modal open={open} title="Chart Settings" onClose={onClose}>
    <div style={{ display: "flex", alignItems: "center", marginBottom: 15 }}>
      <div style={{ marginRight: 10 }}>
        <Button onClick={onDecrementMonths}>-</Button>
        <Button onClick={onIncrementMonths}>+</Button>
      </div>
      <SecondaryText>
        Compare with the last {monthsToCompare} month{monthsToCompare === 1
          ? ""
          : "s"}
      </SecondaryText>
    </div>
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <PrimaryButton onClick={onClose}>Done</PrimaryButton>
    </div>
  </Modal>
);

ChartSettingsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  monthsToCompare: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onDecrementMonths: PropTypes.func.isRequired,
  onIncrementMonths: PropTypes.func.isRequired
};

export default ChartSettingsModal;
