import { Circle, Mail, MapPinIcon, Phone, Send } from 'lucide-react'
import contactImg from '../assets/hero.jpg'


const Contact = () => {
    const contactInfo = [
        {
            id: 1,
            icon: Mail,
            iconBg: 'bg-pink-100',
            iconColor: 'text-pink-600',
            title: 'Email',
            content: 'info@example.com',
            aosDelay: '200'
        },
        {
            id: 2,
            icon: Phone,
            iconBg: 'bg-yellow-100',
            iconColor: 'text-yellow-600',
            title: 'Phone',
            content: '+123 456 7890',
            aosDelay: '200'
        },
        {
            id: 3,
            icon: MapPinIcon,
            iconBg: 'bg-green-100',
            iconColor: 'text-green-600',
            title: 'Address',
            content: '123 Main Street, City, Country',
            aosDelay: '300'
        }
    ];

    const formFields = [
        {
            id: 'name',
            type: 'text',
            label: 'Full Name',
            placeholder: 'Enter your full name',
            delay: '150'
        },
        {
            id: 'email',
            type: 'text',
            label: 'Full Name',
            placeholder: 'Enter your full name',
            delay: '150'
        },
        {
            id: 'message',
            type: 'textarea',
            label: 'Message',
            placeholder: 'Enter your message here ...',
            rows: 5,
            delay: '150'
        },
    ];
    return (
        <section
            id='contact'
            className='relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50
            py-12 px-4 sm:py-16 md:py-20 md:px-12 lg:px-20'
        >
            <div className='max-w-7xl mx-auto'>
                <div
                    className='flex flex-col items-center justify-center text-center mb-10'
                    data-aos='fade-down'
                >
                    <div className='max-w-2xl space-y-6'>
                        <div>
                            <h2 className='text-3xl sm:text-4xl md:text-5xl text-gray-900'>
                                Get In {""}
                                <span className='font-bold text-black'>
                                    Touch
                                    <span className='text-green-500'>.</span>
                                </span>
                            </h2>
                            <div className='flex justify-center gap-3 mt-4'>
                                <Circle className='text-pink-500 w-5 h-5' />
                                <Circle className='text-yellow-500 w-5 h-5' />
                                <Circle className='text-green-500 w-5 h-5' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row gap-8 md:gap-12
                    items-center'>
                    <div
                        className='flex-1 bg-white rounded-2xl md:rounded-3xl
                        shadow-lg md:shadow-xl p-6 sm:p-8 border border-gray-100'
                        data-aos='fade-right'
                        data-aos-delay='100'
                    >
                        <form className='space-y-6'>
                            {formFields.map((field) => (
                                <div
                                    key={field.id}
                                    data-aos='fade-up'
                                    data-aos-delay={field.delay}
                                >
                                    <label
                                        htmlFor={field.id}
                                        className='block text-sm font-medium 
                                        text-gray-700 mb-2'
                                    >
                                        {field.label}
                                    </label>
                                    {
                                        field.type === 'textarea' ? (
                                            <textarea
                                                id={field.id}
                                                name={field.id}
                                                rows={field.rows}
                                                className='w-full px-4 py-3 border border-gray-300 
                                                rounded-lg focus:ring-2 focus:ring-pink-500 
                                                focus:border-transparent transition-all'
                                                placeholder={field.placeholder}
                                            >
                                            </textarea>
                                        ) : (
                                            <input
                                                type={field.type}
                                                id={field.id}
                                                name={field.id}
                                                className='w-full px-4 py-3 border
                                                border-gray-300 rounded-lg focus:ring-2
                                                focus:ring-pink-500 focus:border-transparent
                                                transition-all'
                                                placeholder={field.placeholder}
                                            />
                                        )

                                    }
                                </div>
                            ))}
                            <div data-aos='fade-up' data-aos-delay='300'>
                                <button
                                    type='button'
                                    className='w-full bg-pink-500 text-white
                                    py-3 px-6 rounded-lg font-medium hover:bg-pink-600
                                    transition-all shadow-md hover:shadow-lg flex
                                    items-center justify-center gap-2'
                                >
                                    Send Message
                                    <Send className='h-5 w-5' />
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className='flex-1 flex flex-col items-center lg:items-start'>
                        <div
                            className='w-full max-w-md h-64 sm:h-72 md:h-80 overflow-hidden
                            shadow-lg rounded-xl md:rounded-2xl mb-8'
                            data-aos='zoom-in'
                            data-aos-delay='150'
                        >
                            <img
                                src={contactImg} alt="Contact Us"
                                className='object-cover w-full transform hover:scale-105
                                transition-transform duration-700'
                            />
                        </div>
                        <div className='space-y-4 w-full max-w-md'>
                            {contactInfo.map((item) => {
                                const IconComp = item.icon;
                                return (
                                    <div
                                        key={item.id}
                                        className='flex items-center gap-4 p-4
                                        bg-white rounded-xl shadow-md'
                                        data-aos='fade-left'
                                        data-aos-delay={item.aosDelay}
                                        data-aos-offset='0'
                                    >
                                        <div className={`w-12 h-12 
                                            ${item.iconBg} rounded-lg flex
                                            items-center justify-center`}>
                                            <IconComp className={`w-6 h-6
                                                ${item.iconColor}`}/>
                                        </div>
                                        
                                        <h3 className='font-semibold text-gray-800'>
                                            {item.title}
                                        </h3>

                                        <p className='text-gray-600'>
                                            {item.content}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div 
                className='hidden md:block absolute border-2 border-pink-500
                bottom-20 left-10 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24
                rounded-full opacity-50'
                data-aos='zoom-in'
                data-aos-delay='400'
            >
            </div>
            <div 
                className='hidden md:block absolute border-2 border-purple-500
                top-40 right-10 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32
                rounded-full opacity-50'
                data-aos='zoom-in'
                data-aos-delay='500'
            >
            </div>
        </section>
    )
}

export default Contact