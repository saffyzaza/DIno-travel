import SearchBar from './SearchBar';

const HeroSection = () => {
  return (
    <div
      className="relative h-96 flex items-center justify-center text-white"
      style={{
        backgroundImage: "url('https://f.ptcdn.info/068/064/000/prs2sq69i8bZ4TfUbB4-o.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">สำรวจจังหวัดกาฬสินธุ์</h1>
        <p className="text-xl mb-8">ค้นพบสถานที่ท่องเที่ยวที่น่าสนใจและประสบการณ์ที่ไม่เหมือนใคร</p>
        <SearchBar />
      </div>
    </div>
  );
};

export default HeroSection;