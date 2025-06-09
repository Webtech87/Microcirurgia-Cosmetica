import React, { useState, useEffect, useRef } from 'react';
import './VideoTestimonials.css';
import {useTranslation} from "react-i18next";

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
  const {t} = useTranslation();
  const testimonials: VideoTestimonial[] = [
    {
      id: 1,
      videoUrl: "https://youtube.com/shorts/jOgsU2sbqIc?si=ADBorJH0p0zgvs0d",
      clientName: "Erica",
      treatment: t("s4.lt.0"),
      location: "Faro"
    },
    {
      id: 3,
      videoUrl: "https://youtube.com/shorts/InEXgVAIlZI?si=shok3t-naPvmXzxM",
      clientName: "Neuza",
      treatment: t("s4.lt.1"),
      location: "Faro"
    },
    {
      id: 5,
      videoUrl: "https://youtube.com/shorts/IewIM3txOnQ?si=pip9P61b3JjHsqMC",
      clientName: "Neide",
      treatment: t("s4.lt.2"),
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

  const getYouTubeVideoId = (url: string): string => {
    const regexes = [
      /youtu\.be\/([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/,
    ];

    for (const regex of regexes) {
      const match = url.match(regex);
      if (match && match[1]) {
        return match[1];
      }
    }

    return '';
  };

  const getVideoEmbedUrl = (url: string): string => {
    const videoId = getYouTubeVideoId(url);
    if (!videoId) return '';
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&cc_load_policy=0&fs=1&enablejsapi=1`;
  };

  // Auto-advance carousel
  useEffect(() => {
    if (!isPlaying && activeVideo === null) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, activeVideo, testimonials.length]);

  const handleDesktopVideoInteraction = (testimonialId: number) => {
    setActiveVideo(testimonialId);
    setIsPlaying(true);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setTimeout(() => {
      setIsPlaying(false);
      setActiveVideo(null);
    }, 30000);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(false);
    setActiveVideo(null);
  };

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
        <div className="video-testimonials__header">
          <h2 className="video-testimonials__title">
            {t("s4.title")}
          </h2>
          <p className="video-testimonials__subtitle">
            {t("s4.p")}.
          </p>
        </div>

        <div
          className="video-testimonials__carousel"
          onMouseEnter={isMobile ? undefined : handleMouseEnter}
          onMouseLeave={isMobile ? undefined : handleMouseLeave}
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
                  {activeVideo === testimonial.id ? (
                    <iframe
                      className="video-testimonials__video video-testimonials__video--playing"
                      src={getVideoEmbedUrl(testimonial.videoUrl)}
                      title={`${testimonial.clientName} - ${testimonial.treatment}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      sandbox="allow-scripts allow-same-origin allow-presentation"
                    />
                  ) : (
                    <div
                      className="video-testimonials__thumbnail"
                      onClick={() => handleDesktopVideoInteraction(testimonial.id)}
                      style={{
                        backgroundImage: `url(https://img.youtube.com/vi/${getYouTubeVideoId(testimonial.videoUrl)}/maxresdefault.jpg)`
                      }}
                    >
                      <div className="video-testimonials__play-overlay">
                        <div className="video-testimonials__play-button">
                          {/* Your play button SVG here */}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

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
