import { useEffect, useState } from "react";
import {
    ArrowRight,
    Circle,
    Calendar,
    User,
    Pencil,
    Trash2,
    Save,
    X
} from "lucide-react";

import Backendless from "../config/backendless";


type Blog = {
    objectId: string;
    title: string;
    content: string;
    author: string;
    category?: string;
    created: number;
};


const BlogListPage = () => {

    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // cek apakah user sedang login
    const [isAdmin, setIsAdmin] = useState(false);

    // untuk Read More
    const [expandedBlog, setExpandedBlog] =
        useState<string | null>(null);

    // untuk Edit
    const [editingBlog, setEditingBlog] =
        useState<Blog | null>(null);

    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");
    const [editCategory, setEditCategory] = useState("");

    const [saving, setSaving] = useState(false);


    // =========================================
    // AMBIL BLOG + CEK LOGIN
    // =========================================

    useEffect(() => {

        const getBlogs = async () => {

            try {

                setLoading(true);
                setError("");


                // ambil semua blog
                const data = await Backendless.Data
                    .of("Blogs")
                    .find();

                setBlogs(data as Blog[]);


                // cek apakah user login
                const isLoggedIn =
                    await Backendless.UserService.isValidLogin();

                setIsAdmin(isLoggedIn);


            } catch (error) {

                console.log(error);

                setError("Failed to load blogs.");

            } finally {

                setLoading(false);

            }

        };


        getBlogs();

    }, []);


    // =========================================
    // MULAI EDIT
    // =========================================

    const handleStartEdit = (blog: Blog) => {

        setEditingBlog(blog);

        setEditTitle(blog.title);

        setEditContent(blog.content);

        setEditCategory(blog.category || "");

    };


    // =========================================
    // BATAL EDIT
    // =========================================

    const handleCancelEdit = () => {

        setEditingBlog(null);

        setEditTitle("");

        setEditContent("");

        setEditCategory("");

    };


    // =========================================
    // SIMPAN HASIL EDIT
    // =========================================

    const handleSaveEdit = async () => {

        if (!editingBlog) {
            return;
        }


        if (!editTitle || !editContent) {

            alert("Title and content are required.");

            return;

        }


        try {

            setSaving(true);


            // cek login lagi
            const isLoggedIn =
                await Backendless.UserService.isValidLogin();


            if (!isLoggedIn) {

                alert("You must login first.");

                setIsAdmin(false);

                return;

            }


            // objectId wajib ada supaya UPDATE,
            // bukan bikin blog baru
            const updatedBlog = await Backendless.Data
                .of("Blogs")
                .save({

                    objectId: editingBlog.objectId,

                    title: editTitle,

                    content: editContent,

                    category: editCategory,

                    author: editingBlog.author

                }) as Blog;


            // update tampilan tanpa reload halaman
            setBlogs((oldBlogs) =>

                oldBlogs.map((blog) =>

                    blog.objectId === editingBlog.objectId

                        ? {
                            ...blog,
                            ...updatedBlog
                        }

                        : blog

                )

            );


            handleCancelEdit();


        } catch (error) {

            console.log(error);

            alert("Failed to update blog.");

        } finally {

            setSaving(false);

        }

    };


    // =========================================
    // DELETE BLOG
    // =========================================

    const handleDelete = async (
        objectId: string
    ) => {

        // konfirmasi dulu
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this blog?"
        );


        if (!confirmDelete) {
            return;
        }


        try {

            // cek login lagi
            const isLoggedIn =
                await Backendless.UserService.isValidLogin();


            if (!isLoggedIn) {

                alert("You must login first.");

                setIsAdmin(false);

                return;

            }


            // hapus dari Backendless
            await Backendless.Data
                .of("Blogs")
                .remove(objectId);


            // hapus juga dari tampilan
            setBlogs((oldBlogs) =>

                oldBlogs.filter(
                    (blog) =>
                        blog.objectId !== objectId
                )

            );


        } catch (error) {

            console.log(error);

            alert("Failed to delete blog.");

        }

    };


    return (

        <section
            className='relative overflow-hidden bg-gradient-to-br
            from-gray-50 to-green-50 py-12 px-4
            sm:py-16 md:py-20 md:px-12
            min-h-screen'
        >

            <div className='max-w-7xl mx-auto'>


                {/* TITLE */}

                <div
                    className='mb-10 md:mb-12 text-center'
                    data-aos='fade-down'
                >

                    <h2
                        className='text-3xl sm:text-4xl
                        md:text-5xl text-gray-900'
                    >

                        Our{" "}

                        <span className='font-bold text-black'>

                            Blog

                            <span className='text-green-500'>
                                .
                            </span>

                        </span>

                    </h2>


                    {/* CIRCLES */}

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
                        className='text-gray-600 mt-5
                        max-w-2xl mx-auto'
                    >

                        Explore the latest news, stories,
                        insights, and updates from Herdian Group.

                    </p>

                </div>


                {/* LOADING */}

                {loading && (

                    <p className='text-center text-gray-600'>

                        Loading blogs...

                    </p>

                )}


                {/* ERROR */}

                {error && (

                    <p className='text-center text-red-500'>

                        {error}

                    </p>

                )}


                {/* KALAU BLOG KOSONG */}

                {!loading && blogs.length === 0 && (

                    <div
                        className='bg-white p-8
                        rounded-2xl shadow-lg text-center'
                    >

                        <p className='text-gray-600'>

                            No blog articles available yet.

                        </p>

                    </div>

                )}


                {/* BLOG GRID */}

                <div
                    className='grid grid-cols-1
                    md:grid-cols-2
                    lg:grid-cols-3 gap-6'
                >

                    {blogs.map((blog, index) => (

                        <div
                            key={blog.objectId}
                            className='bg-white p-6 md:p-7
                            rounded-xl md:rounded-2xl
                            border border-gray-100
                            shadow-md md:shadow-lg
                            hover:shadow-xl
                            transition-all duration-300
                            flex flex-col'
                            data-aos='fade-up'
                            data-aos-delay={index * 100}
                        >


                            {/* ====================== */}
                            {/* MODE EDIT */}
                            {/* ====================== */}

                            {editingBlog?.objectId ===
                                blog.objectId ? (

                                <>

                                    <h3
                                        className='text-xl font-semibold
                                        text-gray-800 mb-5'
                                    >
                                        Edit Blog
                                    </h3>


                                    {/* EDIT TITLE */}

                                    <div className='mb-4'>

                                        <label
                                            className='block text-sm
                                            font-medium text-gray-700 mb-2'
                                        >
                                            Title
                                        </label>

                                        <input
                                            type='text'
                                            value={editTitle}
                                            onChange={(e) =>
                                                setEditTitle(
                                                    e.target.value
                                                )
                                            }
                                            className='w-full px-4 py-3
                                            border border-gray-200
                                            rounded-xl outline-none
                                            focus:border-pink-400'
                                        />

                                    </div>


                                    {/* EDIT CATEGORY */}

                                    <div className='mb-4'>

                                        <label
                                            className='block text-sm
                                            font-medium text-gray-700 mb-2'
                                        >
                                            Category
                                        </label>

                                        <select
                                            value={editCategory}
                                            onChange={(e) =>
                                                setEditCategory(
                                                    e.target.value
                                                )
                                            }
                                            className='w-full px-4 py-3
                                            border border-gray-200
                                            rounded-xl outline-none
                                            bg-white
                                            focus:border-yellow-400'
                                        >

                                            <option value=''>
                                                Select Category
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


                                    {/* EDIT CONTENT */}

                                    <div className='mb-5'>

                                        <label
                                            className='block text-sm
                                            font-medium text-gray-700 mb-2'
                                        >
                                            Content
                                        </label>

                                        <textarea
                                            value={editContent}
                                            onChange={(e) =>
                                                setEditContent(
                                                    e.target.value
                                                )
                                            }
                                            rows={8}
                                            className='w-full px-4 py-3
                                            border border-gray-200
                                            rounded-xl outline-none
                                            resize-none
                                            focus:border-green-400'
                                        />

                                    </div>


                                    {/* SAVE + CANCEL */}

                                    <div className='flex gap-3'>

                                        <button
                                            onClick={handleSaveEdit}
                                            disabled={saving}
                                            className='flex-1 py-2 px-4
                                            rounded-lg bg-green-500
                                            text-white font-medium
                                            hover:bg-green-600
                                            transition-colors
                                            disabled:opacity-50
                                            flex items-center
                                            justify-center gap-2'
                                        >

                                            <Save
                                                className='w-4 h-4'
                                            />

                                            {saving
                                                ? "Saving..."
                                                : "Save"
                                            }

                                        </button>


                                        <button
                                            onClick={handleCancelEdit}
                                            className='flex-1 py-2 px-4
                                            rounded-lg bg-gray-200
                                            text-gray-700 font-medium
                                            hover:bg-gray-300
                                            transition-colors
                                            flex items-center
                                            justify-center gap-2'
                                        >

                                            <X
                                                className='w-4 h-4'
                                            />

                                            Cancel

                                        </button>

                                    </div>

                                </>

                            ) : (

                                <>

                                    {/* ====================== */}
                                    {/* MODE NORMAL */}
                                    {/* ====================== */}


                                    {/* CATEGORY */}

                                    {blog.category && (

                                        <span
                                            className={`text-xs
                                            font-medium px-3 py-1
                                            rounded-full w-fit mb-4
                                            ${
                                                index % 3 === 0

                                                    ? "bg-pink-100 text-pink-600"

                                                    : index % 3 === 1

                                                    ? "bg-yellow-100 text-yellow-600"

                                                    : "bg-green-100 text-green-600"
                                            }`}
                                        >

                                            {blog.category}

                                        </span>

                                    )}


                                    {/* TITLE */}

                                    <h3
                                        className='text-xl md:text-2xl
                                        font-semibold text-gray-800 mb-3'
                                    >

                                        {blog.title}

                                    </h3>


                                    {/* AUTHOR + DATE */}

                                    <div
                                        className='flex flex-wrap
                                        items-center gap-4
                                        text-gray-500 text-sm mb-4'
                                    >

                                        <div
                                            className='flex
                                            items-center gap-1'
                                        >

                                            <User
                                                className='w-4 h-4'
                                            />

                                            <span>

                                                {blog.author ||
                                                    "Herdian Group"
                                                }

                                            </span>

                                        </div>


                                        <div
                                            className='flex
                                            items-center gap-1'
                                        >

                                            <Calendar
                                                className='w-4 h-4'
                                            />

                                            <span>

                                                {new Date(
                                                    blog.created
                                                ).toLocaleDateString(
                                                    "en-GB",
                                                    {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric"
                                                    }
                                                )}

                                            </span>

                                        </div>

                                    </div>


                                    {/* CONTENT */}

                                    <p
                                        className='text-gray-600
                                        text-sm leading-relaxed
                                        mb-6 flex-1'
                                    >

                                        {
                                            expandedBlog ===
                                            blog.objectId

                                                ? blog.content

                                                : blog.content.length >
                                                  150

                                                ? blog.content.substring(
                                                    0,
                                                    150
                                                ) + "..."

                                                : blog.content
                                        }

                                    </p>


                                    {/* READ MORE */}

                                    {blog.content.length > 150 && (

                                        <button
                                            onClick={() => {

                                                if (
                                                    expandedBlog ===
                                                    blog.objectId
                                                ) {

                                                    setExpandedBlog(
                                                        null
                                                    );

                                                } else {

                                                    setExpandedBlog(
                                                        blog.objectId
                                                    );

                                                }

                                            }}
                                            className='flex
                                            items-center gap-2
                                            text-pink-500
                                            font-medium
                                            hover:text-pink-600
                                            transition-colors
                                            w-fit'
                                        >

                                            {
                                                expandedBlog ===
                                                blog.objectId

                                                    ? "Show Less"

                                                    : "Read More"
                                            }

                                            <ArrowRight
                                                className='w-4 h-4'
                                            />

                                        </button>

                                    )}


                                    {/* ====================== */}
                                    {/* ADMIN EDIT + DELETE */}
                                    {/* ====================== */}

                                    {isAdmin && (

                                        <div
                                            className='flex gap-3
                                            mt-5 pt-5
                                            border-t
                                            border-gray-100'
                                        >


                                            {/* EDIT */}

                                            <button
                                                onClick={() =>
                                                    handleStartEdit(
                                                        blog
                                                    )
                                                }
                                                className='flex-1
                                                py-2 px-4
                                                rounded-lg
                                                bg-yellow-100
                                                text-yellow-700
                                                font-medium
                                                hover:bg-yellow-200
                                                transition-colors
                                                flex items-center
                                                justify-center gap-2'
                                            >

                                                <Pencil
                                                    className='w-4 h-4'
                                                />

                                                Edit

                                            </button>


                                            {/* DELETE */}

                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        blog.objectId
                                                    )
                                                }
                                                className='flex-1
                                                py-2 px-4
                                                rounded-lg
                                                bg-red-100
                                                text-red-600
                                                font-medium
                                                hover:bg-red-200
                                                transition-colors
                                                flex items-center
                                                justify-center gap-2'
                                            >

                                                <Trash2
                                                    className='w-4 h-4'
                                                />

                                                Delete

                                            </button>

                                        </div>

                                    )}

                                </>

                            )}

                        </div>

                    ))}

                </div>

            </div>


            {/* PINK CIRCLE */}

            <div
                className='hidden md:block absolute
                border-2 border-pink-500
                bottom-20 left-10
                w-20 h-20
                rounded-full opacity-50'
            />


            {/* GREEN CIRCLE */}

            <div
                className='hidden md:block absolute
                border-2 border-green-500
                top-40 right-10
                w-28 h-28
                rounded-full opacity-50'
            />

        </section>

    );

};

export default BlogListPage;