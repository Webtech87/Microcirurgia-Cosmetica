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
  const [isMobile, setIsMobile] = useState(false);
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

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string): string => {
    const match = url.match(/(?:youtube\.com\/shorts\/|youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : '';
  };

  // Convert YouTube Shorts to regular video URL for mobile
  const getVideoEmbedUrl = (url: string): string => {
    const videoId = getYouTubeVideoId(url);
    if (!videoId) return '';
    
    if (isMobile) {
      // For mobile, use nocookie domain and additional parameters to prevent redirects
      return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=0&mute=0&controls=1&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&cc_load_policy=0&disablekb=1&origin=${window.location.origin}&enablejsapi=1&widgetid=1`;
    } else {
      // For desktop, use standard embed
      return `https://www.youtube.com/embed/${videoId}?autoplay=0&mute=0&controls=1&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&cc_load_policy=0&disablekb=1`;
    }
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

  // Handle video interaction with mobile considerations
  const handleVideoInteraction = (e: React.MouseEvent) => {
    if (isMobile) {
      // Prevent default mobile behavior
      e.preventDefault();
      e.stopPropagation();
    }
    
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
                  {isMobile ? (
                    // Mobile: Use a clickable overlay that opens video in a controlled way
                    <div className="video-testimonials__mobile-container">
                      <div 
                        className="video-testimonials__mobile-thumbnail"
                        style={{
                          backgroundImage: `url(https://img.youtube.com/vi/${getYouTubeVideoId(testimonial.videoUrl)}/maxresdefault.jpg)`
                        }}
                      >
                        <div className="video-testimonials__play-overlay">
                          <div className="video-testimonials__play-button">
                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                              <circle cx="30" cy="30" r="30" fill="rgba(244, 208, 63, 0.9)"/>
                              <path d="M25 20L40 30L25 40V20Z" fill="#2c2c2c"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <iframe
                        className={`video-testimonials__video ${isPlaying ? 'video-testimonials__video--playing' : ''}`}
                        src={isPlaying ? getVideoEmbedUrl(testimonial.videoUrl) : ''}
                        title={`${testimonial.clientName} - ${testimonial.treatment}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
                      />
                    </div>
                  ) : (
                    // Desktop: Direct iframe embed
                    <iframe
                      className="video-testimonials__video"
                      src={getVideoEmbedUrl(testimonial.videoUrl)}
                      title={`${testimonial.clientName} - ${testimonial.treatment}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      onClick={handleVideoInteraction}
                      sandbox="allow-scripts allow-same-origin allow-presentation"
                    />
                  )}
                </div>

                {/* Mobile Play Button Overlay */}
                {isMobile && !isPlaying && (
                  <div 
                    className="video-testimonials__mobile-play-trigger"
                    onClick={handleVideoInteraction}
                  >
                    <span>Toque para reproduzir</span>
                  </div>
                )}

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