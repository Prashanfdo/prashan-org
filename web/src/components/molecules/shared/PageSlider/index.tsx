import { A11y, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

function PageSlider({ images }: { images: string[] }) {
  return (
    <div>
      <Swiper
        className="page-slider"
        modules={[Navigation, A11y]}
        spaceBetween={100}
        slidesPerView={1}
        navigation
        scrollbar={{ draggable: true }}
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <img className="w-full object-cover rounded overflow-hidden shadow-xl border" src={image} alt={image} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default PageSlider;
