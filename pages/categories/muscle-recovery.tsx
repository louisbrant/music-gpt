import React from "react";
import ServiceCatPage from "@/components/Services/ServiceCat";

const MuscleRecovery: React.FC = () => {
  const mainService = "Muscle Recovery";
  const shortDescription = "";
  const heroVideoSrc = "/servicevideos/hero-video.mp4";
    const relatedVisuals = [
        "/serviceimages/NovaJoy.jpg",
        "/serviceimages/michaelb.jpg",
        "/serviceimages/cryowindow.jpg",
        "/serviceimages/sauna.jpg",
    ];

  const muscleRecovery = {
    title: "Muscle Recovery",
    description:
      "Whether you're an athlete or you sit at a desk all day, Stretch Therapy is for you. A Muscle Lab Therapist will relieve your soreness one assisted stretch at a time.",
    products: [
        {
            category: "Stretch Therapy",
            title: "Standard",
            description:
                "Improve posture and mobility, decrease pain, stress, risk of injury, improve flexibility and accelerate performance.",
        },
        {
            category: "Myofasical Release",
            title: "Plus",
            description:
                "Allow our experienced therapists to create a personalized recovery plan tailored to your goals and concerns with various level options.",
        },
        {
            category: "Cupping Therapy",
            title: "Pro",
            description:
                "Improve posture and mobility, decrease pain, stress, risk of injury, improve flexibility and accelerate performance.",
              },
            ],
          };
  return (
    <>
      <ServiceCatPage
        mainService={muscleRecovery.title}
        shortDescription={muscleRecovery.description}
        heroVideoSrc={heroVideoSrc}
        relatedVisuals={relatedVisuals}
        secondaryTitle={muscleRecovery.title}
        secondarySubtitle={muscleRecovery.description}
        secondaryCTA={muscleRecovery.title}
        products={muscleRecovery.products}
      />
    </>
  );
};

export default MuscleRecovery;