import React from "react";
import ServiceCatPage from "@/components/Services/ServiceCat";

const CryoHeat: React.FC = () => {
  const mainService = "Cryo & Heat";
  const shortDescription = "";
  const heroVideoSrc = "/servicevideos/hero-video.mp4";
    const relatedVisuals = [
        "/serviceimages/NovaJoy.jpg",
        "/serviceimages/michaelb.jpg",
        "/serviceimages/cryowindow.jpg",
        "/serviceimages/sauna.jpg",
    ];

  const CryoHeat = {
    title: "Cryo & Heat",
    description:
      "Whether you're an athlete or you sit at a desk all day, Stretch Therapy is for you. A Muscle Lab Therapist will relieve your soreness one assisted stretch at a time.",
    products: [
        {
            category: "Infrared Sauna",
            title: "Heat",
            description:
                "Experience the benefits of red light therapy, including weight loss, sore muscle relief, stress reduction, and detoxification.",
        },
        {
          category: "Infrared Sauna",
          title: "Heat +",
          description:
              "Feel the heat. Get all the benefits from our infrared sauna with a full hour session.",
            },
            {
            category: "Cryotherapy",
            title: "Whole Body",
            description:
                "Experience whole body cryotherapy for a comprehensive approach to recovery.",
              },
              {
                  category: "Cryotherapy",
                  title: "Focused",
                  description:
                    "Put away that soggy ice pack and target specific areas with localized cryotherapy.",
                },
                {
                  category: "Cryotherapy",
                  title: "Facial",
                  description:
                    "Rejuvenate your face with our soothing cryofacial treatment.",
                },
              ],
            };
  return (
    <>
      <ServiceCatPage
        mainService={CryoHeat.title}
        shortDescription={CryoHeat.description}
        heroVideoSrc={heroVideoSrc}
        relatedVisuals={relatedVisuals}
        secondaryTitle={CryoHeat.title}
        secondarySubtitle={CryoHeat.description}
        secondaryCTA={CryoHeat.title}
        products={CryoHeat.products}
      />
    </>
  );
};

export default CryoHeat;