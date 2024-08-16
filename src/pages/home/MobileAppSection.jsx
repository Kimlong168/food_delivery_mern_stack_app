import { assets } from "../../assets/assets";
const MobileAppSection = () => {
  return (
    <section className="my-16" id="mobile-app">
      <h2 className="text-4xl font-semibold text-center capitalize md:w-[50%] mx-auto">
        for better experience, Download tomato app
      </h2>
      <div className="flex items-center justify-center gap-5 mt-10 w-full">
        <img
          className="w-[120px] md:w-[200px]"
          src={assets.app_store}
          alt="app_store"
        />
        <img
          className="w-[120px] md:w-[200px]"
          src={assets.play_store}
          alt="play_store"
        />
      </div>
    </section>
  );
};

export default MobileAppSection;
