import { Tooltip } from '@material-ui/core';
import React, { memo } from 'react';
import { scroller } from 'react-scroll';
import { handleKeyUp } from '../../utils';

const SectionIcon = ({ section, containerId, placement = 'right' }) => {
  const { id, name, icon: Icon } = section;

  const handleClick = () => {
    scroller.scrollTo(id, {
      duration: 500,
      smooth: true,
      containerId,
      offset: -10,
    });
  };

  return (
    <Tooltip title={name} placement={placement} arrow>
      <div
        tabIndex="0"
        role="button"
        className="cursor-pointer focus:outline-none"
        onKeyUp={(e) => handleKeyUp(e, handleClick)}
        onClick={handleClick}
      >
        <Icon className="text-secondary-dark hover:text-primary" size="16px" />
      </div>
    </Tooltip>
  );
};

export default memo(SectionIcon);
