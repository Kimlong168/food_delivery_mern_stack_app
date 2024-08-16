import { assets } from "../../assets/assets";
const HeroSection = () => {
  return (
    <section className="mt-5 ">
      <div className="w-full relative ">
        <div>
          <img
            className="w-full min-h-[300px] object-cover rounded-xl"
            src={assets.header_img}
            alt="header_img"
          />
        </div>
        <div className="absolute bottom-5 left-5 lg:bottom-[40px] lg:left-[40px] xl:bottom-[50px] xl:left-[80px] lg:right-[45%] text-white">
          <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-semibold flex flex-col lg:gap-5">
            <span>Order your </span>
            <span>favorite food here</span>
          </h3>
          <p className="mt-2 md:mt-4 lg:mt-8">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus
            modi quam, eos sint voluptates vitae iusto commodi praesentium eius
            ab illo quod asperiores qui, quaerat magni minima velit
            exercitationem. Reprehenderit!
          </p>
          <a href="#menu">
            <button className="bg-white/80 rounded-full px-5 py-2 text-black mt-6">
              View Menu
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
