import { Tooltip } from "@material-ui/core";
import React from "react";

const SectionIcon = ({ section, placement = "right" }) => {
  const { icon: Icon, name } = section;

  return (
    <Tooltip title={name} placement={placement} arrow>
      <div className="cursor-pointer">
        <Icon className="text-secondary-dark hover:text-primary" size="20px" />
      </div>
    </Tooltip>
  );
};

export default SectionIcon;
