import React from "react";
import SEO from "../common/seo";

import Wrapper from "../layout/wrapper";
import HomeThree from "../components/homes/home-3";

const index = () => {
  return (
    <Wrapper>
      <SEO />
      <HomeThree />
    </Wrapper>
  );
};

export default index;
