"use client";

import { useEffect, useState } from "react";
import EditBox from "./editbox";
import Question from "./question";

export default function Page() {
    return (
        <section className="w-[770px] pt-[12px]">
           <Question />
        </section>
    );
};
