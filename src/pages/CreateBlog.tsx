import { useEffect, useState } from "react";
import { Circle, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Backendless from "../config/backendless";

const CreateBlogPage = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [author, setAuthor] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    // CEK LOGIN
    useEffect(() => {

        const checkLogin = async () => {

            try {

                const isLoggedIn =
                    await Backendless.UserService.isValidLogin();

                // kalau belum login
                if (!isLoggedIn) {
                    navigate("/login");
                    return;
                }

                // ambil data user yang sedang login
                const currentUser =
                    await Backendless.UserService.getCurrentUser(true) as any;

                setAuthor(
                    currentUser?.name ||
                    currentUser?.email ||
                    "Admin"
                );

            } catch (error) {

                console.log(error);
                navigate("/login");

            }

        };

        checkLogin();

    }, [navigate]);


    // SIMPAN BLOG
    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        if (!title || !content) {
            setError("Title and content are required.");
            return;
        }

        try {

            setLoading(true);
            setError("");

            const newBlog = {
                title: title,
                content: content,
                category: category,
                author: author
            };

            await Backendless.Data
                .of("Blogs")
                .save(newBlog);

            // setelah berhasil, masuk Blog List
            navigate("/blogs");

        } catch (error) {

            console.log(error);
            setError("Failed to create blog.");

        } finally {

            setLoading(false);

        }

    };


    return (
        <section
            className='relative overflow-hidden bg-gradient-to-br
            from-gray-50 to-green-50 py-12 px-4
            sm:py-16 md:py-20 md:px-12
            min-h-screen'
        >

            <div className='max-w-3xl mx-auto'>

                {/* TITLE */}
                <div
                    className='mb-8 md:mb-10 text-center'
                    data-aos='fade-down'
                >

                    <h2
                        className='text-3xl sm:text-4xl md:text-5xl
                        text-gray-900'
                    >
                        Create{" "}

                        <span className='font-bold text-black'>
                            Blog
                            <span className='text-green-500'>.</span>
                        </span>
                    </h2>


                    {/* CIRCLES */}
                    <div className='flex gap-3 mt-4 justify-center'>

                        <Circle className='text-pink-500 w-5 h-5' />

                        <Circle className='text-yellow-500 w-5 h-5' />

                        <Circle className='text-green-500 w-5 h-5' />

                    </div>


                    <p className='text-gray-600 mt-5'>
                        Create and publish a new article for Herdian Group.
                    </p>

                </div>


                {/* FORM CARD */}
                <form
                    onSubmit={handleSubmit}
                    className='bg-white p-6 sm:p-8 md:p-10
                    rounded-2xl md:rounded-3xl
                    border border-gray-100
                    shadow-lg md:shadow-xl'
                    data-aos='fade-up'
                >

                    {/* AUTHOR */}
                    <div className='mb-5'>

                        <label
                            className='block text-gray-700
                            font-medium mb-2'
                        >
                            Author
                        </label>

                        <input
                            type='text'
                            value={author}
                            disabled
                            className='w-full px-4 py-3
                            border border-gray-200 rounded-xl
                            bg-gray-100 text-gray-500
                            outline-none'
                        />

                    </div>


                    {/* TITLE */}
                    <div className='mb-5'>

                        <label
                            className='block text-gray-700
                            font-medium mb-2'
                        >
                            Blog Title
                        </label>

                        <input
                            type='text'
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            placeholder='Enter blog title'
                            className='w-full px-4 py-3
                            border border-gray-200 rounded-xl
                            outline-none
                            focus:border-pink-400'
                        />

                    </div>


                    {/* CATEGORY */}
                    <div className='mb-5'>

                        <label
                            className='block text-gray-700
                            font-medium mb-2'
                        >
                            Category
                        </label>

                        <select
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value)
                            }
                            className='w-full px-4 py-3
                            border border-gray-200 rounded-xl
                            outline-none
                            focus:border-yellow-400
                            bg-white'
                        >

                            <option value=''>
                                Select category
                            </option>

                            <option value='Technology'>
                                Technology
                            </option>

                            <option value='Lifestyle'>
                                Lifestyle
                            </option>

                            <option value='Beauty'>
                                Beauty
                            </option>

                            <option value='Company'>
                                Company
                            </option>

                        </select>

                    </div>


                    {/* CONTENT */}
                    <div className='mb-6'>

                        <label
                            className='block text-gray-700
                            font-medium mb-2'
                        >
                            Content
                        </label>

                        <textarea
                            value={content}
                            onChange={(e) =>
                                setContent(e.target.value)
                            }
                            placeholder='Write your blog content here...'
                            rows={10}
                            className='w-full px-4 py-3
                            border border-gray-200 rounded-xl
                            outline-none
                            focus:border-green-400
                            resize-none'
                        />

                        <p className='text-xs text-gray-400 mt-2'>
                            Markdown content is supported.
                        </p>

                    </div>


                    {/* ERROR */}
                    {error && (

                        <p className='text-red-500 text-sm
                        text-center mb-4'>
                            {error}
                        </p>

                    )}


                    {/* SUBMIT */}
                    <button
                        type='submit'
                        disabled={loading}
                        className='w-full px-6 py-3
                        bg-pink-500 hover:bg-pink-600
                        text-white rounded-full font-medium
                        transition-all shadow-md hover:shadow-lg
                        flex items-center justify-center gap-2
                        disabled:opacity-50'
                    >

                        {loading
                            ? "Publishing..."
                            : "Publish Blog"
                        }

                        <Send className='w-5 h-5' />

                    </button>

                </form>

            </div>


            {/* PINK DECORATION */}
            <div
                className='hidden md:block absolute
                border-2 border-pink-500
                bottom-20 left-10
                w-20 h-20 rounded-full opacity-50'
            />


            {/* GREEN DECORATION */}
            <div
                className='hidden md:block absolute
                border-2 border-green-500
                top-40 right-10
                w-28 h-28 rounded-full opacity-50'
            />

        </section>
    );
};

export default CreateBlogPage;