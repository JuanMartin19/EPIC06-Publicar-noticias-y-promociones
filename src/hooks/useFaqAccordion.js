import { useState } from 'react';

export function useFaqAccordion() {
  const [abiertoIndex, setAbiertoIndex] = useState(null);

  const toggle = (index) => {
    setAbiertoIndex((prev) => (prev === index ? null : index));
  };

  return { abiertoIndex, toggle };
}