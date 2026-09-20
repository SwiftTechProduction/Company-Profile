import { useEffect, useState } from 'react';
import { Circle } from 'lucide-react';

type Team = {
    login: {
        uuid: string;
    };
    name: {
        first: string;
        last: string;
    };
    picture: {
        large: string;
    };
};

const TeamsPage = () => {

    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);

    // Role kita buat sendiri karena RandomUser tidak punya data jabatan
    const roles = [
        "Business Director",
        "Technology Manager",
        "Business Development",
        "Marketing Manager",
        "Operations Manager",
        "Creative Director"
    ];

    // Bio juga kita sesuaikan sendiri
    const bios = [
        "Leading business strategy, growth, and long-term development across Herdian Group.",
        "Managing technology initiatives and supporting innovation across the group.",
        "Developing partnerships and identifying new business opportunities.",
        "Building brand awareness and strengthening relationships with customers.",
        "Managing daily operations and ensuring efficient business processes.",
        "Developing creative concepts and premium brand experiences."
    ];

    useEffect(() => {

        fetch('https://randomuser.me/api/?results=6')
            .then((response) => response.json())
            .then((data) => {
                setTeams(data.results);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });

    }, []);

    return (
        <section
            id='teams'
            className='relative overflow-hidden bg-gradient-to-br
            from-gray-50 to-green-50 py-12 px-4 sm:py-16 md:py-20 md:px-12'
        >

            <div className='max-w-7xl mx-auto'>

                {/* TITLE */}
                <div
                    className='mb-10 md:mb-12'
                    data-aos='fade-down'
                >
                    <h2
                        className='text-3xl sm:text-4xl md:text-5xl
                        text-gray-900 text-center'
                    >
                        Our{" "}
                        <span className='font-bold text-black'>
                            Team<span className='text-green-500'>.</span>
                        </span>
                    </h2>

                    <div className='flex gap-3 mt-4 justify-center'>

                        <Circle
                            className='text-pink-500 w-5 h-5'
                        />

                        <Circle
                            className='text-yellow-500 w-5 h-5'
                        />

                        <Circle
                            className='text-green-500 w-5 h-5'
                        />

                    </div>

                    <p
                        className='text-base sm:text-lg text-gray-700
                        text-center max-w-2xl mx-auto mt-6 leading-relaxed'
                    >
                        Meet the people behind Herdian Group,
                        bringing together expertise across technology,
                        operations, business development, and creative industries.
                    </p>
                </div>


                {/* LOADING */}
                {loading && (
                    <p className='text-center text-gray-600'>
                        Loading team...
                    </p>
                )}


                {/* TEAM CARDS */}
                <div
                    className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                    gap-4 md:gap-6'
                >

                    {teams.map((team, index) => (

                        <div
                            key={team.login.uuid}
                            className='bg-white p-6 md:p-8
                            rounded-xl md:rounded-2xl
                            border border-gray-100
                            shadow-md md:shadow-lg
                            transition-all duration-300
                            hover:shadow-xl hover:-translate-y-1'
                            data-aos='fade-up'
                            data-aos-delay={index * 100}
                        >

                            {/* FOTO */}
                            <div
                                className='w-28 h-28 mx-auto mb-5
                                overflow-hidden shadow-lg
                                rounded-[40%_60%_70%_30%/40%_50%_60%_60%]
                                hover:rotate-2
                                transition-transform duration-500'
                            >
                                <img
                                    src={team.picture.large}
                                    alt={`${team.name.first} ${team.name.last}`}
                                    className='w-full h-full object-cover
                                    hover:scale-110
                                    transition-transform duration-700'
                                />
                            </div>


                            {/* NAMA */}
                            <h3
                                className='text-xl font-semibold text-gray-800
                                text-center mb-1'
                            >
                                {team.name.first} {team.name.last}
                            </h3>


                            {/* ROLE */}
                            <p
                                className={`text-sm font-medium text-center mb-4 ${
                                    index % 3 === 0
                                        ? 'text-pink-500'
                                        : index % 3 === 1
                                        ? 'text-yellow-500'
                                        : 'text-green-500'
                                }`}
                            >
                                {roles[index]}
                            </p>


                            {/* BIO */}
                            <p
                                className='text-gray-600 text-sm
                                leading-relaxed text-center'
                            >
                                {bios[index]}
                            </p>

                        </div>

                    ))}

                </div>

            </div>


            {/* DECORATION KIRI */}
            <div
                className='hidden md:block absolute border-2
                border-pink-500 bottom-20 left-10
                w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24
                rounded-full opacity-50'
                data-aos='zoom-in'
            >
            </div>


            {/* DECORATION KANAN */}
            <div
                className='hidden md:block absolute border-2
                border-green-500 top-40 right-10
                w-20 h-20 md:w-32 md:h-32
                rounded-full opacity-50'
                data-aos='zoom-in'
            >
            </div>

        </section>
    );
};

export default TeamsPage;