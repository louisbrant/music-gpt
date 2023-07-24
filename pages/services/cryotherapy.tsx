import React from "react";
import ServiceTemplate from "@/components/Services/ServiceTemplate";

const Cryotherapy: React.FC = () => {
    const mainService = "Cryotherapy";
    const shortDescription = "Whether you're an athlete or you sit at a desk all day, Level is for you. A Muscle Lab Therapist will relieve your soreness one assisted stretch at a time.";
    const heroVideoSrc = "/servicevideos/hero-video.mp4";
    const relatedVisuals = [
        "/serviceimages/NovaJoy.jpg",
        "/serviceimages/michaelb.jpg",
        "/serviceimages/cryowindow.jpg",
        "/serviceimages/sauna.jpg",
    ];

    const serviceDetails = {
        title: "Cryotherapy",
        description:
            "Whether you're an athlete or you sit at a desk all day, Cryotherapy is for you. A Muscle Lab Therapist will relieve your soreness one assisted stretch at a time.",
        benefit: "Cryotherapy Benefits",
        products: [
            {
                category: "Level",
                title: "Standard",
                description:
                    "Improve posture and mobility, decrease pain, stress, risk of injury, improve flexibility and accelerate performance.",
            },
            {
                category: "Level",
                title: "Plus",
                description:
                    "Allow our experienced therapists to create a personalized recovery plan tailored to your goals and concerns with various level options.",
            },
            {
                category: "Level",
                title: "Pro",
                description:
                    "Improve posture and mobility, decrease pain, stress, risk of injury, improve flexibility and accelerate performance.",
            },
            {
                category: "Level",
                title: "Max",
                description:
                    "Allow our experienced therapists to create a personalized recovery plan tailored to your goals and concerns with various level options.",
            },
            {
                category: "Region",
                title: "Focused",
                description:
                    "Choose from a range of regional options for targeted or comprehensive recovery support.",
            },
            {
                category: "Region",
                title: "Upper Body",
                description:
                    "Choose from a range of regional options for targeted or comprehensive recovery support.",
            },
            {
                category: "Region",
                title: "Lower Body",
                description:
                    "Choose from a range of regional options for targeted or comprehensive recovery support.",
            },
            {
                category: "Region",
                title: "Whole Body",
                description:
                    "Choose from a range of regional options for targeted or comprehensive recovery support.",
            },
        ],
    };
    return (
        <ServiceTemplate
            mainService={serviceDetails.title}
            shortDescription={serviceDetails.description}
            heroVideoSrc={heroVideoSrc}
            specificService={serviceDetails.benefit}
            relatedVisuals={relatedVisuals}
            secondaryTitle={serviceDetails.title}
            secondarySubtitle={serviceDetails.description}
            secondaryCTA={serviceDetails.title}
            products={serviceDetails.products}
        />
    );
};

export default Cryotherapy;