import React from "react";
import ServiceCatPage from "@/components/Services/ServiceCat";

const CryoSkin: React.FC = () => {
  const mainService = "CryoSkin";
  const shortDescription = "";
  const heroVideoSrc = "/servicevideos/hero-video.mp4";
    const relatedVisuals = [
        "/serviceimages/NovaJoy.jpg",
        "/serviceimages/michaelb.jpg",
        "/serviceimages/cryowindow.jpg",
        "/serviceimages/sauna.jpg",
    ];

  const CryoSkin = {
    title: "CryoSkin",
    description:
      "Whether you're an athlete or you sit at a desk all day, Stretch Therapy is for you. A Muscle Lab Therapist will relieve your soreness one assisted stretch at a time.",
    products: [
        {
            category: "CryoSlimming",
            title: "Standard",
            description:
                "Improve posture and mobility, decrease pain, stress, risk of injury, improve flexibility and accelerate performance.",
        },
        {
            category: "CryoTonning",
            title: "Plus",
            description:
                "Allow our experienced therapists to create a personalized recovery plan tailored to your goals and concerns with various level options.",
        },
            ],
          };
  return (
    <>
      <ServiceCatPage
        mainService={CryoSkin.title}
        shortDescription={CryoSkin.description}
        heroVideoSrc={heroVideoSrc}
        relatedVisuals={relatedVisuals}
        secondaryTitle={CryoSkin.title}
        secondarySubtitle={CryoSkin.description}
        secondaryCTA={CryoSkin.title}
        products={CryoSkin.products}
      />
    </>
  );
};

export default CryoSkin;