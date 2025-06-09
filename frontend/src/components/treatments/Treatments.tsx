import React, {useState} from 'react';
import './Treatments.css';
import {useTranslation} from 'react-i18next';

interface Treatment {
    id: number;
    title: string;
    description: string;
    subtypes?: { name: string; description: string }[];
}

const Treatments: React.FC = () => {
    const {t} = useTranslation();
    const [activeItem, setActiveItem] = useState<number | null>(null);

    const treatments: Treatment[] = [
        {
            id: 1,
            title: t("s3.lt.1.title"),
            description: t("s3.lt.1.p"),
            subtypes: [
                {
                    name: t("s3.lt.1.lt.0.title"),
                    description: t("s3.lt.1.lt.0.p")
                },
                {
                    name: t("s3.lt.1.lt.1.title"),
                    description: t("s3.lt.1.lt.1.p")
                }
            ]
        },
        {
            id: 2,
            title: t("s3.lt.2.title"),
            description: t("s3.lt.2.p"),
            subtypes: [
                {
                    name: t("s3.lt.2.lt.0.title"),
                    description: t("s3.lt.2.lt.0.p")
                },
                {
                    name: t("s3.lt.2.lt.1.title"),
                    description: t("s3.lt.2.lt.1.p")
                },
                {
                    name: t("s3.lt.2.lt.0.title"),
                    description: t("s3.lt.2.lt.0.p")
                },

            ]
        },
        {
            id: 3,
            title: t("s3.lt.3.title"),
            description: t("s3.lt.3.p")
        },
        {
            id: 4,
            title: t("s3.lt.4.title"),
            description: t("s3.lt.4.p"),
            subtypes: [
                {
                    name: t("s3.lt.4.lt.0.title"),
                    description: t("s3.lt.4.lt.0.p")
                },
                {
                    name: t("s3.lt.4.lt.1.title"),
                    description: t("s3.lt.4.lt.1.p")
                },
                {
                    name: t("s3.lt.4.lt.2.title"),
                    description: t("s3.lt.4.lt.2.p")
                }
            ]
        },
        {
            id: 5,
            title: t("s3.lt.5.title"),
            description: t("s3.lt.5.p")
        }
    ];

    const toggleItem = (id: number) => {
        setActiveItem(activeItem === id ? null : id);
    };

    return (
        <section id="treatments" className="treatments">
            <div className="treatments__container">
                {/* Left Content Section */}
                <div className="treatments__content">
                    <div className="treatments__text">
                        <h2 className="treatments__title">
                            {t("s3.title")}
                        </h2>

                        <p className="treatments__subtitle">
                            {t("s3.p")}
                        </p>

                        {/* Accordion List */}
                        <div className="treatments__accordion">
                            {treatments.map((treatment) => (
                                <div
                                    key={treatment.id}
                                    className={`treatments__item ${activeItem === treatment.id ? 'treatments__item--active' : ''}`}
                                >
                                    <button
                                        className="treatments__item-header"
                                        onClick={() => toggleItem(treatment.id)}
                                        aria-expanded={activeItem === treatment.id}
                                        aria-controls={`treatment-${treatment.id}`}
                                    >
                    <span className="treatments__item-number">
                      {treatment.id.toString().padStart(2, '0')}
                    </span>
                                        <span className="treatments__item-title">
                      {treatment.title}
                    </span>
                                        <span
                                            className={`treatments__item-arrow ${activeItem === treatment.id ? 'treatments__item-arrow--active' : ''}`}>
                      ▼
                    </span>
                                    </button>

                                    <div
                                        id={`treatment-${treatment.id}`}
                                        className={`treatments__item-content ${activeItem === treatment.id ? 'treatments__item-content--active' : ''}`}
                                    >
                                        <div className="treatments__item-description">
                                            {treatment.description}

                                            {/* Subtypes */}
                                            {treatment.subtypes && (
                                                <div className="treatments__subtypes">
                                                    {treatment.subtypes.map((subtype, index) => (
                                                        <div key={index} className="treatments__subtype">
                                                            <h4 className="treatments__subtype-title">
                                                                {subtype.name}
                                                            </h4>
                                                            <p className="treatments__subtype-description">
                                                                {subtype.description}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Image Section */}
                <div className="treatments__image-section">
                    <div className="treatments__image-container">
                        <div className="treatments__image-wrapper">
                            <img
                                src="/images/claudia.PNG"
                                alt="Tratamentos Microcirurgia Santiclinic - Antes e Depois"
                                className="treatments__image"
                            />
                        </div>
                        {/* Yellow curved background */}
                        <div className="treatments__accent-bg"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Treatments;