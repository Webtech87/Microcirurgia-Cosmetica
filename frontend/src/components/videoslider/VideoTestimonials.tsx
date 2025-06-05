import React, { useState, useEffect, useRef } from 'react';
import './VideoTestimonials.css';

interface VideoTestimonial {
  id: number;
  videoUrl: string;
  clientName: string;
  treatment: string;
  location: string;
}

const VideoTestimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Sample testimonial data - replace with your actual video URLs
  const testimonials: VideoTestimonial[] = [
    {
      id: 1,
      videoUrl: "https://youtube.com/shorts/jOgsU2sbqIc?si=ADBorJH0p0zgvs0d",
      clientName: "Maria Silva",
      treatment: "Micro lifting de sobrancelha",
      location: "Lisboa"
    },
    {
      id: 2,
      videoUrl: "https://youtube.com/shorts/jOgsU2sbqIc?si=DYQw759e4hp5U1Ga",
      clientName: "João Santos",
      treatment: "Micro bichectomia superior",
      location: "Porto"
    },
    {
      id: 3,
      videoUrl: "https://youtube.com/shorts/InEXgVAIlZI?si=shok3t-naPvmXzxM",
      clientName: "Ana Costa",
      treatment: "Micro lifting deep face",
      location: "Coimbra"
    },
    {
      id: 4,
      videoUrl: "https://youtube.com/shorts/OLeZRk9ApRY?si=uMbkEjG-OPwOGkd5",
      clientName: "Pedro Oliveira",
      treatment: "Mini mass lifting",
      location: "Braga"
    },
  ];

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string): string => {
    const match = url.match(/(?:youtube\.com\/shorts\/|youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : '';
  };

  // Auto-advance carousel
  useEffect(() => {
    if (!isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); // Change every 5 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, testimonials.length]);

  // Handle video interaction (clicking on iframe)
  const handleVideoInteraction = () => {
    setIsPlaying(true);
    
    // Pause auto-advance when user interacts with video
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Resume auto-advance after 30 seconds of interaction
    setTimeout(() => {
      setIsPlaying(false);
    }, 30000);
  };

  // Handle dot navigation
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(false);
  };

  // Pause auto-advance on hover
  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (!isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
    }
  };

  return (
    <section className="video-testimonials">
      <div className="video-testimonials__container">
        {/* Section Header */}
        <div className="video-testimonials__header">
          <h2 className="video-testimonials__title">
            Experiências Reais
          </h2>
          <p className="video-testimonials__subtitle">
            Descubra como a nossa microcirurgia cosmética transformou a vida dos nossos clientes
          </p>
        </div>

        {/* Video Carousel */}
        <div 
          className="video-testimonials__carousel"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            className="video-testimonials__track"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`video-testimonials__slide ${
                  index === currentIndex ? 'video-testimonials__slide--active' : ''
                }`}
              >
                <div className="video-testimonials__video-container">
                  <iframe
                    className="video-testimonials__video"
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(testimonial.videoUrl)}?autoplay=0&mute=0&controls=1&rel=0&modestbranding=1`}
                    title={`${testimonial.clientName} - ${testimonial.treatment}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onClick={handleVideoInteraction}
                  />
                </div>

                {/* Client Info */}
                <div className="video-testimonials__info">
                  <h3 className="video-testimonials__client-name">
                    {testimonial.clientName}
                  </h3>
                  <p className="video-testimonials__treatment">
                    {testimonial.treatment}
                  </p>
                  <p className="video-testimonials__location">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Dots */}
        <div className="video-testimonials__dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`video-testimonials__dot ${
                index === currentIndex ? 'video-testimonials__dot--active' : ''
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="video-testimonials__progress">
          <div 
            className="video-testimonials__progress-bar"
            style={{
              width: `${((currentIndex + 1) / testimonials.length) * 100}%`
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default VideoTestimonials;