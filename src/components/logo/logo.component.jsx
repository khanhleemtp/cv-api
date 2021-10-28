import React from 'react';
import { ReactComponent as LogoImage } from '../../assets/logo.svg';
import { Link } from 'react-router-dom';

export default function Logo(props) {
  return (
    <Link to="/">
      <LogoImage
        style={{
          width: 40,
          height: 40,
          cursor: 'pointer',
        }}
      />
      <div>LD CV</div>
    </Link>
  );
}
