import { useEffect, useRef, useState } from "react";
import "./StatCard.css";

function StatCard({
                      text,
                      value,
                      suffix = "+",
                      duration = 3000
                  }) {
    const cardRef = useRef(null);

    const [isVisible, setIsVisible] = useState(false);
    const [count, setCount] = useState(0);

    // يراقب متى يظهر الكرت في الشاشة
    useEffect(() => {
        const card = cardRef.current;

        if (!card) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);

                    // إيقاف المراقبة حتى لا يعمل العداد مرة ثانية
                    observer.unobserve(card);
                }
            },
            {
                threshold: 0.5
            }
        );

        observer.observe(card);

        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        const targetNumber = Number(value);

        if (!Number.isFinite(targetNumber) || targetNumber <= 0) {
            return;
        }

        let currentNumber = 0;

        const intervalSpeed = Math.max(
            duration / targetNumber,
            10
        );

        const counter = setInterval(() => {
            currentNumber += 3;

            if (currentNumber >= targetNumber) {
                setCount(targetNumber);
                clearInterval(counter);
            } else {
                setCount(currentNumber);
            }
        }, intervalSpeed);

        return () => {
            clearInterval(counter);
        };
    }, [isVisible, value, duration]);

    return (
        <div
            ref={cardRef}
            className="stat-card"
        >


            <p className="stat-card-value" dir="ltr">
                {count}
                <span>{suffix}</span>
            </p>


            <div className="stat-card-header">


                <span className="stat-card-text">
                    {text}
                </span>
            </div>
        </div>
    );
}

export default StatCard;