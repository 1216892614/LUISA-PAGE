"use client";

import dayjs from "dayjs";
import { useEffect, useState } from "react";

const NowTimeString = () => {
    const [str, setStr] = useState("");

    useEffect(() => {
        setStr(dayjs().format("HH:mm:ss"));

        const timeout = setInterval(
            () => setStr(dayjs().format("HH:mm:ss")),
            1000
        );

        return () => clearInterval(timeout);
    }, []);

    return <>{str}</>;
};

export default NowTimeString;
