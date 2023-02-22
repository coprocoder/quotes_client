import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import "./index.scss";

const CustomModal = ({
  children, // Body element
  title = "", // Header element or text
  open = false, // Trigger to show/hide
  onClose = () => {}, // Callback on close modal
}) => {
  const startZ = 1000;
  const [index, setIndex] = useState();

  const el = React.useMemo(() => document.createElement("div"), []);
  const modal = React.useMemo(() => ReactDOM.createPortal(getContent(), el));

  useEffect(() => {
    document.body.appendChild(el);
    return () => {
      document.body.removeChild(el);
    };
  }, [el]);

  useEffect(() => {
    if (open) {
      setIndex(getCount() + startZ);
      document.documentElement.style.overflow = "hidden";
    } else {
      const _count = document.querySelectorAll(".customDrawer-open").length;
      if (!_count) {
        document.documentElement.style.overflow = "unset";
      }
    }
  }, [open]);

  function getContent() {
    return (
      <div
        style={{
          visibility: open ? "visible" : "hidden",
          zIndex: index,
        }}
      >
        <div className="customModal-overlay" onClick={handlerClose} />
        <div className={getClass()}>
          {title && (
            <div className="customModal-header">
              {
                <div
                  className="customModal-header-cross"
                  onClick={handlerClose}
                >
                  &#215;
                </div>
              }
              {title}
            </div>
          )}
          <div className="customModal-body">{children}</div>
        </div>
      </div>
    );
  }

  function getClass() {
    let classList = ["customModal"];
    if (open) {
      classList.push("customModal-open");
    }
    return classList.join(" ");
  }

  function getCount() {
    return document.querySelectorAll(".customModal-open").length + 1;
  }

  function handlerClose() {
    onClose();
  }

  return modal;
};

export default CustomModal;
