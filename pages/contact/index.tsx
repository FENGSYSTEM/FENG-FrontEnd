import { getConfigs } from "@redux/slices/api/configContentSlice";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import createDOMPurify from "dompurify";

interface Props {}

export default function index({}: Props): ReactElement {
  const dispatch = useDispatch();
  const configData = useSelector((state) => state.config.configsData) as any;

  const [DOMPurify, setDOMPurify] = useState<any>();
  const [wd, setWd] = useState<any>();
  useEffect(() => {
    if (window) {
      setWd(window);
      setDOMPurify(createDOMPurify(window));
    }
  }, []);

  useEffect(() => {
    dispatch(getConfigs());
  }, []);

  const DescriptionHTML = configData?.contact;
  return (
    <div className="config-content">
      {wd && (
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(DescriptionHTML),
          }}
        />
      )}
    </div>
  );
}
