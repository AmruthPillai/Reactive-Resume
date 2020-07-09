import React, { memo } from 'react';

const EmptyList = () => (
  <div className="py-6 opacity-75 text-center">This list is empty.</div>
);

export default memo(EmptyList);
