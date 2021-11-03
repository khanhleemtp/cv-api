import React, { forwardRef } from 'react';
import Tilt from 'react-tilt';

const TitlImage = forwardRef((props, ref) => {
  return (
    <Tilt
      {...props}
      ref={ref}
      className="Tilt cursor-pointer"
      options={{ max: 25 }}
      style={{ height: 297 * 0.7, width: 210 * 0.7 }}
    >
      <img
        src="/assets/cv1.png"
        alt="cv"
        className="w-full h-full Tilt-inner"
      />
    </Tilt>
  );
});

export default TitlImage;
