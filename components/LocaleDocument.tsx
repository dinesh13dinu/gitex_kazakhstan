"use client";
import { useEffect } from "react";
export function LocaleDocument({locale}:{locale:"en"|"ru"}){useEffect(()=>{document.documentElement.lang=locale},[locale]);return null}
