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
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Sample testimonial data - replace with your actual video URLs
  const testimonials: VideoTestimonial[] = [
    {
      id: 1,
      videoUrl: "https://youtube.com/shorts/jOgsU2sbqIc?si=ADBorJH0p0zgvs0d",
      clientName: "Erica",
      treatment: "Micro lifting de sobrancelha",
      location: "Faro"
    },
    {
      id: 3,
      videoUrl: "https://youtube.com/shorts/InEXgVAIlZI?si=shok3t-naPvmXzxM",
      clientName: "Neuza",
      treatment: "Tratamento Facial Rejuvenescimento",
      location: "Faro"
    },
    {
      id: 5,
      videoUrl: "https://youtube.com/shorts/-UfHWrocS4A?si=f0WzKkusnUQBJPP6",
      clientName: "Neide",
      treatment: "Micro lifting de suturas ancoradas",
      location: "Albufeira"
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

  // Convert YouTube Shorts to regular video URL
  const getVideoEmbedUrl = (url: string): string => {
    const videoId = getYouTubeVideoId(url);
    if (!videoId) return '';
    
    // Use consistent embed URL for both mobile and desktop
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&cc_load_policy=0&fs=1&enablejsapi=1`;
  };

  // Get YouTube app URL for mobile direct opening
  const getYouTubeAppUrl = (url: string): string => {
    const videoId = getYouTubeVideoId(url);
    if (!videoId) return url;
    
    // Return the original YouTube URL for mobile app opening
    return `https://www.youtube.com/watch?v=${videoId}`;
  };

  // Auto-advance carousel
  useEffect(() => {
    if (!isPlaying && activeVideo === null) {
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
  }, [isPlaying, activeVideo, testimonials.length]);

  // Handle mobile video click - open in YouTube app/browser
  const handleMobileVideoClick = (testimonial: VideoTestimonial) => {
    // Open YouTube video in new tab/app
    const youtubeUrl = getYouTubeAppUrl(testimonial.videoUrl);
    window.open(youtubeUrl, '_blank', 'noopener,noreferrer');
  };

  // Handle desktop video interaction
  const handleDesktopVideoInteraction = (testimonialId: number) => {
    setActiveVideo(testimonialId);
    setIsPlaying(true);
    
    // Pause auto-advance when user interacts with video
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Resume auto-advance after 30 seconds of interaction
    setTimeout(() => {
      setIsPlaying(false);
      setActiveVideo(null);
    }, 30000);
  };

  // Handle dot navigation
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(false);
    setActiveVideo(null);
  };

  // Pause auto-advance on hover
  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (!isPlaying && activeVideo === null) {
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
                    // Mobile: Show thumbnail with click to open in YouTube app
                    <div 
                      className="video-testimonials__mobile-container"
                      onClick={() => handleMobileVideoClick(testimonial)}
                    >
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
                        <div className="video-testimonials__mobile-hint">
                          <span>Toque para abrir no YouTube</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Desktop: Show thumbnail or iframe based on active state
                    <div className="video-testimonials__desktop-container">
                      {activeVideo === testimonial.id ? (
                        <iframe
                          className="video-testimonials__video video-testimonials__video--playing"
                          src={getVideoEmbedUrl(testimonial.videoUrl)}
                          title={`${testimonial.clientName} - ${testimonial.treatment}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          sandbox="allow-scripts allow-same-origin allow-presentation"
                        />
                      ) : (
                        <div 
                          className="video-testimonials__desktop-thumbnail"
                          onClick={() => handleDesktopVideoInteraction(testimonial.id)}
                          style={{
                            backgroundImage: `url(https://img.youtube.com/vi/${getYouTubeVideoId(testimonial.videoUrl)}/maxresdefault.jpg)`
                          }}
                        >
                          <div className="video-testimonials__play-overlay">
                            <div className="video-testimonials__play-button">
                              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                                <circle cx="40" cy="40" r="40" fill="rgba(244, 208, 63, 0.9)"/>
                                <path d="M32 25L55 40L32 55V25Z" fill="#2c2c2c"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
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