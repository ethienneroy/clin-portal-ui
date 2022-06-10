/* eslint-disable max-len */
import React from 'react';
import cx from 'classnames';

import { IconProps } from '.';

const CanonicalIcon = ({ className = '', width = '18', height = '18' }: IconProps) => (
  <svg
    className={cx('anticon', className)}
    width={width}
    height={height}
    viewBox="0 0 18 18"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
  >
    <path d="M0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9Z" />
    <path
      d="M12.1872 10.3583C12.1087 11.1889 11.8021 11.8378 11.2674 12.3048C10.7326 12.7683 10.0214 13 9.13369 13C8.51337 13 7.96613 12.8538 7.49198 12.5615C7.02139 12.2656 6.65775 11.8467 6.40107 11.3048C6.14439 10.7629 6.0107 10.1337 6 9.41711V8.68984C6 7.95544 6.13012 7.30838 6.39037 6.74866C6.65062 6.18895 7.02317 5.75758 7.50802 5.45455C7.99643 5.15152 8.55971 5 9.19786 5C10.057 5 10.7487 5.23351 11.2727 5.70053C11.7968 6.16756 12.1016 6.82709 12.1872 7.67914H10.8396C10.7754 7.11943 10.6114 6.71658 10.3476 6.47059C10.0873 6.22103 9.7041 6.09626 9.19786 6.09626C8.60963 6.09626 8.15686 6.31194 7.83957 6.74332C7.52585 7.17112 7.36542 7.80036 7.35829 8.63102V9.32086C7.35829 10.1622 7.50802 10.8039 7.80749 11.246C8.11052 11.6881 8.55258 11.9091 9.13369 11.9091C9.66488 11.9091 10.0642 11.7897 10.3316 11.5508C10.5989 11.3119 10.7683 10.9144 10.8396 10.3583H12.1872Z"
      fill="white"
    />
  </svg>
);
export default CanonicalIcon;
