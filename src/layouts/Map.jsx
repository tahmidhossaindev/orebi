import React from 'react'
import Container from '../components/Container'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


const Map = () => {
    return (
        <>
            <Container className={"pt-20"}>

                <div className="relative">
                    {/* <div style={{ width: '100%', height: '400px', overflow: 'hidden' }} className="absolute"> */}
                    <div className=" w-full h-143 overflow-hidden">

                        <iframe
                            title="Google Map Embed"
                            src="https://maps.google.com/maps?q=51.5074,-0.1278&z=15&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>

                    <div className="accordionsection font-orebi text-[16px] text-[#767676] bg-white absolute w-112.5 drop-shadow-[0_0px_16px_rgba(38,38,38,0.4)] px-5 py-5 transform top-[6%] left-[2.2%]">

                        <Accordion defaultValue={["shipping"]} className="max-w-lg">
                            <AccordionItem value="shipping">
                                <AccordionTrigger className={"font-bold text-[#262626]"}>Germany Office</AccordionTrigger>
                                <AccordionContent>

                                    <p className="">575 Crescent Ave. Quakertown, PA 18951</p>
                                    <p className="">575 Crescent Ave. Quakertown, PA 18951</p>

                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="returns">
                                <AccordionTrigger className={"font-bold text-[#262626]"}>Slovakia Office</AccordionTrigger>
                                <AccordionContent>


                                    <p className="">575 Crescent Ave. Quakertown, PA 18951</p>
                                    <p className="">575 Crescent Ave. Quakertown, PA 18951</p>
                                    <p className="">575 Crescent Ave. Quakertown, PA 18951</p>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="support">
                                <AccordionTrigger className={"font-bold text-[#262626]"}>Lithuania Office</AccordionTrigger>
                                <AccordionContent>
                                    <div className="font-orebi ">

                                        <p className="">575 Crescent Ave. Quakertown, PA 18951</p>
                                        <p className="">575 Crescent Ave. Quakertown, PA 18951</p>
                                        <p className="">575 Crescent Ave. Quakertown, PA 18951</p>
                                        <p className="">575 Crescent Ave. Quakertown, PA 18951</p>


                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>


                    </div>


                </div>





            </Container>


        </>
    )
}

export default Map