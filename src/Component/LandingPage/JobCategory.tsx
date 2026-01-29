import { Carousel } from "@mantine/carousel";
import { jobCategory } from "../../Data/Data";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { Skeleton } from "@mantine/core";
import { useEffect, useState } from "react";

const JobCategory = () => {
    const [loading, setLoading] = useState(true);

    // simulate readiness (images / data)
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 600);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="mt-20 pb-5"> 
            {loading ? (
                <div className="flex flex-col items-center gap-3 mb-10">
                    <Skeleton height={40} width={360} radius="md" />
                    <Skeleton height={20} width={520} radius="md" />
                </div>
            ) : (
                <>
                    <div className="text-4xl md-mx:text-3xl sm-mx:text-2xl xs-mx:text-xl mb-3 text-center font-bold text-mine-shaft-100 [&>span]:text-bright-sun-400">
                        Browse <span>Job</span> Category
                    </div>
                    <div className="text-lg sm-mx:text-base xs-mx:text-sm mb-10 mx-auto text-mine-shaft-300 text-center w-1/2 sm-mx:w-11/12">
                        Explore diverse job opportunities tailored to your skills. Start your career journey today!
                    </div>
                </>
            )}
 
            <Carousel
                slideSize="22%"
                slideGap="md"
                emblaOptions={{ loop: true }}
                className="focus-visible:[&_button]:!outline-none [&_button]:!bg-bright-sun-400 [&_button]:!border-none [&_button]:hover:opacity-75 [&_button]:opacity-0 hover:[&_button]:opacity-100"
                nextControlIcon={<IconArrowRight className="h-8 w-8" />}
                previousControlIcon={<IconArrowLeft className="h-8 w-8" />}
            >
                {(loading ? Array.from({ length: 6 }) : jobCategory).map(
                    (category: any, idx: number) => (
                        <Carousel.Slide key={idx}>
                            <div className="flex flex-col items-center w-64 sm-mx:w-56 xs-mx:w-48 gap-2 my-5 border border-bright-sun-400 p-5 rounded-lg">
                                {loading ? (
                                    <>
                                        <Skeleton height={48} width={48} radius="xl" />
                                        <Skeleton height={22} width="70%" radius="md" />
                                        <Skeleton height={14} width="90%" radius="md" />
                                        <Skeleton height={18} width="60%" radius="md" />
                                    </>
                                ) : (
                                    <>
                                        <div className="p-2 bg-bright-sun-300 rounded-full">
                                            <img
                                                className="h-8 w-8 sm-mx:h-6 sm-mx:w-6 xs-mx:h-4 xs-mx:w-4"
                                                src={`/Category/${category.name}.png`}
                                                alt={category.name}
                                            />
                                        </div>

                                        <div className="text-mine-shaft-100 text-xl sm-mx:text-lg xs-mx:text-base font-semibold">
                                            {category.name}
                                        </div>
                                        <div className="text-sm xs-mx:text-xs text-mine-shaft-300 text-center">
                                            {category.desc}
                                        </div>
                                        <div className="text-bright-sun-300 text-lg sm-mx:text-base xs-mx:text-sm">
                                            {category.jobs}+ new jobs posted
                                        </div>
                                    </>
                                )}
                            </div>
                        </Carousel.Slide>
                    )
                )}
            </Carousel>
        </div>
    );
};

export default JobCategory;
