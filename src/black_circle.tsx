
import * as React from "react";

type BlackCircleProps = {

}
function SvgBlackCircle(props:BlackCircleProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="210mm"
      height="297mm"
      viewBox="0 0 210 297"
      {...props}
    >
      <circle
        cx={111.125}
        cy={139.762}
        r={18.899}
        stroke="#fff"
        strokeWidth={0.1}
      />
    </svg>
  );
}

export default SvgBlackCircle;
