import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

export default function AccordionUI({ content }) {
  const [open, setOpen] = React.useState(1);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  // console.log(content);
  return (
    <>
      {content &&
        Object.keys(content).map((weekKey, index) => {
          const week = content[weekKey];
          return (
            <Accordion key={weekKey} open={open === index}>
              <AccordionHeader
                onClick={() => handleOpen(index)}
                className="text-gray-500 hover:text-primary"
              >
                {week?.topic}
              </AccordionHeader>
              <AccordionBody className="text-gray-400">
                {week?.content}
              </AccordionBody>
            </Accordion>
          );
        })}
    </>
  );
}
