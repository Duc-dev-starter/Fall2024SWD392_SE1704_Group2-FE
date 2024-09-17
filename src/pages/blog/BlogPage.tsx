import React, { useEffect, useState } from 'react'
import { Banner, BlogCards, Pagination, CategorySelection, Sidebar } from '@/components';
import { BaseService } from '@/services';
import { useScrollPosition } from '@/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import LoadingOverlay from '../../components/loading/Loading';

const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 12;
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [activeCategory, setActiveCategory] = useState(null);
    const isLoading = useSelector((state: RootState) => state.loading.isLoading);
    useScrollPosition(window.location.href);

    useEffect(() => {
        fetchBlogs();
    }, [currentPage, pageSize, selectedCategory])
    async function fetchBlogs() {
        let url = `https://665b3286003609eda4602205.mockapi.io/blogs`
        const response = await BaseService.get({ url });
        if (selectedCategory) {
            url += `&category=${selectedCategory}`;
        }
        setBlogs(response.data);
    }

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    }

    const handleCategoryChange = (category: React.SetStateAction<null>) => {
        setSelectedCategory(category);
        setCurrentPage(1);
        setActiveCategory(category);
    }

    return (
        <>
            {isLoading && <LoadingOverlay />}
            {/* Banner Section */}
            <Banner
                bgImage="../src/assets/6.png"
                titleKey="blog_title"
                descriptionKey="blog_description"
                buttonTextKey="login_button"
                showButton={true}
            />
            <div className='max-w-7xl mx-auto'>
                {/* Category Section */}
                <div>
                    <CategorySelection onSelectedCategory={handleCategoryChange} selectedCategory={selectedCategory} activeCategory={activeCategory} />
                </div>

                {/* BlogCards Section */}
                <div className='flex flex-col lg:flex-row gap-12'>
                    <BlogCards
                        blogs={blogs}
                        currentPage={currentPage}
                        selectedCategory={selectedCategory}
                        pageSize={pageSize}
                    />
                    {/* Sidebar components */}
                    <div>
                        <Sidebar />
                    </div>
                </div>

                {/* Pagination Section */}
                <div>
                    <Pagination onPageChange={handlePageChange} blogs={blogs} pageSize={pageSize} currentPage={currentPage} />
                </div>
            </div >
        </>
    )
}

export default BlogPage