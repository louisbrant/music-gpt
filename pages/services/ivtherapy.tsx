import React from "react";
import ServiceCatPage from "@/components/Services/ServiceCat";

const IVTherapy: React.FC = () => {
    const mainService = "IV Therapy";
    const shortDescription = "";
    const heroVideoSrc = "/servicevideos/hero-video.mp4";
    const relatedVisuals = [
        "/serviceimages/NovaJoy.jpg",
        "/serviceimages/michaelb.jpg",
        "/serviceimages/cryowindow.jpg",
        "/serviceimages/sauna.jpg",
    ];

    const IVTherapy = {
        title: "IV Therapy",
        description:
            "Whether you're an athlete or you sit at a desk all day, Stretch Therapy is for you. A Muscle Lab Therapist will relieve your soreness one assisted stretch at a time.",
        products: [
            {
                category: "Cocktails",
                title: "Drip Name",
                description:
                    "Experience the benefits of IV Therapy, including weight loss, sore muscle relief, stress reduction, and detoxification.",
            },
            {
                category: "Cocktails",
                title: "Drip Name +",
                description:
                    "Experience the benefits of IV Therapy, including weight loss, sore muscle relief, stress reduction, and detoxification.",
            },
            {
                category: "Cocktails",
                title: "Drip Name",
                description:
                    "Experience the benefits of IV Therapy, including weight loss, sore muscle relief, stress reduction, and detoxification.",
            },
            {
                category: "Cocktails",
                title: "Drip Name +",
                description:
                    "Experience the benefits of IV Therapy, including weight loss, sore muscle relief, stress reduction, and detoxification.",
            },
            {
                category: "Cocktails",
                title: "Drip Name",
                description:
                    "Experience the benefits of IV Therapy, including weight loss, sore muscle relief, stress reduction, and detoxification.",
            },
            {
                category: "Cocktails",
                title: "Drip Name +",
                description:
                    "Experience the benefits of IV Therapy, including weight loss, sore muscle relief, stress reduction, and detoxification.",
            },
            {
                category: "Vitamin Shots",
                title: "Shot 1",
                description:
                    "Experience Vitamin Shots Descriotion Here lol lol lol",
            },
            {
                category: "Vitamin Shots",
                title: "Shot 2",
                description:
                    "Description",
            },
            {
                category: "Vitamin Shots",
                title: "Shot 3",
                description:
                    "Description",
            },
            {
                category: "Vitamin Shots",
                title: "Shot 4",
                description:
                    "Experience Vitamin Shots Descriotion Here",
            },
            {
                category: "Vitamin Shots",
                title: "Shot 5",
                description:
                    "Description",
            },
            {
                category: "Vitamin Shots",
                title: "Shot 6",
                description:
                    "Description",
            },
            {
                category: "NAD+ IV Therapy",
                title: "Silver",
                description:
                    "Description here please so it goes here lol lol lol",
            },
            {
                category: "NAD+ IV Therapy",
                title: "Gold",
                description:
                    "Description",
            },
            {
                category: "NAD+ IV Therapy",
                title: "Platinum",
                description:
                    "Description",
            },

        ],
    };
    return (
        <>
            <ServiceCatPage
                mainService={IVTherapy.title}
                shortDescription={IVTherapy.description}
                heroVideoSrc={heroVideoSrc}
                relatedVisuals={relatedVisuals}
                secondaryTitle={IVTherapy.title}
                secondarySubtitle={IVTherapy.description}
                secondaryCTA={IVTherapy.title}
                products={IVTherapy.products}
            />
        </>
    );
};

export default IVTherapy;