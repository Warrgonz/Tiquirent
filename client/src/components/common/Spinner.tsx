import PulseLoader from "react-spinners/PulseLoader";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <PulseLoader color="#198754" loading={true} size={30} />
    </div>
  );
};

export default Loader;
