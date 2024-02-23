const Underlay = ({}) => {
  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        zIndex: "-1",
        top: "0",
        left: "0",
        background: `linear-gradient(173deg, var(--accent-2) 38.2%, var(--accent-4))`,
      }}
    />
  );
};

export default Underlay;
