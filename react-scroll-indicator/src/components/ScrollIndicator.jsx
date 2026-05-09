import React, { useCallback, useEffect, useState } from "react";

const ScrollIndicator = ({ url }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = useCallback(() => {
    // total document/content height
    const documentHeight = document.documentElement.scrollHeight;
    // user window height
    const clientWindowHeight = document.documentElement.clientHeight;
    // how much user can scroll
    const howMuchScrolled = document.documentElement.scrollTop;

    // total scrollable height
    const scrollableHeight = documentHeight - clientWindowHeight;

    if (scrollableHeight === 0) return;

    setScrollPercentage((howMuchScrolled / scrollableHeight) * 100);
  }, []);

  useEffect(() => {
    fetchData(url);
  }, [url]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="top-container">
        <h1>Scroll Indicator</h1>
        <div className="scroll-indicator-container">
          <div
            className="scroll-progress"
            style={{ transform: `translateX(${scrollPercentage - 100}%)` }}
            // style={{ width: `${scrollPercentage}%` }}
          ></div>
        </div>
      </div>
      <div className="content">
        {data?.map((product) => (
          <div key={product.id}>{product.title}</div>
        ))}
      </div>
    </div>
  );
};

export default ScrollIndicator;
