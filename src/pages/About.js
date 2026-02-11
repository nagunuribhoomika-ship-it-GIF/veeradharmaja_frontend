import aboutBg from "../assets/hero/about_bg.jpg";

function About() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative w-full h-[420px] overflow-hidden">
        
        {/* Background Image */}
        {/* <img
          src={aboutBg}
          alt="About Background"
          className="absolute inset-0 w-full h-full object-cover"
        /> */}

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center h-full px-10 text-white">
          <h1 className="text-4xl font-bold mb-2">About Us</h1>
          <p className="max-w-2xl text-lg">
            We are Veera Dharmaja Events, organizing weddings, birthdays,
            engagements, and corporate events with elegance and creativity.
          </p>

          {/* Breadcrumb */}
          <p className="mt-2 text-sm opacity-90">
            Home &nbsp;›&nbsp; About Us
          </p>
        </div>
      </div>

      {/* About Content Section */}
      <div className="bg-[#f5f2ec] px-10 py-16">
        <h2 className="text-3xl font-semibold mb-4">
          About Veera Dharmaja Events
        </h2>
        <p className="text-gray-700 max-w-4xl leading-7">
          At Veera Dharmaja Events, we don’t just organize events — we create
          unforgettable experiences. Our team specializes in weddings,
          engagements, birthday celebrations, and corporate events designed
          with creativity, elegance, and attention to detail.
        </p>
      </div>
    </div>
  );
}

export default About;
