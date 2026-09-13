import { motion } from "framer-motion";
import "./cards.css";
import { useTranslation } from "react-i18next";

import Card1 from "../../assets/card1.png";
import Card2 from "../../assets/card2.png";
import Card3 from "../../assets/card3.png";
import Card4 from "../../assets/card4.png";
import Card5 from "../../assets/card5.png";
import Card6 from "../../assets/card6.png";
import Pattern from "../../assets/pattern.png";

// القيم الأصلية كانت px على أساس عرض تصميم 1440px
// تم تحويلها لـ vw عشان تحافظ على نسبتها من عرض الشاشة (px ÷ 1440 × 100)

const cards = [
    { image: Card5, x: "-27.78vw", rotate: -7 }, // -400px
    { image: Card3, x: "2.08vw", rotate: 0 },     // 30px
    { image: Card1, x: "26.67vw", rotate: 7 },    // 384px
    { image: Card2, x: "14.58vw", rotate: 4 },    // 210px
    { image: Card4, x: "-13.61vw", rotate: -4 },  // -196px
    { image: Card6, x: "-41.67vw", rotate: -12 }, // -600px
];

const initialCards = [
    { x: "-7.29vw", y: "1.04vw", rotate: -40 }, // fifth  (-105px, 15px)
    { x: "-7.29vw", y: "1.04vw", rotate: -30 }, // third
    { x: "-7.29vw", y: "1.04vw", rotate: -20 }, // First
    { x: "-7.29vw", y: "1.04vw", rotate: -25 }, // second
    { x: "-7.29vw", y: "1.04vw", rotate: -35 }, // fourth
    { x: "-7.29vw", y: "1.04vw", rotate: -45 }, // sixth
];

export default function Cards() {
    const { t } = useTranslation();
    return (
        <div className="hero" id="discoverLiwan">
            <div className={"liwan_cardsAndDescription_container"}>
                <p className="discover-liwan">{t("cards.title")}</p>
                <div className="card-container">
                    {cards.map((card, index) => (
                        <motion.img
                            key={index}
                            src={card.image}
                            alt=""
                            className="card-image"

                            initial={{
                                x: initialCards[index].x,
                                y: initialCards[index].y,
                                rotate: initialCards[index].rotate,
                                scale: 0.8,
                            }}

                            whileInView={{
                                x: card.x,
                                y: 0,
                                rotate: card.rotate,
                                scale: 1,
                            }}

                            viewport={{
                                once: true,
                                amount: 0.3,
                            }}

                            transition={{
                                duration: 1,
                                delay: 0.5,
                                type: "spring",
                                stiffness: 120,
                                damping: 18,
                            }}

                            style={{
                                zIndex: 10 - Math.abs(index - 2),
                            }}
                        />
                    ))}
                </div>
                <p className="description">{t("cards.description")}</p>
            </div>
            <img className="Pattern" src={Pattern} alt="Pattern" />

            <motion.div
                className="card-overlay"

                initial={{
                    width: "55.56vw",  // 800px
                    height: "27.78vw", // 400px
                    left: "calc(50% - 31.7vw)", // 913px/2 (≈ 0.5px الإضافية تم تجاهلها لأنها غير مؤثرة)
                    top: "-35%",
                }}

                whileInView={{
                    width: "88.89vw",  // 1280px
                    height: "24.31vw", // 350px
                    left: "calc(50% - 44.44vw)", // 1280px/2
                    top: "20%",
                }}

                viewport={{
                    once: true,
                    amount: 0.1,
                }}

                transition={{
                    duration: 1,
                    delay: 0.5,
                    ease: "easeInOut",
                }}
            />


        </div>
    );
}